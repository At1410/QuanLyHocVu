import React, { useEffect, useState } from "react";


import {
    Paper, styled, Pagination, PaginationItem, Grid, Box, Modal
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
        fetch('http://localhost:5000/tre-em')
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.Trang_thai === 1);
                setData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        fetch('http://localhost:5000/phu-huynh')
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
        Gioi_tinh: '',
        Ngay_sinh: '',
        Lop_id: '',
        Suc_khoe: '',
    });

    const handleTick = async (id, Trang_thai) => {

        setChildList({
            Ten_tre: data.Ten_tre,
            Gioi_tinh: data.Gioi_tinh,
            Ngay_sinh: data.Ngay_sinh,
            Lop_id: data.Ten_lop,
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

            await axios.put(`http://localhost:5000/trang-thai-tre/${id}`, { ...setChildList, Trang_thai: newStatus });

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

            await axios.delete(`http://localhost:5000/tre-em/${item.id}`);

            await axios.delete(`http://localhost:5000/phu-huynh/${item.PH_id}`);

            await axios.delete(`http://localhost:5000/suc-khoe/${item.SK_id}`);

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
    const [open, setopen] = useState(false);

    const handleClose = () => {
        setopen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChildList(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = (childList) => {
        setcurrentItem(childList);
        setChildList({
            Ten_tre: data.Ten_tre,
            Gioi_tinh: data.Gioi_tinh,
            Ngay_sinh: data.Ngay_sinh,
            Lop_id: data.Ten_lop,
            Suc_khoe: data.Suc_khoe,
        });
        setopen(true);
    };

    const handleSave = async () => {
        if (childList.Ten_tre?.trim() === '' || childList.Gioi_tinh?.trim() === '' ||
            childList.Ngay_sinh?.trim() === '' || childList.Lop_id?.trim() === '' ||
            childList.Suc_khoe?.trim() === '') {
            Swal.fire(
                'Lỗi!',
                'Vui lòng nhập đầy đủ thông tin.',
                'error'
            );
            return;
        }

        try {
            const payload = {
                Ten_tre: data.Ten_tre,
                Gioi_tinh: data.Gioi_tinh,
                Ngay_sinh: data.Ngay_sinh,
                Lop_id: data.Ten_lop,
                Suc_khoe: data.Suc_khoe,
            };

            await axios.put(`http://localhost:5000/tre-em/${currentItem.id}`, payload);

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

    const [isModalParentsOpen, setIsModalParentsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [ParentOf, setParentOf] = useState([]);

    const handleOpenModalParents = (item) => {
        const filterParent = parent.filter(parent => parent.id_PH === item.PH_id);
        console.log(filterParent);
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
                                        <p>Lớp: {item.Ten_lop}</p>
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
                                            onClick={() => handleOpenEditModal(item)}
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

            <Modal open={isEditModalOpen} onClose={handleCloseEditModal}
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
                // onSubmit={handleSubmit}
                >
                    <h1>Chỉnh sửa thông tin trẻ</h1>
                </Box>
            </Modal>
        </div >
    );
}