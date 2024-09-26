import React, { useEffect, useState } from "react";

import {
    styled, Paper, Table,
    TableCell, TableContainer, TableHead, TableRow,
    Typography,
    TableBody
} from "@mui/material";

export default function FilterClass({ codeFilter }) {

    const StylesTableCell = styled(TableCell)({
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 8,
        paddingBottom: 8,

    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/lop-loai')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const selectedItem = data.find(item => item.Loai_id === codeFilter);
    const name = selectedItem ? selectedItem.Loai_lop : 'Không xác định';

    const activeClasses = data.filter(item => item.Loai_id === codeFilter && item.trang_thai === 1);
    const activeClassesStop = data.filter(item => item.Loai_id === codeFilter && item.trang_thai === 0);

    const activeCount = activeClasses.length;
    const stoppedCount = activeClassesStop.length;

    return (
        <div>

            <Typography sx={{ marginTop: 3, marginBottom: 1, marginLeft: 5 }} >Số lượng lớp học đang diễn ra của {name}: {activeCount}</Typography>

            <TableContainer component={Paper} sx={{
                width: '100%'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StylesTableCell>Mã lớp</StylesTableCell>
                            <StylesTableCell>Tên Lớp</StylesTableCell>
                            <StylesTableCell>Ngày bắt đầu</StylesTableCell>
                            <StylesTableCell>Ngày kết thúc</StylesTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {activeClasses.length > 0 ? (
                            activeClasses.map(filteredItem => (
                                <TableRow key={filteredItem.id}>
                                    <TableCell>{filteredItem.id}</TableCell>
                                    <TableCell>{filteredItem.Ten_lop}</TableCell>
                                    <TableCell>{formatDate(filteredItem.Ngay_DB)}</TableCell>
                                    <TableCell>{formatDate(filteredItem.Ngay_KT)}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Loại lớp không có lớp học nào đang diễn ra.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography sx={{ marginTop: 3, marginBottom: 1, marginLeft: 5 }}>Số lượng lớp học đã kết thúc của {name}: {stoppedCount}</Typography>

            <TableContainer component={Paper} sx={{
                width: '100%'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StylesTableCell>Mã lớp</StylesTableCell>
                            <StylesTableCell>Tên Lớp</StylesTableCell>
                            <StylesTableCell>Ngày bắt đầu</StylesTableCell>
                            <StylesTableCell>Ngày kết thúc</StylesTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {activeClassesStop.length > 0 ? (
                            activeClassesStop.map(filteredItem => (
                                <TableRow key={filteredItem.id}>
                                    <TableCell>{filteredItem.id}</TableCell>
                                    <TableCell>{filteredItem.Ten_lop}</TableCell>
                                    <TableCell>{formatDate(filteredItem.Ngay_DB)}</TableCell>
                                    <TableCell>{formatDate(filteredItem.Ngay_KT)}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Loại lớp này chưa có lớp học nào đã kết thúc.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}