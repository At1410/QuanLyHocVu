import React from 'react';
import Swal from 'sweetalert2'

import { Box, Typography, TextField, Button, styled, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../../img/Background.png';

export default function LoginForm({ setIsLoggedIn }) {
    // Style
    const backgroundStyle = {
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
    };

    const StyledForm = styled('form')({
        display: 'flex',
        flexDirection: 'column',
    });

    const StyledPaper = styled(Paper)(({ theme }) => ({
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }));



    // Xử lý
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Lấy giá trị tên đăng nhập và mật khẩu từ các trường input
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        // Kiểm tra tên đăng nhập và mật khẩu
        if (username === 'admin' && password === 'admin') {
            setIsLoggedIn(true);
            navigate('/');

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Đăng nhập thành công!",
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Đăng nhập không thành công!",
                text: "Tên hoặc mật khẩu đăng nhập không đúng!",
            })
        }
    }

    return (
        <div>
            <Box style={backgroundStyle}>
                <StyledPaper>
                    <Typography variant="h4" align="center" sx={{ color: "#89b847" }}>
                        Đăng Nhập
                    </Typography>
                    <StyledForm onSubmit={handleSubmit}>
                        <TextField
                            autoComplete="off"
                            label="Tên đăng nhập"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            name="username"
                        />
                        <TextField
                            autoComplete="off"
                            label="Mật khẩu"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            name="password"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth

                            sx={{
                                backgroundColor: "#89b847",
                                '&:hover': {
                                    backgroundColor: "#75a73f",
                                },
                            }}
                        >
                            Đăng Nhập
                        </Button>
                    </StyledForm>
                </StyledPaper>

            </Box>
        </div>
    );
};

