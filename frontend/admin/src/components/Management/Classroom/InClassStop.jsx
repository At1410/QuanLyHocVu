import React, { useEffect, useState } from 'react';

import {
    styled, Paper, Table,
    TableCell, TableContainer, TableHead, TableRow,
    Modal, Box,
    Typography,
    Pagination, PaginationItem
} from "@mui/material";

export default function InClass({ open, handleClose, classId }) {

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

    const [dataTG, setDataTG] = useState([]);
    const [dataGD, setDataGD] = useState([]);
    const [children, setChildren] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/tham-gia`)
            .then(response => response.json())
            .then(data => {
                setDataTG(data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
        fetch(`${process.env.REACT_APP_API_URL}/giang-day`)
            .then(response => response.json())
            .then(data => {
                setDataGD(data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
        fetch(`${process.env.REACT_APP_API_URL}/tre-em`)
            .then(response => response.json())
            .then(data => {
                setChildren(data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
        fetch(`${process.env.REACT_APP_API_URL}/giao-vien`)
            .then(response => response.json())
            .then(data => {
                setTeachers(data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, []);

    const childrenInClass = dataTG.filter(item => item.id_lop === classId).map(item => item.id_treem);
    const teachersInClass = dataGD.filter(item => item.id_Lop === classId).map(item => item.id_GV);

    const filteredChildren = children.filter(child => childrenInClass.includes(child.id));
    const filteredTeachers = teachers.filter(teacher => teachersInClass.includes(teacher.id));


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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsTableChild = 2;
    const indexOfLastItemChild = currentPage * itemsTableChild;
    const indexOfFirstItemChild = indexOfLastItemChild - itemsTableChild;

    const currentChildrenTable = filteredChildren.slice(indexOfFirstItemChild, indexOfLastItemChild);

    const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
        '&.Mui-selected': {
            backgroundColor: '#89b847',
            color: 'white',
        },
    }));

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

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
                            </TableRow>
                        </TableHead>

                        {currentChildrenTable.length > 0 ? (
                            currentChildrenTable.map((item) => (
                                <TableRow key={item.id}>
                                    <StylesTableCellCt>{item.Ten_tre}</StylesTableCellCt>
                                    <StylesTableCellCt>{formatDate(item.Ngay_sinh)}</StylesTableCellCt>
                                    <StylesTableCellCt>{Gender(item.Gioi_tinh)}</StylesTableCellCt>
                                    <StylesTableCellCt>{item.Suc_khoe}</StylesTableCellCt>
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
                    <Pagination
                        count={Math.ceil(filteredChildren.length / itemsTableChild)}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{
                            marginTop: 1,
                            marginBottom: 1,
                            justifyContent: 'center',
                            display: 'flex',
                            color: '#89b847'
                        }}
                        renderItem={(item) => <CustomPaginationItem {...item} />}
                    />
                </TableContainer>
                <Typography
                    sx={{
                        fontWeight: 'bold',
                    }}>
                    DANH SÁCH GIÁO VIÊN CỦA LỚP
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
                            </TableRow>
                        </TableHead>

                        {filteredTeachers.length > 0 ? (
                            filteredTeachers.map((item) => (
                                <TableRow key={item.id}>
                                    <StylesTableCellCt>{item.Ten_Nhan_Vien}</StylesTableCellCt>
                                    <StylesTableCellCt>{item.CMND}</StylesTableCellCt>
                                    <StylesTableCellCt>{Gender(item.Gioi_tinh)}</StylesTableCellCt>
                                    <StylesTableCellCt>{item.Sdt}</StylesTableCellCt>
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