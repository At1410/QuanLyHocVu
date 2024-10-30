import React, { useState } from 'react';
import { TextField, Container, Grid, Box, Typography, styled } from '@mui/material';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function RegisterClass() {

    //Style
    const StyleButton = styled('div')({
        backgroundColor: '#ff99ac',
        marginBottom: '30px',
        padding: '5px',
        borderRadius: 3,
        '&:hover': {
            backgroundColor: '#fbb1bd',
        }
    })

    const [formData, setFormData] = useState({
        Ho_ten: '',
        Ngay_sinh_tre: '',
        Sdt: '',
        Dia_chi: '',
        Ngay_den_tham: '',
        Buoi: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value === "false" ? false : (value === "true" ? true : value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.Ho_ten?.trim() === '' || formData.Ngay_den_tham?.trim() === '' ||
            formData.Dia_chi?.trim() === '' ||
            formData.Sdt?.trim() === '' || formData.Ngay_sinh_tre?.trim() === '' ||
            formData.Buoi === null) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Vui lòng nhập đầy đủ thông tin.',
                icon: 'error',
            });
            return;
        }

        const phoneRegex = /^(0[3-9]\d{8}|(0[2-9]\d{7}))$/;
        if (!phoneRegex.test(formData.Sdt)) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam hợp lệ.',
                icon: 'error',
            });
            return;
        }

        const today = new Date();
        const birthDate = new Date(formData.Ngay_sinh_tre);
        if (birthDate >= today) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Ngày sinh phải trước ngày hôm nay.',
                icon: 'error',
            });
            return;
        }

        const goDate = new Date(formData.Ngay_den_tham);
        if (goDate <= today) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Ngày đến thăm phải sau ngày hôm nay.',
                icon: 'error',
            });

            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/dang-ky`, formData);
            if (response.data.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Đăng ký thành công!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setFormData({
                    Ho_ten: '',
                    Ngay_sinh_tre: '',
                    Sdt: '',
                    Dia_chi: '',
                    Ngay_den_tham: '',
                    Buoi: null,
                });
            }
        } catch (error) {
            console.error('Lỗi khi thêm dữ liệu:', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Đăng ký không thành công!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <Container maxWidth="sm" sx={{
            marginTop: 10,
        }}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    mt: 3,
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Thông Tin Đăng Ký Ghé Thăm
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            fullWidth
                            label="Họ tên"
                            name="Ho_ten"
                            variant="outlined"
                            value={formData.Ho_ten}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            fullWidth
                            label="Ngày sinh trẻ"
                            name="Ngay_sinh_tre"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={formData.Ngay_sinh_tre}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            size='small'
                            label="Số điện thoại"
                            name="Sdt"
                            variant="outlined"
                            value={formData.Sdt}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            fullWidth
                            label="Địa chỉ"
                            name="Dia_chi"
                            variant="outlined"
                            value={formData.Dia_chi}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size='small'
                            fullWidth
                            label="Ngày đến thăm"
                            name="Ngay_den_tham"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={formData.Ngay_den_tham}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormLabel component="legend">Chọn buổi*</FormLabel>
                            <RadioGroup
                                aria-label="buoi"
                                name="Buoi"
                                value={formData.Buoi}
                                onChange={handleChange}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Buổi Sáng" />
                                <FormControlLabel value={1} control={<Radio />} label="Buổi Chiều" />
                            </RadioGroup>

                        </FormControl>
                    </Grid>
                </Grid>
                <Box size='small' sx={{ mt: 3, textAlign: 'center' }}>
                    <StyleButton type="submit" onClick={handleSubmit}>
                        Đăng Ký
                    </StyleButton>
                </Box>
            </Box>


            <style>
                {`
                        .swal2-custom-popup {
                            width: 300px !important;
                            font-size: 15px !important;
                        }

                        @media (max-width: 600px) {
                            .swal2-custom-popup {
                                width: 70% !important;
                            }
                        }
                    `}
            </style>
        </Container >
    );
}
