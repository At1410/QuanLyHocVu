import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import SearchChild from "./SearchChild";

import { Grid, styled, Paper } from "@mui/material";

export default function StatisticalDayOff() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: 'black',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '15px',
    }));

    const SmallCell = styled(TableCell)({
        width: '20%',
        padding: '8px',
        fontWeight: 'bold',
        fontSize: '16px',
    });

    const LargeCell = styled(TableCell)({
        width: '60%',
        padding: '8px',
        fontWeight: 'bold',
        fontSize: '16px',
    });


    const [data, setData] = useState([]);
    const [tgData, setTgData] = useState([]);
    const [leaveData, setLeaveData] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/tre-em`)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        fetch(`${process.env.REACT_APP_API_URL}/thong-ke`)
            .then(response => response.json())
            .then(data => {
                setTgData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        fetch(`${process.env.REACT_APP_API_URL}/dk-nghi-hoc`)
            .then(response => response.json())
            .then(data => {
                setLeaveData(data);
            })
            .catch(error => {
                console.error('Error fetching leave data:', error);
            });
    }, []);

    const Gender = (data) => {
        return data === 1 ? 'Nam' : 'Nữ';
    };

    const [searchValue, setSearchValue] = useState('');
    const [matchedChildren, setMatchedChildren] = useState([]);

    const handleSearch = (searchTerm) => {
        setSearchValue(searchTerm);

        const matched = data.filter(item => item.Ten_tre.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        setMatchedChildren(matched);

        if (matched.length === 0) {
            setMatchedChildren([]);
        }
    };

    const compareIds = (childId) => {
        return tgData.filter(item => item.id_treem === childId);
    };

    const calculateDaysOff = (childId) => {
        const matchedThamGia = compareIds(childId);
        if (matchedThamGia.length === 0) return 0;

        const classStartDate = matchedThamGia[0].Ngay_DB;

        const childLeaves = leaveData.filter(leave =>
            leave.id_tre === childId &&
            new Date(leave.ngay_nghi) >= new Date(classStartDate)
        );

        const uniqueDaysOff = new Set();

        childLeaves.forEach(leave => {
            const startDate = new Date(leave.ngay_nghi);
            const endDate = new Date(leave.ngay_hoc_lai);

            for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                uniqueDaysOff.add(d.toDateString());
            }
        });

        return {
            numberDayOff: childLeaves.length,
            daysOff: uniqueDaysOff.size
        };


    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };


    return (

        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <SearchChild onSearch={handleSearch} />
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                {matchedChildren.length > 0 ? (
                    matchedChildren.map((child, index) => {
                        const matchedThamGia = compareIds(child.id);
                        const { numberDayOff, daysOff } = calculateDaysOff(child.id);

                        return (
                            <Item key={index}>
                                <Grid container spacing={2} sx={{
                                    textAlign: 'left'
                                }}>
                                    <Grid item xs={6}>
                                        <Typography sx={{
                                            marginLeft: '30px',
                                            marginTop: '10px',
                                        }}>
                                            {`Tên trẻ: ${child.Ten_tre}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography>
                                            {`Mã trẻ: ${child.id}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography>
                                            {`Giới tính: ${Gender(child.Gioi_tinh)}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {
                                    matchedThamGia.length > 0 ? (
                                        matchedThamGia.map((thamgia, index) => (

                                            <Grid key={index} container spacing={2} sx={{
                                                textAlign: 'left'
                                            }}>
                                                <Grid item xs={6}>
                                                    <Typography sx={{
                                                        marginLeft: '30px',
                                                    }}>
                                                        {`Lớp đang tham gia: ${thamgia.Ten_lop}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography>
                                                        {`Mã lớp: ${thamgia.id_lop}`}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                        ))
                                    ) : (
                                        <Typography sx={{
                                            marginLeft: '30px',
                                        }}>
                                            Trẻ chưa tham gia lớp học nào.
                                        </Typography>
                                    )
                                }

                                {numberDayOff !== undefined && numberDayOff >= 0
                                    ?

                                    <>
                                        <Grid container spacing={2} sx={{
                                            textAlign: 'left'
                                        }}>
                                            <Grid item xs={6}>
                                                <Typography sx={{
                                                    marginLeft: '30px',
                                                }}>
                                                    {`Số lần nghỉ học của trẻ: ${numberDayOff}`}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography>
                                                    {`Số ngày nghỉ của trẻ: ${daysOff}`}
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                            <Table sx={{ width: '95%' }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <SmallCell>Ngày nghỉ</SmallCell>
                                                        <SmallCell>Ngày học lại</SmallCell>
                                                        <LargeCell>Lý do</LargeCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>

                                                    {
                                                        leaveData
                                                            .filter(item => item.id_tre === child.id)
                                                            .map((item, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell>{formatDate(item.ngay_nghi)}</TableCell>
                                                                    <TableCell>{formatDate(item.ngay_hoc_lai)}</TableCell>
                                                                    <TableCell>{item.ly_do}</TableCell>
                                                                </TableRow>
                                                            ))
                                                    }

                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </>

                                    :
                                    <Typography sx={{
                                        marginLeft: '30px',
                                        marginBottom: '10px',
                                    }}>
                                        Chưa tham gia lớp học để có thể xin nghỉ.
                                    </Typography>
                                }

                            </Item>
                        );
                    })
                ) : (
                    <Typography variant="h6">
                        Không tìm thấy trẻ.
                    </Typography>
                )}
            </div>
        </div >
    );
}
