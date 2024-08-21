import React from 'react';
import { Box, Typography, TextField, Button, styled, Paper } from '@mui/material';
import BackgroundImage from '../../img/Background.png';

export default function LoginForm() {
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
    const handleSubmit = (e) => {
        e.preventDefault();
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
                        />
                        <TextField
                            autoComplete="off"
                            label="Mật khẩu"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
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

