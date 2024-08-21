import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import BG from "../../../img/Background.png";

function Information() {
    //Style
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const StyledItem = styled(Box)({
        width: 200,
        height: 400,
    });

    const StyleDiv = styled('div')({
        textAlign: 'center',
        marginTop: 20,
    });

    const StyleImg = styled('img')({
        width: '100%',
        height: '100',
        objectFit: 'cover',
        borderRadius: '5px',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    });

    return (
        <StyleDiv>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(3)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Item>
                            <StyledItem>
                                <StyleImg src={BG} alt="ImgTC" />
                            </StyledItem>
                            <div>
                                <p>Tên nhân viên: </p>
                                <p>Chức vụ: </p>
                                <p>Ngày sinh: </p>
                                <p>Giới tính: </p>
                                <p>Địa chỉ: </p>
                                <p>Số điện thoại: </p>
                                <p>Email: </p>
                            </div>

                        </Item>
                    </Grid>
                ))}
            </Grid>
        </StyleDiv>
    );
}

export default Information;