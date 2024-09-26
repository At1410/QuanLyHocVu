import React, { useEffect, useState } from "react";

import {
    styled, Paper, Table,
    TableCell, TableContainer, TableHead, TableRow,
    Typography,
    TableBody
} from "@mui/material";

export default function FilterStaff({ codeFilterStaff }) {

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
        fetch('http://localhost:5000/nhan-vien')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const selectedItem = data.find(item => item.Chuc_vu_id === codeFilterStaff);
    const name = selectedItem ? selectedItem.Ten_chuc_vu : 'Không xác định';

    const activeStaff = data.filter(item => item.Chuc_vu_id === codeFilterStaff && item.trang_thai === 1);
    const activeStaffStop = data.filter(item => item.Chuc_vu_id === codeFilterStaff && item.trang_thai === 0);

    const activeCount = activeStaff.length;
    const stoppedCount = activeStaffStop.length;

    return (
        <div>

            <Typography sx={{ marginTop: 1, marginBottom: 1, marginLeft: 5 }} >Số lượng {name} đang hoạt động: {activeCount}</Typography>

            <TableContainer component={Paper} sx={{
                width: '100%',
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StylesTableCell>Tên Nhân Viên:</StylesTableCell>
                            <StylesTableCell>Số điện thoại:</StylesTableCell>
                            <StylesTableCell>Ngày sinh:</StylesTableCell>
                            <StylesTableCell>Giới tính:</StylesTableCell>
                            <StylesTableCell>Địa chỉ:</StylesTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {activeStaff.length > 0 ? (
                            activeStaff.map(filteredItem => (
                                <TableRow key={filteredItem.id}>
                                    <TableCell>{filteredItem.Ten_Nhan_Vien}</TableCell>
                                    <TableCell>{filteredItem.Sdt}</TableCell>
                                    <TableCell>{formatDate(filteredItem.Ngay_sinh)}</TableCell>
                                    <TableCell>{filteredItem.Gioi_tinh}</TableCell>
                                    <TableCell>{filteredItem.Dia_chi}</TableCell>
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

            <Typography sx={{ marginTop: 3, marginBottom: 1, marginLeft: 5 }}>Số lượng {name} dừng hoạt động: {stoppedCount}</Typography>

            <TableContainer component={Paper} sx={{
                width: '100%'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StylesTableCell>Tên Nhân Viên:</StylesTableCell>
                            <StylesTableCell>Số điện thoại:</StylesTableCell>
                            <StylesTableCell>Ngày sinh:</StylesTableCell>
                            <StylesTableCell>Giới tính:</StylesTableCell>
                            <StylesTableCell>Địa chỉ:</StylesTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {activeStaffStop.length > 0 ? (
                            activeStaffStop.map(filteredItem => (
                                <TableRow key={filteredItem.id}>
                                    <TableCell>{filteredItem.Ten_Nhan_Vien}</TableCell>
                                    <TableCell>{filteredItem.Sdt}</TableCell>
                                    <TableCell>{formatDate(filteredItem.Ngay_sinh)}</TableCell>
                                    <TableCell>{filteredItem.Gioi_tinh}</TableCell>
                                    <TableCell>{filteredItem.Dia_chi}</TableCell>
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