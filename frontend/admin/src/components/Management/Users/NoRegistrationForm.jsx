import React, { useEffect, useState } from 'react';


import {
    styled, Pagination, PaginationItem, Paper, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";

export default function NoRegistrationForm() {

    //Style
    const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
        '&.Mui-selected': {
            backgroundColor: '#89b847',
            color: 'white',
        },
    }));

    const StylesTableCell = styled(TableCell)({
        fontSize: 18,
        fontWeight: 'bold',
    });

    //Xử lý
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/phieuDK`)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.Danh_dau === 0);
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


    return (
        <div>
            <TableContainer component={Paper} sx={{
                marginTop: '15px',
                width: '100%',
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StylesTableCell>Họ tên phụ huynh</StylesTableCell>
                            <StylesTableCell>Ngày sinh trẻ</StylesTableCell>
                            <StylesTableCell>Số điện thoại</StylesTableCell>
                            <StylesTableCell>Địa chỉ</StylesTableCell>
                            <StylesTableCell>Ngày đến thăm</StylesTableCell>
                            <StylesTableCell>Buổi đến</StylesTableCell>
                        </TableRow>
                    </TableHead>
                    {currentData.map(item => (
                        <TableBody key={item.id}>
                            <TableRow sx={{
                                alignItems: 'center',
                            }}>
                                <TableCell>{item.Ho_ten}</TableCell>
                                <TableCell>{formatDate(item.Ngay_sinh_tre)}</TableCell>
                                <TableCell>{item.Sdt}</TableCell>
                                <TableCell>{item.Dia_chi}</TableCell>
                                <TableCell>{formatDate(item.Ngay_den_tham)}</TableCell>
                                <TableCell>{Buoi(item.Buoi_den)}</TableCell>
                            </TableRow>
                        </TableBody>
                    ))}

                </Table>
                <Pagination
                    count={Math.ceil(data.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{
                        marginTop: 2,
                        justifyContent: 'center',
                        display: 'flex',
                        marginBottom: 2,
                    }}

                    renderItem={(item) => <CustomPaginationItem {...item} />}
                />
            </TableContainer>
        </div >
    );
}