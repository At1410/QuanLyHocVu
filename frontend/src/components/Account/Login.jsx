import React, { useEffect } from 'react';
import Swal from 'sweetalert2'

import { Box, Typography, TextField, Button, styled, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {

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

    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            setIsLoggedIn(true);
            navigate('/taikhoan');
        }
    }, [setIsLoggedIn, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        fetch(`${process.env.REACT_APP_API_URL}/tai-khoan/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Không thể lấy dữ liệu người dùng");
                }
                return response.json();
            })
            .then(data => {
                if (!data || data.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Đăng nhập không thành công!",
                        text: "Tên đăng nhập không đúng!",
                    });
                } else {
                    if (String(username) === String(data[0].id) && password === data[0].Sdt) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Đăng nhập thành công!",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            localStorage.setItem('isLoggedIn', 'true');
                            localStorage.setItem('username', username);
                            setIsLoggedIn(true);
                            navigate('/taikhoan');
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Đăng nhập không thành công!",
                            text: "Tên hoặc mật khẩu đăng nhập không đúng!",
                        });
                    }
                }
            })
            .catch(error => {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
                Swal.fire({
                    icon: "error",
                    title: "Có lỗi xảy ra!",
                    text: "Không thể lấy dữ liệu người dùng.",
                });
            });

    };

    return (
        <div>
            <Box>
                <StyledPaper>
                    <Typography variant="h4" align="center" sx={{ color: "#ff99ac" }}>
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
                                backgroundColor: '#ff99ac',
                                marginTop: '10px',
                                padding: '5px',
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: '#fbb1bd',
                                }
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

