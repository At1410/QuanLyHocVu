import { Table, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import {
    styled,
    TableCell, TableHead, TableRow,
    TableBody,
    useMediaQuery,
    Card, CardContent
} from "@mui/material";

export default function HomeAccount() {
    const [username, setUsername] = useState('');

    const [data, setData] = useState([]);
    const [classData, setClass] = useState([]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        if (username) {
            fetch('http://localhost:5000/tham-gia')
                .then(response => response.json())
                .then(data => {
                    const filteredData = data.filter(item => String(item.id_treem) === String(username));
                    setData(filteredData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [username]);

    useEffect(() => {
        fetch('http://localhost:5000/lop-loai')
            .then(response => response.json())
            .then(classData => {
                const activeClasses = classData.filter(classItem => classItem.trang_thai === 1);
                setClass(activeClasses);
            })
            .catch(error => {
                console.error('Error fetching class data:', error);
            });
    }, []);

    const [filteredClasses, setFilteredClasses] = useState([]);
    const [giaoVienData, setGiaoVienData] = useState([]);

    useEffect(() => {
        if (data.length > 0 && classData.length > 0) {
            const matchedClasses = classData.filter(classItem =>
                data.some(dataItem => dataItem.id_lop === classItem.id)
            );
            setFilteredClasses(matchedClasses);

            const idClass = matchedClasses.map(classItem => classItem.id);

            if (idClass.length > 0) {
                fetch(`http://localhost:5000/giang-day`)
                    .then(response => response.json())
                    .then(giangDayData => {
                        const filteredGiangDayData = giangDayData.filter(item =>
                            idClass.includes(item.id_Lop)
                        );

                        fetch(`http://localhost:5000/giao-vien`)
                            .then(response => response.json())
                            .then(giaoVienData => {
                                const filteredGiaoVienData = giaoVienData.filter(teacher =>
                                    filteredGiangDayData.some(giangDay => giangDay.id_GV === teacher.id)
                                );
                                setGiaoVienData(filteredGiaoVienData);

                            })
                            .catch(error => {
                                console.error('Error fetching giao-vien data:', error);
                            });

                    })
                    .catch(error => {
                        console.error('Error fetching giang-day data:', error);
                    });
            }
        }
    }, [data, classData]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    const Gender = (data) => {
        if (data === 1) {
            return 'Nam';
        } else {
            return 'Nữ';
        }
    };

    const StylesTableCell = styled(TableCell)({
        fontSize: 16,
        fontWeight: 'bold',
    });

    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <div
            style={{
                padding: '20px',
            }}>
            <Typography fontWeight="bold"
                sx={{
                    paddingTop: '10px',
                    paddingBottom: '10px',
                }} >LỚP HỌC TRẺ ĐANG THAM GIA</Typography>
            {isMobile ? (
                filteredClasses.length > 0 ? (
                    filteredClasses.map((item) => (
                        <Card key={item.id} sx={{ marginBottom: '10px' }}>
                            <CardContent>
                                <Typography>Loại lớp: {item.Loai_lop}</Typography>
                                <Typography>Tên lớp: {item.Ten_lop}</Typography>
                                <Typography>Ngày bắt đầu: {formatDate(item.Ngay_DB)}</Typography>
                                <Typography>Ngày kết thúc: {formatDate(item.Ngay_KT)}</Typography>
                                <Typography>Học phí: {item.Hoc_phi}</Typography>
                                <Typography>Số lượng trẻ: {item.So_luong}</Typography>
                                <Typography>Số lượng giáo viên: {item.SL_giaovien}</Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography align="center" variant="body1">
                        Chưa được phân công vào bất kì lớp học nào
                    </Typography>
                )
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <StylesTableCell>Loại lớp</StylesTableCell>
                            <StylesTableCell>Tên lớp</StylesTableCell>
                            <StylesTableCell>Ngày bắt đầu</StylesTableCell>
                            <StylesTableCell>Ngày kết thúc</StylesTableCell>
                            <StylesTableCell>Học phí</StylesTableCell>
                            <StylesTableCell>Số lượng trẻ</StylesTableCell>
                            <StylesTableCell>Số lượng giáo viên</StylesTableCell>
                        </TableRow>
                    </TableHead>
                    {filteredClasses.length > 0 ? (
                        filteredClasses.map(item => (
                            <TableBody key={item.id}>
                                <TableRow sx={{
                                    alignItems: 'center',
                                }}>
                                    <TableCell>{item.Loai_lop}</TableCell>
                                    <TableCell>{item.Ten_lop}</TableCell>
                                    <TableCell>{formatDate(item.Ngay_DB)}</TableCell>
                                    <TableCell> {formatDate(item.Ngay_KT)}</TableCell>
                                    <TableCell>{item.Hoc_phi}</TableCell>
                                    <TableCell>{item.So_luong}</TableCell>
                                    <TableCell>{item.SL_giaovien}</TableCell>
                                </TableRow>
                            </TableBody>
                        ))
                    ) : (

                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="body1">Chưa được phân công vào bất kì lớp học nào</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>

                    )}
                </Table>
            )}

            <Typography fontWeight="bold"
                sx={{
                    paddingTop: '30px',
                }}
            >GIÁO VIÊN ĐANG DẠY TRẺ</Typography>
            {isMobile ? (
                giaoVienData.length > 0 ? (
                    giaoVienData.map((item) => (
                        <Card key={item.id} sx={{ marginBottom: '10px' }}>
                            <CardContent>
                                <Typography>Họ tên: {item.Ten_Nhan_Vien}</Typography>
                                <Typography>Ngày sinh: {formatDate(item.Ngay_sinh)}</Typography>
                                <Typography>Địa chỉ: {item.Dia_chi}</Typography>
                                <Typography>Giới tính: {Gender(item.Gioi_tinh)}</Typography>
                                <Typography>Số điện thoại: {item.Sdt}</Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography align="center" variant="body1">
                        Chưa có giáo viên nào được phân công
                    </Typography>
                )
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <StylesTableCell>Họ tên giáo viên</StylesTableCell>
                            <StylesTableCell>Ngày sinh</StylesTableCell>
                            <StylesTableCell>Địa chỉ</StylesTableCell>
                            <StylesTableCell>Giới tính</StylesTableCell>
                            <StylesTableCell>Số điện thoại</StylesTableCell>
                        </TableRow>
                    </TableHead>
                    {giaoVienData.length > 0 ? (
                        giaoVienData.map(item => (
                            <TableBody key={item.id}>
                                <TableRow sx={{
                                    alignItems: 'center',
                                }}>
                                    <TableCell>{item.Ten_Nhan_Vien}</TableCell>
                                    <TableCell>{formatDate(item.Ngay_sinh)}</TableCell>
                                    <TableCell>{item.Dia_chi}</TableCell>
                                    <TableCell>{Gender(item.Gioi_tinh)}</TableCell>
                                    <TableCell>{item.Sdt}</TableCell>
                                </TableRow>
                            </TableBody>
                        ))
                    ) : (

                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body1">Chưa có giáo viên nào được phân công</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>

                    )}
                </Table>
            )}
        </div>
    );
}