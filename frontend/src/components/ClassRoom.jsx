import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Loai1 from '../img/AnhLoai1.png';
import Loai2 from '../img/AnhLoai2.png';
import Loai3 from '../img/AnhLoai3.png';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ClassRoom() {
    //Style
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        textAlign: 'left',
        alignItems: 'center',
        marginBottom: '15px',
    }));

    const StyleImg = styled('img')({
        width: '100%',
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
        fetch(`${process.env.REACT_APP_API_URL}/loai`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const StyleDiv = styled('div')({
        textAlign: 'center',
        marginTop: 90,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '1200px',
        paddingLeft: '15px',
        paddingRight: '15px',
    });

    return (
        <StyleDiv>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                direction={isMobile ? 'column' : 'row'}
            >
                {data.map(item => (
                    <Grid key={item.id} item xs={12} sm={6} md={4}>
                        <Item>
                            {
                                item.id === 301 ? <StyleImg src={Loai1} alt="Loai1" /> :
                                    item.id === 302 ? <StyleImg src={Loai2} alt="Loai2" /> :
                                        <StyleImg src={Loai3} alt="Loai3" />
                            }
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