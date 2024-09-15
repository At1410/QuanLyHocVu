import React, { useState } from 'react';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Swal from 'sweetalert2';

import {
    styled, Paper, Table,
    TableCell, TableContainer, TableHead, TableRow,
    Modal, Box,
    Typography,
    Button
} from "@mui/material";

import axios from 'axios';

export default function ChildInClass({ open, handleClose, children, teachers }) {

    //Style
    const StylesTableCell = styled(TableCell)({
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 8,
        paddingBottom: 8,

    });

    const StylesTableCellCt = styled(TableCell)({
        paddingTop: 5,
        paddingBottom: 5,
    })

    const StyleButton = styled(Button)({
        backgroundColor: '#89b847',
        color: '#ffffff',
        paddingTop: 5,
        paddingBottom: 5,
        float: 'right',
        '&:hover': {
            backgroundColor: '#89b847',
            color: '#ffffff',
        },
    })

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

    const [data, setData] = useState([]);

    const handelNullIdClass = async (id) => {
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

            await axios.put(`http://localhost:5000/ID-lop/${id}`, { Lop_id: null });

            setData((prevData) =>
                prevData.map((item) =>
                    item.id === id ? { ...item, Lop_id: null } : item
                )
            );

            Swal.fire(
                'Đã hoàn thành!',
                'Xóa trẻ ra khỏi lớp!',
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
        <Modal
            open={open}
            onClose={handleClose}
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
                    width: '70%',
                    margin: '0 auto',
                    padding: 2,
                    backgroundColor: '#f4f6f8',
                    borderRadius: '8px',
                }}
            >

                <Typography
                    sx={{
                        fontWeight: 'bold',
                    }}>
                    DANH SÁCH HỌC SINH CỦA LỚP
                    <StyleButton>Thêm trẻ</StyleButton>
                </Typography>
                <TableContainer component={Paper} sx={{
                    width: '100%',
                }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StylesTableCell>Họ tên trẻ</StylesTableCell>
                                <StylesTableCell>Ngày sinh trẻ</StylesTableCell>
                                <StylesTableCell>Giới tính</StylesTableCell>
                                <StylesTableCell>Sức khỏe</StylesTableCell>
                                <StylesTableCell sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    Thao tác
                                </StylesTableCell>
                            </TableRow>
                        </TableHead>

                        {children.length > 0 ? (
                            children.map((item) => (
                                <TableRow key={item.id}>
                                    <StylesTableCellCt>{item.Ten_tre}</StylesTableCellCt>
                                    <StylesTableCellCt>{formatDate(item.Ngay_sinh)}</StylesTableCellCt>
                                    <StylesTableCellCt>{Gender(item.Gioi_tinh)}</StylesTableCellCt>
                                    <StylesTableCellCt>{item.Suc_khoe}</StylesTableCellCt>
                                    <StylesTableCellCt sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <RemoveCircleOutlineIcon
                                            onClick={() => handelNullIdClass(item.id)}
                                            sx={{
                                                color: '#89b847',
                                                cursor: 'pointer',
                                                alignItems: 'center',
                                                '&:hover': { color: '#d00000' },
                                            }} />
                                    </StylesTableCellCt>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Chưa có học sinh trong lớp học này.
                                </TableCell>
                            </TableRow>
                        )}
                    </Table>
                </TableContainer>
                <Typography
                    sx={{
                        fontWeight: 'bold',
                    }}>
                    DANH SÁCH GIÁO VIÊN CỦA LỚP
                    <StyleButton>Thêm giáo viên</StyleButton>
                </Typography>
                <TableContainer component={Paper} sx={{
                    width: '100%'
                }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StylesTableCell>Tên nhân viên</StylesTableCell>
                                <StylesTableCell>Căn cước công dân</StylesTableCell>
                                <StylesTableCell>Giới tính</StylesTableCell>
                                <StylesTableCell>Số điện thoại</StylesTableCell>
                                <StylesTableCell sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    Thao tác
                                </StylesTableCell>
                            </TableRow>
                        </TableHead>

                        {teachers.length > 0 ? (
                            teachers.map((item) => (
                                <TableRow key={item.id}>
                                    <StylesTableCellCt>{item.Ten_Nhan_Vien}</StylesTableCellCt>
                                    <StylesTableCellCt>{item.CMND}</StylesTableCellCt>
                                    <StylesTableCellCt>{Gender(item.Gioi_tinh)}</StylesTableCellCt>
                                    <StylesTableCellCt>{item.Sdt}</StylesTableCellCt>
                                    <StylesTableCellCt sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <RemoveCircleOutlineIcon
                                            onClick={() => handelNullIdClass(item.id)}
                                            sx={{
                                                color: '#89b847',
                                                cursor: 'pointer',
                                                alignItems: 'center',
                                                '&:hover': { color: '#d00000' },
                                            }} />
                                    </StylesTableCellCt>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Chưa có giáo viên trong lớp học này.
                                </TableCell>
                            </TableRow>
                        )}

                    </Table>
                </TableContainer>
            </Box>
        </Modal >
    );
}