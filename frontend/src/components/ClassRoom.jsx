import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Loai1 from '../img/AnhLoai1.png';

export default function ClassRoom() {
    //Style
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        textAlign: 'left',
        alignItems: 'center',
    }));

    const StyleDiv = styled('div')({
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    });

    const StyleImg = styled('img')({
        width: '100%', // Điều chỉnh kích thước ảnh
        height: '100%',
        objectFit: 'cover',
        borderRadius: '5px',
        border: '1px solid #000000',
    });

    const StyleDivItem = styled('div')({
        textAlign: 'left',
        marginLeft: 10,
        color: '#000000',
    });

    //Xử lý
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/loai')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    return (
        <StyleDiv>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {data.map(item => (
                    <Grid key={item.id} item xs={4}>
                        <Item>
                            <StyleImg src={Loai1} alt="ImgL1" />
                            <StyleDivItem>
                                <p>Loại lớp: {item.Loai_lop}</p>
                                <p>Mô tả: {item.Ghi_chu}</p>
                                <p>Số lượng trẻ: {item.So_luong} trẻ/1 lớp</p>
                                <p>Số lượng giáo viên: {item.SL_giaovien} giáo viên/1 lớp</p>
                                <p>Học phí: {item.Hoc_phi}</p>
                            </StyleDivItem>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </StyleDiv>
    );
}