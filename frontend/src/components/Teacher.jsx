import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import BG from "../img/Baby.png";

function Teacher() {
    //Style
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        textAlign: 'left',
        display: 'flex', // Sử dụng flexbox để bố trí các phần tử ngang hàng
        alignItems: 'center',
    }));

    const StyleDiv = styled('div')({
        textAlign: 'center',
        marginTop: 20,
    });

    const StyleImg = styled('img')({
        width: '150px', // Điều chỉnh kích thước ảnh
        height: '150px',
        objectFit: 'cover',
        borderRadius: '5px',
        marginRight: '20px', // Thêm khoảng cách giữa ảnh và thông tin
    });

    const StyleDivItem = styled('div')({
        textAlign: 'left',
        marginLeft: 10,
        color: '#000000',
    });

    //Xử lý
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/teacher')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <StyleDiv>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {data.map(item => (
                        <Grid key={item.id} item xs={6}>
                            <Item>
                                <StyleImg src={BG} alt="ImgTC" />
                                <StyleDivItem>
                                    <p>Tên Giáo Viên: {item.Ten_Nhan_Vien}</p>
                                    <p>Ngày sinh: {formatDate(item.Ngay_sinh)}</p>
                                    <p>Giới tính: {item.Gioi_tinh}</p>
                                </StyleDivItem>
                            </Item>
                        </Grid>
                    ))}

                </Grid>
            </StyleDiv>
        </div>
    );
}

export default Teacher;