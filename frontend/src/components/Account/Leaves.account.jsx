import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'

export default function LeavesAccount() {

    const [username, setUsername] = useState('');

    const [formData, setFormData] = useState({
        ngay_nghi: '',
        ngay_hoc_lai: '',
        ly_do: '',
    });

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const id_tre = parseInt(username, 10);
    console.log(id_tre);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value === "false" ? false : (value === "true" ? true : value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.ngay_nghi?.trim() === '' || formData.ngay_hoc_lai?.trim() === '' ||
            formData.ly_do?.trim() === '') {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Vui lòng nhập đầy đủ thông tin.',
                icon: 'error',
            });
            return;
        }

        const today = new Date();
        const goDate = new Date(formData.ngay_nghi);
        if (goDate <= today) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Ngày nghỉ phải sau ngày hôm nay.',
                icon: 'error',
            });
            return;
        }

        const goDate1 = new Date(formData.ngay_hoc_lai);
        if (goDate1 <= goDate) {
            Swal.fire({
                title: 'Lỗi!',
                text: 'Ngày học lại phải sau ngày nghỉ.',
                icon: 'error',
            });
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/dk-nghi-hoc/${id_tre}`, formData);
            if (response.data.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Đăng ký thành công!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setFormData({
                    ngay_nghi: '',
                    ngay_hoc_lai: '',
                    ly_do: '',
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
        <div>
            <Typography fontWeight="bold"
                sx={{
                    padding: '20px',
                }} >ĐĂNG KÍ CHO BÉ KHÔNG ĐẾN NHÀ TRẺ TRONG MỘT VÀI NGÀY</Typography>
            <Grid
                container spacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                    paddingRight: '20px',

                }}
            // direction={isMobile ? 'column' : 'row'}
            >
                <Grid item xs={6}>
                    <TextField
                        size='small'
                        fullWidth
                        label="Ngày nghỉ học"
                        name="ngay_nghi"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        value={formData.ngay_nghi}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        size='small'
                        fullWidth
                        label="Ngày đi học trở lại"
                        name="ngay_hoc_lai"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        value={formData.ngay_hoc_lai}
                        onChange={handleChange}
                        required
                    />
                </Grid>
            </Grid>
            <div
                style={{
                    paddingLeft: '20px',
                    paddingRight: '20px'
                }}
            >
                <TextField
                    fullWidth
                    label="Lý do"
                    name="ly_do"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={formData.ly_do}
                    onChange={handleChange}
                    required
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Button variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        backgroundColor: '#ff99ac',
                        margin: '15px',
                        padding: '5px',
                        borderRadius: 1,
                        '&:hover': {
                            backgroundColor: '#fbb1bd',
                        }
                    }}
                >
                    Gửi
                </Button>
            </div>
        </div>
    );
}