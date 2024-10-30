import React, { useEffect, useState } from "react";

import {
    styled, Paper, Table,
    TableCell, TableContainer, TableHead, TableRow,
    Typography,
    TableBody
} from "@mui/material";

export default function FilterChild({ codeFilterChild }) {

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
        fetch(`${process.env.REACT_APP_API_URL}/tre-em`)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const selectedItem = data.find(item => item.Gioi_tinh === codeFilterChild);
    const name = selectedItem
        ? (selectedItem.Gioi_tinh === 1 ? 'Nam' : 'Nữ')
        : 'Không xác định';

    const activeChild = data.filter(item => item.Gioi_tinh === codeFilterChild && item.Trang_thai === 1);
    const activeChildStop = data.filter(item => item.Gioi_tinh === codeFilterChild && item.Trang_thai === 0);

    const activeCount = activeChild.length;
    const stoppedCount = activeChildStop.length;


    return (
        <div>

            <Typography sx={{ marginTop: 3, marginBottom: 1, marginLeft: 5 }}>Số lượng trẻ có giới tính là {name} đang hoạt động là: {activeCount}</Typography>

            <TableContainer component={Paper} sx={{
                width: '100%'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StylesTableCell>Mã trẻ</StylesTableCell>
                            <StylesTableCell>Tên trẻ</StylesTableCell>
                            <StylesTableCell>Ngày sinh</StylesTableCell>
                            <StylesTableCell>Sức khỏe</StylesTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {activeChild.length > 0 ? (
                            activeChild.map(filteredItem => (
                                <TableRow key={filteredItem.id}>
                                    <TableCell>{filteredItem.id}</TableCell>
                                    <TableCell>{filteredItem.Ten_tre}</TableCell>
                                    <TableCell>{formatDate(filteredItem.Ngay_sinh)}</TableCell>
                                    <TableCell>{filteredItem.Suc_khoe}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Không có trẻ nào có giới tính là đang học.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography sx={{ marginTop: 3, marginBottom: 1, marginLeft: 5 }}>Số lượng trẻ có giới tính là {name} đã nghỉ học là: {stoppedCount}</Typography>

            <TableContainer component={Paper} sx={{
                width: '100%'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StylesTableCell>Mã trẻ</StylesTableCell>
                            <StylesTableCell>Tên trẻ</StylesTableCell>
                            <StylesTableCell>Ngày sinh</StylesTableCell>
                            <StylesTableCell>Sức khỏe</StylesTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {activeChildStop.length > 0 ? (
                            activeChildStop.map(filteredItem => (
                                <TableRow key={filteredItem.id}>
                                    <TableCell>{filteredItem.id}</TableCell>
                                    <TableCell>{filteredItem.Ten_tre}</TableCell>
                                    <TableCell>{formatDate(filteredItem.Ngay_sinh)}</TableCell>
                                    <TableCell>{filteredItem.Suc_khoe}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Không có trẻ nào có giới tính là đã dừng học.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}