import React, { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

import axios from 'axios';

import Swal from 'sweetalert2'


import { Grid, styled, Pagination, PaginationItem, Paper } from "@mui/material";

export default function RegistrationForm() {

    //Style
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        textAlign: 'center',
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
        marginTop: '15px',
    });

    const StyleDivItem = styled('div')({
        textAlign: 'left',
        color: '#000000',
        marginLeft: 30,
    });

    const StyleButton = styled('button')({
        borderRadius: 3,
        backgroundColor: "#ffffff",
        color: '#89b847',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        border: '2px solid #89b847',
        alignItems: 'left',
        '&:hover': {
            cursor: 'pointer',
        },
    });

    //Xử lý
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/phieuDK`)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.Danh_dau === 1);
                setData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Tính toán dữ liệu hiển thị trên mỗi trang
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

    const Buoi = (Buoi) => {
        if (Buoi === 0) {
            return 'Sáng';
        } else {
            return 'Chiều'
        }
    };

    const [parents, setParents] = useState({
        Ho_ten: "",
        Ngay_sinh_tre: "",
        Sdt: "",
        Dia_chi: "",
        Ngay_den_tham: "",
    });

    const handleDelete = async (id) => {
        // Hiển thị thông báo xác nhận xóa
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn không?',
            text: 'Bạn có chắc chắn rằng phụ huynh này đã không đến thăm không!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có',
            cancelButtonText: 'Hủy'
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/phieudk/${id}`);
            Swal.fire(
                'Đã xóa!',
                'Bạn đã xóa phụ huynh không đến thăm!',
                'success'
            );

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

    const handleTick = async (id, Danh_dau) => {

        setParents({
            Ho_ten: data.Ho_ten,
            Ngay_sinh_tre: data.Ngay_sinh_tre,
            Sdt: data.Sdt,
            Dia_chi: data.Dia_chi,
            Ngay_den_tham: data.Ngay_den_tham,
        });

        try {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn không?',
                text: 'Bạn có chắc chắn rằng phụ huynh này đã đến hay không!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
                cancelButtonText: 'Hủy'
            });

            if (!result.isConfirmed) return;

            const newStatus = Danh_dau === 1 ? 0 : 1;

            await axios.put(`${process.env.REACT_APP_API_URL}/danh_dau/${id}`, { ...setParents, Danh_dau: newStatus });

            setData((prevData) =>
                prevData.map((item) => (item.id === id ? { ...item, Danh_dau: newStatus } : item))
            );

            Swal.fire(
                'Đã đánh dấu!',
                'Phụ huynh đã đến thăm thành công!',
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
    }

    return (
        <div>
            <StyleDiv>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {currentData.map(item => (
                        <Grid key={item.id} item xs={6} >
                            <Item>
                                <Grid item xs={10}>

                                    <StyleDivItem>
                                        <p>Họ tên phụ huynh: {item.Ho_ten}</p>
                                        <p>Ngày sinh trẻ: {formatDate(item.Ngay_sinh_tre)}</p>
                                        <p>Số điện thoại: {item.Sdt} </p>
                                        <p>Địa chỉ: {item.Dia_chi}</p>
                                        <p>Ngày đến thăm: {formatDate(item.Ngay_den_tham)}</p>
                                        <p>Buổi đến thăm: {Buoi(item.Buoi)}</p>
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
                                            onClick={() => handleDelete(item.id)}
                                            sx={{
                                                color: "#d00000",
                                                borderColor: "#d00000",
                                                '&:hover': {
                                                    borderColor: "#d00000",
                                                    backgroundColor: "#d00000",
                                                    color: "#ffffff"
                                                },
                                            }}>
                                            <DeleteIcon />
                                        </StyleButton>
                                        <StyleButton
                                            onClick={() => handleTick(item.id, item.Danh_dau)}
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
            </StyleDiv >

            <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                    marginTop: 2,
                    justifyContent: 'center',
                    display: 'flex',
                }}

                renderItem={(item) => <CustomPaginationItem {...item} />}
            />
        </div >
    );
}