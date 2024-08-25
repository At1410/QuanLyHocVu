import React, { useState } from 'react';
import { TextField, Container, Grid, Box, Typography, styled, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

export default function RegisterClass() {

    //Style
    const StyleButton = styled('div')({
        backgroundColor: '#ff99ac',
        marginBottom: '30px',
        padding: '10px',
        borderRadius: 3,
        '&:hover': {
            backgroundColor: '#fbb1bd',
        }
    })

    // Khai báo state để lưu trữ giá trị từ các trường form
    const [formData, setFormData] = useState({
        ho_ten: '',
        ngay_sinh_tre: '',
        sdt: '',
        dia_chi: '',
        ngay_den_tham: '',
        buoi: '',
    });

    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Hàm xử lý kiểm tra các trường trong form
    const validate = () => {
        let tempErrors = {};
        tempErrors.ho_ten = formData.ho_ten ? "" : "Tên phụ huynh là bắt buộc.";
        tempErrors.ngay_sinh_tre = formData.ngay_sinh_tre ? "" : "Ngày sinh của trẻ là bắt buộc.";
        tempErrors.sdt = formData.sdt ? "" : "Số điện thoại phụ huynh là bắt buộc.";
        tempErrors.dia_chi = formData.dia_chi ? "" : "Địa chỉ phụ huynh là bắt buộc.";
        tempErrors.ngay_den_tham = formData.ngay_den_tham ? "" : "Ngày đến tham khảo là bắt buộc.";
        tempErrors.buoi = formData.buoi ? "" : "Buổi đến tham khảo là bắt buộc.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    // Hàm xử lý khi có thay đổi trong các trường form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Hàm xử lý khi submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log(formData);
            setFormData({
                ho_ten: '',
                ngay_sinh_tre: '',
                sdt: '',
                dia_chi: '',
                ngay_den_tham: '',
                buoi: '',
            });
            setOpenSnackbar(true);
        }

        // try {
        //     // Gửi yêu cầu POST đến endpoint '/api/submit'
        //     const response = await fetch('http://localhost:5000/api/submit', {
        //       method: 'POST', // Phương thức HTTP là POST
        //       headers: {
        //         'Content-Type': 'application/json', // Định dạng nội dung là JSON
        //       },
        //       body: JSON.stringify(formData), // Dữ liệu form được chuyển đổi thành chuỗi JSON
        //     });

        //     // Kiểm tra nếu phản hồi từ server là thành công
        //     if (response.ok) {
        //       console.log('Form submitted successfully'); // In thông báo thành công nếu phản hồi là 2xx
        //       // Xóa dữ liệu form sau khi gửi thành công
        //       setFormData({
        //         hoTen: '',
        //         ngaySinh: '',
        //         sdt: '',
        //         diaChi: '',
        //         ngayDenTham: '',
        //         buoi: '',
        //       });
        //     } else {
        //       console.error('Error submitting form'); // In thông báo lỗi nếu phản hồi không phải là 2xx
        //     }
        //   } catch (error) {
        //     console.error('Error:', error); // Xử lý lỗi nếu có lỗi xảy ra trong quá trình gửi yêu cầu
        //   }
    };

    // Hàm đóng Snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm">
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
                            name="ho_ten"
                            variant="outlined"
                            value={formData.ho_ten}
                            onChange={handleChange}
                            required
                            error={!!errors.ho_ten}
                            helperText={errors.ho_ten}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Ngày sinh trẻ"
                            name="ngay_sinh_tre"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={formData.ngay_sinh_tre}
                            onChange={handleChange}
                            required
                            error={!!errors.ngay_sinh_tre}
                            helperText={errors.ngay_sinh_tre}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Số điện thoại"
                            name="sdt"
                            variant="outlined"
                            value={formData.sdt}
                            onChange={handleChange}
                            required
                            error={!!errors.sdt}
                            helperText={errors.sdt}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Địa chỉ"
                            name="dia_chi"
                            variant="outlined"
                            value={formData.dia_chi}
                            onChange={handleChange}
                            required
                            error={!!errors.dia_chi}
                            helperText={errors.dia_chi}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Ngày đến thăm"
                            name="ngay_den_tham"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={formData.ngay_den_tham}
                            onChange={handleChange}
                            required
                            error={!!errors.ngay_den_tham}
                            helperText={errors.ngay_den_tham}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Buổi"
                            name="buoi"
                            variant="outlined"
                            value={formData.buoi}
                            onChange={handleChange}
                            required
                            error={!!errors.buoi}
                            helperText={errors.buoi}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <StyleButton type="submit" onClick={handleSubmit}>
                        Đăng Ký
                    </StyleButton>
                </Box>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{
                    width: '100%',
                    border: '2px solid #224a24'
                }}>
                    Đăng ký thông tin thành công!
                </MuiAlert>
            </Snackbar>
        </Container>
    );
}
