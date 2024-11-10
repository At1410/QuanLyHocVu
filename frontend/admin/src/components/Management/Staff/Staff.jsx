import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';

import {
    Modal, TextField,
    Box, Button,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio, Pagination,
    PaginationItem,
    Typography
} from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function Staff({ searchTerm }) {
    //Style
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    }));

    const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
        '&.Mui-selected': {
            backgroundColor: '#89b847',
            color: 'white',
        },
    }));

    const StyleDiv = styled('div')({
        textAlign: 'center',
        marginTop: 20,
    });

    const StyleImg = styled('img')({
        width: '150px',
        height: '250px',
        objectFit: 'cover',
        borderRadius: '5px',
    });

    const StyleDivItem = styled('div')({
        textAlign: 'left',
        color: '#000000',
    });

    const StyleButton = styled('button')({
        borderRadius: 3,
        backgroundColor: "#ffffff",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        border: '2px solid #89b847',
        alignItems: 'left',
        '&:hover': {
            cursor: 'pointer',
        }
    })

    //Xử lý hiện thông tin
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/nhan-vien`)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(employee => employee.trang_thai === 1);
                setData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const filteredData = data.filter(item =>
        item.Ten_Nhan_Vien && item.Ten_Nhan_Vien.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // Tính toán dữ liệu nhân viên hiển thị trên mỗi trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const Gender = (data) => {
        if (data === 1) {
            return 'Nam';
        } else {
            return 'Nữ';
        }
    };

    // Xử lý xóa thông tin
    const handleDelete = async (id) => {
        // Hiển thị thông báo xác nhận xóa
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn không?',
            text: 'Bạn sẽ không thể phục hồi nhân viên đã xóa!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, xóa nó!',
            cancelButtonText: 'Hủy'
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/nhan-vien/${id}`);
            Swal.fire(
                'Đã xóa!',
                'Dữ liệu của bạn đã được xóa.',
                'success'
            );

            // Cập nhật lại danh sách sau khi xóa
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            Swal.fire(
                'Lỗi!',
                'Có lỗi xảy ra khi xóa dữ liệu.',
                'error'
            );
        }
    };

    // Xử lý cập nhật thông tin
    const [employe, setEmployee] = useState({
        tenNV: '',
        diaChi: '',
        gioiTinh: '',
        queQuan: '',
        sdt: '',
        cmnd: '',
        chucVuId: '',
        nSinh: '',
    });

    const [currentItem, setcurrentItem] = useState({});
    const [open, setopen] = useState(false);

    const handleClose = () => {
        setopen(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = (employee) => {
        setcurrentItem(employee);
        setEmployee({
            tenNV: employee.Ten_Nhan_Vien,
            nSinh: employee.Ngay_sinh,
            diaChi: employee.Dia_chi,
            gioiTinh: employee.Gioi_tinh,
            queQuan: employee.Que_quan,
            sdt: employee.Sdt,
            cmnd: employee.CMND,
            chucVuId: employee.Chuc_vu_id,
        });
        setopen(true);
    };

    const handleSave = async () => {
        if (employe.tenNV?.trim() === '' || employe.nSinh?.trim() === '' ||
            employe.diaChi?.trim() === '' ||
            employe.queQuan?.trim() === '' || employe.sdt?.trim() === '' ||
            employe.cmnd?.trim() === '') {
            Swal.fire(
                'Lỗi!',
                'Vui lòng nhập đầy đủ thông tin.',
                'error'
            );
            return;
        }

        try {
            const payload = {
                Ten_Nhan_Vien: employe.tenNV,
                Ngay_sinh: formatDate(employe.nSinh),
                Dia_chi: employe.diaChi,
                Gioi_tinh: employe.gioiTinh,
                Que_quan: employe.queQuan,
                Sdt: employe.sdt,
                CMND: employe.cmnd,
                Chuc_vu_id: employe.chucVuId,
            };

            await axios.put(`${process.env.REACT_APP_API_URL}/nhan-vien/${currentItem.id}`, payload);

            setData(data.map(item =>
                item.id === currentItem.id
                    ? { ...item, payload } : item
            ));


            Swal.fire(
                'Đã cập nhật!',
                'Dữ liệu của bạn đã được cập nhật.',
                'success'
            );

            handleClose();

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            Swal.fire(
                'Lỗi!',
                'Có lỗi xảy ra khi cập nhật dữ liệu.',
                'error'
            );
        }
    }



    const handleTick = async (id, trang_thai) => {

        setEmployee({
            tenNV: data.Ten_Nhan_Vien,
            nSinhNgay_sinh: data.Ngay_sinh,
            diaChi: data.Dia_chi,
            gioiTinh: data.Gioi_tinh,
            queQuan: data.Que_quan,
            sdt: data.Sdt,
            cmnd: data.CMND,
            chucvuId: data.Chuc_vu_id
        });

        try {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn không?',
                text: 'Bạn có chắc chắn rằng nhân viên này đã nghỉ việc hay không!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có!',
                cancelButtonText: 'Hủy'
            });

            if (!result.isConfirmed) return;

            const newStatus = trang_thai === 1 ? 0 : 1;

            await axios.put(`${process.env.REACT_APP_API_URL}/trang-thai/${id}`, { ...setEmployee, trang_thai: newStatus });

            setData((prevData) =>
                prevData.map((item) => (item.id === id ? { ...item, trang_thai: newStatus } : item))
            );

            Swal.fire(
                'Đã cập nhật!',
                'Nhân viên đã được nghỉ việc.',
                'success'
            );

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            Swal.fire(
                'Lỗi!',
                'Có lỗi xảy ra khi cập nhật dữ liệu.',
                'error'
            );
        }
    };

    return (
        <div>

            {filteredData.length === 0 ? (
                <Typography sx={{ textAlign: 'center', marginTop: 2, fontSize: 18, color: '#000000' }}>
                    Không có thông tin tìm kiếm phù hợp.
                </Typography>
            ) : (

                <StyleDiv>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {currentData.map((item, index) => (
                            <Grid key={`${item.id}-${index}`} item xs={6}>
                                <Item>
                                    <Grid item xs={4}
                                        sx={{
                                            paddingLeft: '10px',
                                        }}
                                    >
                                        <StyleImg
                                            src={item.image_nv}
                                            alt={item.Ten_Nhan_Vien} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <StyleDivItem>
                                            <p>Tên Nhân Viên: {item.Ten_Nhan_Vien}</p>
                                            <p>Ngày sinh: {formatDate(item.Ngay_sinh)}</p>
                                            <p>Giới tính: {Gender(item.Gioi_tinh)}</p>
                                            <p>Địa chỉ: {item.Dia_chi}</p>
                                            <p>Quê quán: {item.Que_quan}</p>
                                            <p>Số điện thoại: {item.Sdt}</p>
                                            <p>CCCD: {item.CMND}</p>
                                            <p>Công việc:  {item.Ten_chuc_vu}</p>
                                        </StyleDivItem>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginRight: '10px',
                                            marginLeft: '10px'
                                        }}>
                                            <StyleButton
                                                onClick={() => handleEdit(item)}
                                                sx={{
                                                    color: '#89b847',
                                                    '&:hover': {
                                                        backgroundColor: "#75a73f",
                                                        color: "#ffffff"
                                                    },
                                                }}>
                                                <ModeEditIcon />
                                            </StyleButton>
                                            <StyleButton onClick={() => handleDelete(item.id)}
                                                sx={{
                                                    color: '#d00000',
                                                    borderColor: '#d00000',
                                                    '&:hover': {
                                                        backgroundColor: "#d00000",
                                                        color: "#ffffff"
                                                    },
                                                }}>
                                                <DeleteIcon />
                                            </StyleButton>
                                            <StyleButton
                                                onClick={() => handleTick(item.id, item.trang_thai)}
                                                sx={{
                                                    color: '#d00000',
                                                    borderColor: '#d00000',
                                                    '&:hover': {
                                                        backgroundColor: "#d00000",
                                                        color: "#ffffff"
                                                    },
                                                }}>
                                                <BlockIcon />
                                            </StyleButton>
                                        </div>
                                    </Grid>
                                </Item>
                            </Grid>
                        ))}

                    </Grid>
                </StyleDiv>

            )}


            <Pagination
                count={Math.ceil(filteredData.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                    marginTop: 2,
                    justifyContent: 'center',
                    display: 'flex',
                    color: '#89b847'
                }}

                renderItem={(item) => <CustomPaginationItem {...item} />}
            />

            <Modal open={open} onClose={handleClose}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}
            >
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '50%',
                        margin: '0 auto',
                        padding: 2,
                        backgroundColor: '#f4f6f8',
                        borderRadius: '8px',
                    }}
                >

                    <TextField
                        size="small"
                        fullWidth
                        label="Tên nhân viên"
                        name="tenNV"
                        variant="outlined"
                        value={employe.tenNV}
                        onChange={handleChange}
                    />


                    <div style={{
                        display: 'flex',
                    }}>
                        <TextField
                            size="small"
                            fullWidth
                            label="Ngày sinh"
                            name="nSinh"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={formatDate(employe.nSinh)}
                            onChange={handleChange}
                        />

                        <TextField
                            sx={{ marginLeft: '10px' }}
                            size="small"
                            fullWidth
                            label="Số điện thoại"
                            name="sdt"
                            variant="outlined"
                            value={employe.sdt}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                    }}>
                        <TextField
                            size="small"
                            fullWidth
                            label="Số CCCD"
                            name="cmnd"
                            variant="outlined"
                            value={employe.cmnd}
                            onChange={handleChange}
                        />

                        <FormControl fullWidth size="small" sx={{ marginLeft: '10px' }}>
                            <InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={employe.chucVuId}
                                label="Chức vụ"
                                name="chucVuId"
                                onChange={handleChange}

                            >
                                <MenuItem value={1}>Giáo viên</MenuItem>
                                <MenuItem value={2}>Bảo vệ</MenuItem>
                                <MenuItem value={3}>Ý tá</MenuItem>
                                <MenuItem value={4}>Lao công</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <TextField
                        size="small"
                        fullWidth
                        label="Địa chỉ"
                        name="diaChi"
                        variant="outlined"
                        value={employe.diaChi}
                        onChange={handleChange}

                    />

                    <TextField
                        size="small"
                        fullWidth
                        label="Quê quán"
                        name="queQuan"
                        variant="outlined"
                        value={employe.queQuan}
                        onChange={handleChange}

                    />


                    <FormControl fullWidth size="small"
                        sx={{
                            marginLeft: '10px',
                        }}
                    >
                        <FormLabel component="legend">Giới tính*</FormLabel>
                        <RadioGroup
                            aria-label="Giới tính"
                            name="gioiTinh"
                            value={employe.gioiTinh}
                            onChange={handleChange}

                        >
                            <FormControlLabel value={0} control={<Radio />} label="Nữ" />
                            <FormControlLabel value={1} control={<Radio />} label="Nam" />
                        </RadioGroup>
                    </FormControl>

                    <Button variant="contained" onClick={handleSave}
                        sx={{
                            backgroundColor: '#89b847',
                            '&:hover': {
                                backgroundColor: '#75a73f',
                            },
                        }}
                    >
                        Lưu
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default Staff;