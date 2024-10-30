import React, { useEffect, useState } from "react";


import {
    Paper, styled, Pagination, PaginationItem, Grid, Box, Modal,
    TextField,
    Button,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
} from '@mui/material';


import ReorderIcon from '@mui/icons-material/Reorder';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


import axios from 'axios';
import Swal from 'sweetalert2';
import ModalParents from "./ModalParents";

export default function ChildList() {

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

    const StyleButton = styled('button')({
        color: '#89b847',
        borderRadius: 3,
        backgroundColor: "#fffff",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        border: '2px solid #89b847',
        borderColor: "#89b847",
        alignItems: 'left',
        '&:hover': {
            cursor: 'pointer',
        }
    });

    const StyleDiv = styled('div')({
        textAlign: 'center',
        marginTop: 30,
    });

    const StyleDivItem = styled('div')({
        textAlign: 'left',
        color: '#000000',
        marginLeft: 10,
    });


    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [parent, setParent] = useState([]);
    const itemsPerPage = 6;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/tre-em`)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.Trang_thai === 1);
                setData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        fetch(`${process.env.REACT_APP_API_URL}/phu-huynh`)
            .then(response => response.json())
            .then(data => {
                setParent(data);
            })
            .catch(error => {
                console.error('Error fetching parent:', error);
            });
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

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

    const [childList, setChildList] = useState({
        Ten_tre: '',
        Ngay_sinh: '',
        Suc_khoe: '',
        Gioi_tinh: '',
    });

    const [childParent, setChildParent] = useState({
        Ten_PH: '',
        Dia_Chi: '',
        Sdt: '',
        Quan_he: '',
    });

    const handleTick = async (id, Trang_thai) => {

        setChildList({
            Ten_tre: data.Ten_tre,
            Gioi_tinh: data.Gioi_tinh,
            Ngay_sinh: data.Ngay_sinh,
            Suc_khoe: data.Suc_khoe,
        });

        try {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn không?',
                text: 'Bạn có chắc chắn rằng trẻ đã dừng học tại nhà trẻ không!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
                cancelButtonText: 'Hủy'
            });

            if (!result.isConfirmed) return;

            const newStatus = Trang_thai === 1 ? 0 : 1;

            await axios.put(`${process.env.REACT_APP_API_URL}/trang-thai-tre/${id}`, { ...setChildList, Trang_thai: newStatus });

            setData((prevData) =>
                prevData.map((item) => (item.id === id ? { ...item, Trang_thai: newStatus } : item))
            );

            Swal.fire(
                'Đã cập nhât!',
                'Trẻ em đã được đánh dấu dừng học!',
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

    const handleDelete = async (item) => {
        // Hiển thị thông báo xác nhận xóa
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn không?',
            text: 'Bạn có chắc chắn rằng muốn xóa trẻ này hay không!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có',
            cancelButtonText: 'Hủy'
        });

        if (!result.isConfirmed) return;

        try {

            await axios.delete(`${process.env.REACT_APP_API_URL}/tre-em/${item.id}`);

            await axios.delete(`${process.env.REACT_APP_API_URL}/phu-huynh/${item.PH_id}`);

            setData(data.filter(tem => tem.id !== item.id));

            Swal.fire(
                'Đã xóa!',
                'Trẻ và tất cả thông tin liên quan đã được xóa!',
                'success'
            );

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            Swal.fire(
                'Lỗi!',
                'Có lỗi xảy ra khi xóa trẻ.',
                'error'
            );
        }
    };

    const [currentItem, setcurrentItem] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (['Ten_tre', 'Ngay_sinh', 'Suc_khoe', 'Gioi_tinh'].includes(name)) {
            setChildList(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        if (['Ten_PH', 'Dia_Chi', 'Sdt', 'Quan_he'].includes(name)) {
            setChildParent(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleEdit = (item) => {
        setChildList({
            Ten_tre: item.Ten_tre,
            Gioi_tinh: item.Gioi_tinh,
            Ngay_sinh: formatDate(item.Ngay_sinh),
            Suc_khoe: item.Suc_khoe,
        });
        const parentInfo = parent.find(p => p.id_PH === item.PH_id);
        setChildParent({
            Ten_PH: parentInfo.Ten_PH,
            Dia_Chi: parentInfo.Dia_Chi,
            Sdt: parentInfo.Sdt,
            Quan_he: parentInfo.Quan_he,
        });
        setcurrentItem(item);
        handleOpenEditModal(item);
    };

    const handleSave = async () => {

        if (childList.Ten_tre?.trim() === '' || childList.Suc_khoe?.trim() === '' ||
            childList.Ngay_sinh?.trim() === '' || childList.Lop_id?.trim() === '' ||
            childParent.Ten_PH?.trim() === '' ||
            childParent.Dia_Chi?.trim() === '' || childParent.Sdt?.trim() === '' ||
            childParent.Quan_he?.trim() === '') {
            Swal.fire(
                'Lỗi!',
                'Vui lòng nhập đầy đủ thông tin.',
                'error'
            );
            return;
        }

        const phoneRegex = /^(0[3-9]\d{8}|(0[2-9]\d{7}))$/;
        if (!phoneRegex.test(childParent.Sdt)) {
            Swal.fire(
                'Lỗi!',
                'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam hợp lệ.',
                'error'
            );
            return;
        }

        const today = new Date();
        if (childList.Ngay_sinh && new Date(childList.Ngay_sinh) >= today) {
            return Swal.fire('Lỗi!', 'Ngày sinh phải trước ngày hôm nay.', 'error');
        }

        try {
            const payload = {
                Ten_tre: childList.Ten_tre,
                Gioi_tinh: childList.Gioi_tinh,
                Ngay_sinh: childList.Ngay_sinh,
                Suc_khoe: childList.Suc_khoe,
            };
            const parentPayload = {
                Ten_PH: childParent.Ten_PH,
                Dia_Chi: childParent.Dia_Chi,
                Sdt: childParent.Sdt,
                Quan_he: childParent.Quan_he,
            };

            await axios.put(`${process.env.REACT_APP_API_URL}/tre-em/${currentItem.id}`, payload);
            await axios.put(`${process.env.REACT_APP_API_URL}/phu-huynh/${currentItem.PH_id}`, parentPayload);

            setData(data.map(item =>
                item.id === currentItem.id ? { ...item, ...payload } : item
            ));

            setParent(parent.map(item =>
                item.id_PH === currentItem.PH_id ? { ...item, ...parentPayload } : item
            ));

            Swal.fire(
                'Đã cập nhật!',
                'Dữ liệu của bạn đã được cập nhật.',
                'success'
            );

            handleCloseEditModal();

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            Swal.fire(
                'Lỗi!',
                'Có lỗi xảy ra khi cập nhật dữ liệu.',
                'error'
            );
        }
    }

    const [isModalParentsOpen, setIsModalParentsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [ParentOf, setParentOf] = useState([]);

    const handleOpenModalParents = (item) => {
        const filterParent = parent.filter(parent => parent.id_PH === item.PH_id);
        setParentOf(filterParent);
        setIsModalParentsOpen(true);
    };

    const handleCloseModalParents = () => {
        setIsModalParentsOpen(false);
    };

    const handleOpenEditModal = (childList) => {
        setcurrentItem(childList);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div>
            <StyleDiv>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {currentData.map(item => (
                        <Grid key={item.id} item xs={4}>
                            <Item>
                                <Grid item xs={10}>
                                    <StyleDivItem>
                                        <p>Mã trẻ: {item.id}</p>
                                        <p>Tên trẻ: {item.Ten_tre}</p>
                                        <p>Giới tính: {Gender(item.Gioi_tinh)}</p>
                                        <p>Ngày sinh: {formatDate(item.Ngay_sinh)}</p>
                                        <p>Sức khỏe: {item.Suc_khoe}</p>
                                    </StyleDivItem>
                                </Grid>
                                <Grid item xs={3}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginRight: '10px',
                                        marginLeft: '10px'
                                    }}>
                                        <StyleButton
                                            onClick={() => handleOpenModalParents(item)}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: "#75a73f",
                                                    color: "#ffffff",
                                                },
                                            }}>
                                            <ReorderIcon />
                                        </StyleButton>
                                        <StyleButton
                                            onClick={() => handleEdit(item)}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: "#75a73f",
                                                    color: "#ffffff",
                                                },
                                            }}>
                                            <ModeEditIcon />
                                        </StyleButton>
                                        <StyleButton
                                            onClick={() => handleDelete(item)}
                                            sx={{
                                                color: "#d00000",
                                                borderColor: "#d00000",
                                                '&:hover': {
                                                    backgroundColor: "#d00000",
                                                    color: "#ffffff",
                                                },
                                            }}>
                                            <DeleteIcon />
                                        </StyleButton>
                                        <StyleButton
                                            onClick={() => handleTick(item.id, item.Trang_thai)}
                                            sx={{
                                                color: "#d00000",
                                                borderColor: "#d00000",
                                                '&:hover': {
                                                    backgroundColor: "#d00000",
                                                    color: "#ffffff",
                                                },
                                                marginBottom: '10px',
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

            <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
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

            <ModalParents open={isModalParentsOpen} handleClose={handleCloseModalParents} parent={ParentOf} />

            <Modal
                open={isEditModalOpen}
                onClose={handleCloseEditModal}
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
                        label="Tên phụ huynh*"
                        name="Ten_PH"
                        variant="outlined"
                        value={childParent.Ten_PH}
                        onChange={handleChange}
                    />

                    <TextField
                        size="small"
                        fullWidth
                        label="Địa chỉ*"
                        name="Dia_Chi"
                        variant="outlined"
                        value={childParent.Dia_Chi}
                        onChange={handleChange}
                    />

                    <div style={{
                        display: 'flex',
                    }}>

                        <TextField
                            size="small"
                            fullWidth
                            label="Số điện thoại*"
                            name="Sdt"
                            variant="outlined"
                            value={childParent.Sdt}
                            onChange={handleChange}
                            sx={{
                                marginRight: '5px',
                            }}
                        />

                        <TextField
                            size="small"
                            fullWidth
                            label="Quan hệ với trẻ*"
                            name="Quan_he"
                            variant="outlined"
                            value={childParent.Quan_he}
                            onChange={handleChange}
                            sx={{
                                marginLeft: '5px',
                            }}
                        />

                    </div>

                    <TextField
                        size="small"
                        fullWidth
                        label="Tên trẻ*"
                        name="Ten_tre"
                        variant="outlined"
                        value={childList.Ten_tre}
                        onChange={handleChange}
                    />

                    <div style={{
                        display: 'flex',
                    }}>
                        <TextField
                            size="small"
                            fullWidth
                            label="Ngày sinh trẻ*"
                            name="Ngay_sinh"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={childList.Ngay_sinh}
                            onChange={handleChange}
                            sx={{
                                marginRight: '5px',
                            }}
                        />

                        <TextField
                            size="small"
                            fullWidth
                            label="Tình trang sức khỏe*"
                            name="Suc_khoe"
                            variant="outlined"
                            value={childList.Suc_khoe}
                            onChange={handleChange}
                            sx={{
                                marginLeft: '5px',
                            }}
                        />
                    </div>

                    <FormControl fullWidth size="small"
                        sx={{
                            marginLeft: '10px',
                        }}
                    >
                        <FormLabel component="legend">Giới tính</FormLabel>
                        <RadioGroup
                            aria-label="Giới tính*"
                            name="Gioi_tinh"
                            value={childList.Gioi_tinh}
                            onChange={handleChange}
                            sx={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <FormControlLabel value={0} control={<Radio />} label="Nữ" />
                            <FormControlLabel value={1} control={<Radio />} label="Nam" />
                        </RadioGroup>
                    </FormControl>

                    <Button variant="contained"
                        onClick={handleSave}
                        sx={{
                            backgroundColor: '#89b847',
                            '&:hover': {
                                backgroundColor: '#75a73f',
                                cursor: 'pointer'
                            },
                        }}
                    >
                        Lưu
                    </Button>
                </Box>
            </Modal>

        </div >
    );
}