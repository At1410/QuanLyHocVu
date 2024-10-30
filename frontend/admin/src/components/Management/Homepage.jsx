import { Grid, List, Paper, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function Homepage() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#ffffff',
        ...theme.typography.body2,
        textAlign: 'left',
        marginLeft: '20px',
        marginRight: '20px',
        padding: '25px',
        height: '100%',
        color: 'dark',
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    const [data, setData] = useState([]);
    const [dataChild, setDataChild] = useState([]);
    const [dataClass, setDataClass] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/nhan-vien`)
            .then(response => response.json())
            .then(data => {
                setStaff(data);
                countStaffByRole(data);
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        fetch(`${process.env.REACT_APP_API_URL}/tre-em`)
            .then(response => response.json())
            .then(data => {
                setDataChild(data);
                setChild(data);
                countChildByGender(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        fetch(`${process.env.REACT_APP_API_URL}/lop-loai`)
            .then(response => response.json())
            .then(data => {
                setDataClass(data);
                setClassData(data);
                countClassByLevel(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const staffCount = data.filter(data => data.trang_thai === 1).length;
    const [staff, setStaff] = useState({
        giaoVien: 0,
        laoCong: 0,
        yTa: 0,
        baoVe: 0,
    });

    const staffCountStop = data.filter(data => data.trang_thai === 0).length;
    const [staffStop, setStaffStop] = useState({
        giaoVien: 0,
        laoCong: 0,
        yTa: 0,
        baoVe: 0,
    });


    const countStaffByRole = (data) => {
        const giaoVienCount = data.filter(item => item.Chuc_vu_id === 1 && item.trang_thai === 1).length;
        const yTaCount = data.filter(item => item.Chuc_vu_id === 3 && item.trang_thai === 1).length;
        const baoVeCount = data.filter(item => item.Chuc_vu_id === 2 && item.trang_thai === 1).length;
        const laoCongCount = data.filter(item => item.Chuc_vu_id === 4 && item.trang_thai === 1).length;

        const giaoVienCountStop = data.filter(item => item.Chuc_vu_id === 1 && item.trang_thai === 0).length;
        const yTaCountStop = data.filter(item => item.Chuc_vu_id === 3 && item.trang_thai === 0).length;
        const baoVeCountStop = data.filter(item => item.Chuc_vu_id === 2 && item.trang_thai === 0).length;
        const laoCongCountStop = data.filter(item => item.Chuc_vu_id === 4 && item.trang_thai === 0).length;

        setStaff({
            giaoVien: giaoVienCount,
            laoCong: laoCongCount,
            yTa: yTaCount,
            baoVe: baoVeCount,
        });

        setStaffStop({
            giaoVien: giaoVienCountStop,
            laoCong: laoCongCountStop,
            yTa: yTaCountStop,
            baoVe: baoVeCountStop,
        });

    };

    const childCount = dataChild.filter(child => child.Trang_thai === 1).length;
    const [child, setChild] = useState({
        Nam: 0,
        Nu: 0,
    })

    const childCountStop = dataChild.filter(child => child.Trang_thai === 0).length;
    const [childStop, setChildStop] = useState({
        Nam: 0,
        Nu: 0,
    })

    const countChildByGender = (data) => {
        const namCount = data.filter(item => item.Gioi_tinh === 1 && item.Trang_thai === 1).length;
        const nuCount = data.filter(item => item.Gioi_tinh === 0 && item.Trang_thai === 1).length;

        const namCountStop = data.filter(item => item.Gioi_tinh === 1 && item.Trang_thai === 0).length;
        const nuCountStop = data.filter(item => item.Gioi_tinh === 0 && item.Trang_thai === 0).length;

        setChild({
            Nam: namCount,
            Nu: nuCount,
        });

        setChildStop({
            Nam: namCountStop,
            Nu: nuCountStop,
        });
    }

    const classCount = dataClass.filter(data => data.trang_thai === 1).length;
    const [classData, setClassData] = useState({
        Loai1: 0,
        Loai2: 0,
        Loai3: 0,
    })

    const classCountStop = dataClass.filter(data => data.trang_thai === 0).length;
    const [classDataStop, setClassDataStop] = useState({
        Loai1: 0,
        Loai2: 0,
        Loai3: 0,
    })

    const countClassByLevel = (data) => {
        const loai1Count = data.filter(item => item.Loai_id === 301 && item.trang_thai === 1).length;
        const loai2Count = data.filter(item => item.Loai_id === 302 && item.trang_thai === 1).length;
        const loai3Count = data.filter(item => item.Loai_id === 303 && item.trang_thai === 1).length;

        const loai1CountStop = data.filter(item => item.Loai_id === 301 && item.trang_thai === 0).length;
        const loai2CountStop = data.filter(item => item.Loai_id === 302 && item.trang_thai === 0).length;
        const loai3CountStop = data.filter(item => item.Loai_id === 303 && item.trang_thai === 0).length;

        setClassData({
            Loai1: loai1Count,
            Loai2: loai2Count,
            Loai3: loai3Count,
        });

        setClassDataStop({
            Loai1: loai1CountStop,
            Loai2: loai2CountStop,
            Loai3: loai3CountStop,
        });
    }

    return (
        <div style={{
            marginBottom: '10px',
        }}>
            <div style={{
                textAlign: 'center',
                marginTop: 100,
            }}>
                <h1>Chào mừng đến hệ thống quản lý nhà trẻ</h1>
                <h2>Nơi chúng tôi chăm sóc và phát triển thế hệ tương lai với tình yêu và trách nhiệm</h2>
            </div>

            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Item>
                        <Typography align='center' sx={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        }}>THỐNG KÊ NHÂN VIÊN</Typography>
                        <h3>Nhân viên đang làm việc: {staffCount}</h3>
                        <Typography>Trong đó:</Typography>
                        <List sx={{ paddingLeft: '20px' }}>
                            <Typography>Giáo viên: {staff.giaoVien}</Typography>
                            <Typography>Y tá: {staff.yTa}</Typography>
                            <Typography>Bảo vệ: {staff.baoVe}</Typography>
                            <Typography>Lao công: {staff.laoCong}</Typography>
                        </List>
                        <h3>Nhân viên đã nghỉ việc: {staffCountStop}</h3>
                        <Typography>Trong đó:</Typography>
                        <List sx={{ paddingLeft: '20px' }}>
                            <Typography>Giáo viên: {staffStop.giaoVien}</Typography>
                            <Typography>Y tá: {staffStop.yTa}</Typography>
                            <Typography>Bảo vệ: {staffStop.baoVe}</Typography>
                            <Typography>Lao công: {staffStop.laoCong}</Typography>
                        </List>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <Typography align='center' sx={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        }}>THỐNG KÊ TRẺ</Typography>
                        <h3>Trẻ đang theo học: {childCount}</h3>
                        <Typography>Trong đó:</Typography>
                        <List sx={{ paddingLeft: '20px' }}>
                            <Typography>Nam: {child.Nam}</Typography>
                            <Typography>Nữ: {child.Nu}</Typography>
                        </List>
                        <h3>Trẻ đã nghỉ học: {childCountStop}</h3>
                        <Typography>Trong đó:</Typography>
                        <List sx={{ paddingLeft: '20px' }}>
                            <Typography>Nam: {childStop.Nam}</Typography>
                            <Typography>Nữ: {childStop.Nu}</Typography>
                        </List>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>
                        <Typography align='center' sx={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        }}>THỐNG KÊ LỚP</Typography>
                        <h3>Lớp học đang diễn ra: {classCount}</h3>
                        <Typography>Trong đó:</Typography>
                        <List sx={{ paddingLeft: '20px' }}>
                            <Typography>Loại 1: {classData.Loai1}</Typography>
                            <Typography>Loại 2: {classData.Loai2}</Typography>
                            <Typography>Loại 3: {classData.Loai3}</Typography>
                        </List>
                        <h3>Lớp học đã kết thúc: {classCountStop}</h3>
                        <Typography>Trong đó:</Typography>
                        <List sx={{ paddingLeft: '20px' }}>
                            <Typography>Loại 1: {classDataStop.Loai1}</Typography>
                            <Typography>Loại 2: {classDataStop.Loai2}</Typography>
                            <Typography>Loại 3: {classDataStop.Loai3}</Typography>
                        </List>
                    </Item>
                </Grid>
            </Grid>
        </div>
    );
}