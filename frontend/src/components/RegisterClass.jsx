import React, { useState } from 'react';
import { TextField, Container, Grid, Box, Typography, styled, FormHelperText } from '@mui/material';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function RegisterClass() {

    //Style
    const StyleButton = styled('div')({
        backgroundColor: '#ff99ac',
        marginBottom: '30px',
        padding: '10px',
        borderRadius: 3,
        // borderColor: '#ff99ac',
        '&:hover': {
            backgroundColor: '#fbb1bd',
        }
    })

    // Khai báo state để lưu trữ giá trị từ các trường form
    const [formData, setFormData] = useState({
        Ho_ten: '',
        Ngay_sinh_tre: '',
        Sdt: '',
        Dia_chi: '',
        Ngay_den_tham: '',
        Buoi: null,
    });

    const [errors, setErrors] = useState({});

    // Hàm xử lý kiểm tra các trường trong form
    const validate = () => {
        let tempErrors = {};
        tempErrors.Ho_ten = formData.Ho_ten ? "" : "Tên phụ huynh là bắt buộc.";
        tempErrors.Ngay_sinh_tre = formData.Ngay_sinh_tre ? "" : "Ngày sinh của trẻ là bắt buộc.";
        tempErrors.Sdt = formData.Sdt ? "" : "Số điện thoại phụ huynh là bắt buộc.";
        tempErrors.Dia_chi = formData.Dia_chi ? "" : "Địa chỉ phụ huynh là bắt buộc.";
        tempErrors.Ngay_den_tham = formData.Ngay_den_tham ? "" : "Ngày đến tham khảo là bắt buộc.";
        tempErrors.Buoi = formData.Buoi !== null ? "" : "Buổi đến tham khảo là bắt buộc.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    // Hàm xử lý khi có thay đổi trong các trường form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value === "false" ? false : (value === "true" ? true : value),
        });
    };

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setFormData({
                Ho_ten: '',
                Ngay_sinh_tre: '',
                Sdt: '',
                Dia_chi: '',
                Ngay_den_tham: '',
                Buoi: null,
            });
            try {
                const response = await axios.post('http://localhost:5000/dang-ky', formData);
                if (response.data.success) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Đăng ký thành công!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.error('Lỗi khi thêm dữ liệu:', error);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Đăng ký không thành công!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 10 }}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ mt: 3 }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Thông Tin Đăng Ký Ghé Thăm
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Họ tên"
                            name="Ho_ten"
                            variant="outlined"
                            value={formData.Ho_ten}
                            onChange={handleChange}
                            required
                            error={!!errors.Ho_ten}
                            helperText={errors.Ho_ten}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Ngày sinh trẻ"
                            name="Ngay_sinh_tre"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={formData.Ngay_sinh_tre}
                            onChange={handleChange}
                            required
                            error={!!errors.Ngay_sinh_tre}
                            helperText={errors.Ngay_sinh_tre}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Số điện thoại"
                            name="Sdt"
                            variant="outlined"
                            value={formData.Sdt}
                            onChange={handleChange}
                            required
                            error={!!errors.Sdt}
                            helperText={errors.Sdt}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Địa chỉ"
                            name="Dia_chi"
                            variant="outlined"
                            value={formData.Dia_chi}
                            onChange={handleChange}
                            required
                            error={!!errors.Dia_chi}
                            helperText={errors.Dia_chi}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Ngày đến thăm"
                            name="Ngay_den_tham"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={formData.Ngay_den_tham}
                            onChange={handleChange}
                            required
                            error={!!errors.Ngay_den_tham}
                            helperText={errors.Ngay_den_tham}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!errors.Buoi}>
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
                            <FormHelperText>{errors.Buoi}</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <StyleButton type="submit" onClick={handleSubmit}>
                        Đăng Ký
                    </StyleButton>
                </Box>
            </Box>
        </Container>
    );
}
