import React, { useEffect, useState } from "react";

import InClass from "./InClass";

import {
    Paper, styled, Pagination, PaginationItem, Button, Grid, Box, Modal,
    TextField, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl
} from '@mui/material';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ReorderIcon from '@mui/icons-material/Reorder';

import axios from 'axios';
import Swal from 'sweetalert2';


export default function ClassList() {

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
            cursor: 'pointer'
        }
    });

    const StyleDiv = styled('div')({
        textAlign: 'center',
        marginTop: 30,
    });

    const StyleDivItem = styled('div')({
        textAlign: 'left',
        color: '#000000',
        marginLeft: 20,
    });


    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        fetch('http://localhost:5000/lop-loai')
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.trang_thai === 1);
                setData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
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


    const [classList, setClassList] = useState({
        Loai_lop: '',
        Ten_lop: '',
        Ngay_DB: '',
        Ngay_KT: '',
        So_luong: '',
        SL_giaovien: '',
        Hoc_phi: '',
        Loai_id: '',
    });

    const handleTick = async (id, trang_thai) => {

        setClassList({
            Loai_lop: data.Loai_lop,
            Ten_lop: data.Ten_lop,
            Ngay_DB: data.Ngay_DB,
            Ngay_KT: data.Ngay_KT,
            So_luong: data.So_luong,
            SL_giaovien: data.SL_giaovien,
            Hoc_phi: data.Hoc_phi,
        });

        try {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn không?',
                text: 'Bạn có chắc chắn rằng lớp học đã hoàn thành hay không!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
                cancelButtonText: 'Hủy'
            });

            if (!result.isConfirmed) return;

            const newStatus = trang_thai === 1 ? 0 : 1;

            await axios.put(`http://localhost:5000/trang-thai-lop/${id}`, { ...setClassList, trang_thai: newStatus });

            setData((prevData) =>
                prevData.map((item) => (item.id === id ? { ...item, trang_thai: newStatus } : item))
            );

            Swal.fire(
                'Đã hoàn thành!',
                'Lớp học đã hoàn thành!',
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

    const handleDelete = async (id) => {
        // Hiển thị thông báo xác nhận xóa
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn không?',
            text: 'Bạn có chắc chắn rằng muốn xóa lớp học này hay không!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có',
            cancelButtonText: 'Hủy'
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`http://localhost:5000/lop/${id}`);
            Swal.fire(
                'Đã xóa!',
                'Bạn đã xóa lớp học này!',
                'success'
            );

            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            Swal.fire(
                'Lỗi!',
                'Bạn không thể xóa lớp này.',
                'error'
            );
        }
    };

    const [currentItem, setcurrentItem] = useState({});
    const [open, setopen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [currentClassId, setCurrentClassId] = useState(null);

    const handleOpenModal = (item) => {
        setCurrentClassId(item.id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleClose = () => {
        setopen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassList(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = (ClassList) => {
        setcurrentItem(ClassList);
        setClassList({
            Ten_lop: ClassList.Ten_lop,
            Ngay_DB: ClassList.Ngay_DB,
            Ngay_KT: ClassList.Ngay_KT,
            Loai_id: ClassList.Loai_id,
        });
        setopen(true);
    };

    const handleSave = async () => {
        if (classList.Ten_lop?.trim() === '' ||
            classList.Ngay_DB?.trim() === '' ||
            classList.Ngay_KT?.trim() === '') {
            Swal.fire(
                'Lỗi!',
                'Vui lòng nhập đầy đủ thông tin.',
                'error'
            );
            return;
        }

        try {
            const payload = {
                Ten_lop: classList.Ten_lop,
                Ngay_DB: formatDate(classList.Ngay_DB),
                Ngay_KT: formatDate(classList.Ngay_KT),
                Loai_id: classList.Loai_id,
            };

            await axios.put(`http://localhost:5000/lop/${currentItem.id}`, payload);

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

    return (
        <div>
            <StyleDiv>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {currentData.map((item) => (
                        <Grid key={item.id} item xs={4}>
                            <Item>
                                <Grid item xs={10}>
                                    <StyleDivItem>
                                        <p>Loại lớp: {item.Loai_lop}</p>
                                        <p>Mã lớp: {item.id}</p>
                                        <p>Tên lớp: {item.Ten_lop}</p>
                                        <p>Ngày bắt đầu: {formatDate(item.Ngay_DB)}</p>
                                        <p>Ngày kết thúc: {formatDate(item.Ngay_KT)}</p>
                                        <p>Số lượng trẻ: {item.So_luong}</p>
                                        <p>Số lượng giáo viên: {item.SL_giaovien}</p>
                                        <p>Học phí: {item.Hoc_phi}</p>
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
                                            onClick={() => handleOpenModal(item)}
                                            sx={{
                                                color: '#89b847',
                                                '&:hover': {
                                                    backgroundColor: "#75a73f",
                                                    color: '#ffffff',
                                                },
                                            }}>
                                            <ReorderIcon />
                                        </StyleButton>
                                        <StyleButton
                                            onClick={() => handleEdit(item)}
                                            sx={{
                                                color: '#89b847',
                                                '&:hover': {
                                                    backgroundColor: "#75a73f",
                                                    color: '#ffffff',
                                                },
                                            }}>
                                            <ModeEditIcon />
                                        </StyleButton>
                                        <StyleButton
                                            onClick={() => handleDelete(item.id)}
                                            sx={{
                                                borderColor: "#d00000",
                                                color: "#d00000",
                                                '&:hover': {
                                                    backgroundColor: "#d00000",
                                                    color: "#ffffff",
                                                },
                                            }}>
                                            <DeleteIcon />
                                        </StyleButton>
                                        <StyleButton
                                            onClick={() => handleTick(item.id, item.trang_thai)}
                                            sx={{
                                                color: '#1565c0',
                                                borderColor: "#1565c0",
                                                '&:hover': {
                                                    color: '#ffffff',
                                                    backgroundColor: "#1565c0",
                                                },
                                            }}>
                                            <FileDownloadDoneIcon />
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

            <InClass
                open={openModal}
                handleClose={handleCloseModal}
                classId={currentClassId}
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
                        label="Tên lớp"
                        name="Ten_lop"
                        variant="outlined"
                        value={classList.Ten_lop}
                        onChange={handleChange}
                    />

                    <TextField
                        size="small"
                        fullWidth
                        label="Ngày bắt đầu lớp học*"
                        name="Ngay_DB"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        value={formatDate(classList.Ngay_DB)}
                        onChange={handleChange}
                    />

                    <TextField
                        size="small"
                        fullWidth
                        label="Ngày kết thúc lớp học*"
                        name="Ngay_KT"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        value={formatDate(classList.Ngay_KT)}
                        onChange={handleChange}
                    />

                    <FormControl fullWidth size="small">
                        <FormLabel component="legend">Loại lớp</FormLabel>
                        <RadioGroup
                            aria-label="Loại lớp*"
                            name="Loai_id"
                            value={classList.Loai_id}
                            onChange={handleChange}
                            sx={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <FormControlLabel value={301} control={<Radio />} label="Loại 1" />
                            <FormControlLabel value={302} control={<Radio />} label="Loại 2" />
                            <FormControlLabel value={303} control={<Radio />} label="Loại 3" />
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
        </div>
    );
};