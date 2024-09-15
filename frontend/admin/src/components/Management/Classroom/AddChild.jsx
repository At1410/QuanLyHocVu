import React, { useState } from "react";

import Swal from 'sweetalert2';
import { Modal, TextField, Box, Button, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';
import axios from "axios";


export default function AppChild() {

    const [formData, setFormData] = useState({
        Ten_tre: '',
        Ngay_sinh: '',
        Gioi_tinh: null,
        Ten_PH: '',
        Sdt: '',
        Dia_chi: '',
        Quan_he: '',
        Suc_khoe: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.Ten_tre = formData.Ten_tre ? "" : "Tên trẻ là bắt buộc.";
        tempErrors.Ngay_sinh = formData.Ngay_sinh ? "" : "Ngày sinh trẻ là bắt buộc.";
        tempErrors.Suc_khoe = formData.Suc_khoe ? "" : "Tình trang sức khỏe của trẻ là bắt buộc.";
        tempErrors.Sdt = formData.Sdt ? "" : "Số điện thoại phụ huynh là bắt buộc.";
        tempErrors.Dia_chi = formData.Dia_chi ? "" : "Địa chỉ phụ huynh là bắt buộc.";
        tempErrors.Quan_he = formData.Quan_he ? "" : "Quan hệ với trẻ là bắt buộc.";
        tempErrors.Ten_PH = formData.Ten_PH ? "" : "Tên phụ huynh là bắt buộc.";
        tempErrors.Gioi_tinh = formData.Gioi_tinh !== null ? "" : "Giới tính của trẻ là bắt buộc.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Dữ liệu gửi đi:', formData);

        if (validate()) {
            try {
                const response = await axios.post('http://localhost:5000/treem-phuhuynh', formData);
                if (response.data.success) {
                    handleClose();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Dữ liệu đã được thêm thành công!',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        setFormData({
                            Ten_tre: '',
                            Ngay_sinh: '',
                            Gioi_tinh: null,
                            Ten_PH: '',
                            Sdt: '',
                            Dia_chi: '',
                            Quan_he: '',
                            Suc_khoe: '',
                        });
                    });
                }
            } catch (error) {
                handleClose();
                console.error('Lỗi khi thêm dữ liệu:', error);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Thêm dữ liệu không thành công!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div>
            <Button variant="contained"
                onClick={handleOpen}>Thêm học sinh</Button>
            <Modal open={open} onClose={handleClose}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}
            >
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '50%',
                        margin: '0 auto',
                        padding: 2,
                        backgroundColor: '#f4f6f8',
                        borderRadius: '8px',
                    }}
                    onSubmit={handleSubmit}
                >

                    <TextField
                        size="small"
                        fullWidth
                        label="Tên phụ huynh*"
                        name="Ten_PH"
                        variant="outlined"
                        value={formData.Ten_PH}
                        onChange={handleChange}
                        error={!!errors.Ten_PH}
                        helperText={errors.Ten_PH}
                    />

                    <TextField
                        size="small"
                        fullWidth
                        label="Địa chỉ*"
                        name="Dia_chi"
                        variant="outlined"
                        value={formData.Dia_chi}
                        onChange={handleChange}
                        error={!!errors.Dia_chi}
                        helperText={errors.Dia_chi}
                    />

                    <div style={{
                        display: 'flex',
                    }}>

                        <TextField
                            size="small"
                            fullWidth
                            label="Số điện thoại*"
                            name="Sdt"
                            variant="outlined"
                            value={formData.Sdt}
                            onChange={handleChange}
                            error={!!errors.Sdt}
                            helperText={errors.Sdt}
                            sx={{
                                marginRight: '5px',
                            }}
                        />

                        <TextField
                            size="small"
                            fullWidth
                            label="Quan hệ với trẻ*"
                            name="Quan_he"
                            variant="outlined"
                            value={formData.Quan_he}
                            onChange={handleChange}
                            error={!!errors.Quan_he}
                            helperText={errors.Quan_he}
                            sx={{
                                marginLeft: '5px',
                            }}
                        />

                    </div>

                    <TextField
                        size="small"
                        fullWidth
                        label="Tên trẻ*"
                        name="Ten_tre"
                        variant="outlined"
                        value={formData.Ten_tre}
                        onChange={handleChange}
                        error={!!errors.Ten_tre}
                        helperText={errors.Ten_tre}
                    />

                    <div style={{
                        display: 'flex',
                    }}>
                        <TextField
                            size="small"
                            fullWidth
                            label="Ngày sinh trẻ*"
                            name="Ngay_sinh"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={formData.Ngay_sinh}
                            onChange={handleChange}
                            error={!!errors.Ngay_sinh}
                            helperText={errors.Ngay_sinh}
                            sx={{
                                marginRight: '5px',
                            }}
                        />

                        <TextField
                            size="small"
                            fullWidth
                            label="Tình trang sức khỏe*"
                            name="Suc_khoe"
                            variant="outlined"
                            value={formData.Suc_khoe}
                            onChange={handleChange}
                            error={!!errors.Suc_khoe}
                            helperText={errors.Suc_khoe}
                            sx={{
                                marginLeft: '5px',
                            }}
                        />
                    </div>

                    <FormControl fullWidth size="small"
                        sx={{
                            marginLeft: '10px',
                        }}
                        error={!!errors.Gioi_tinh}
                    >
                        <FormLabel component="legend">Giới tính</FormLabel>
                        <RadioGroup
                            aria-label="Giới tính*"
                            name="Gioi_tinh"
                            value={formData.Gioi_tinh}
                            onChange={handleChange}
                            sx={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <FormControlLabel value={0} control={<Radio />} label="Nữ" />
                            <FormControlLabel value={1} control={<Radio />} label="Nam" />
                        </RadioGroup>

                        <FormHelperText>{errors.Gioi_tinh}</FormHelperText>
                    </FormControl>

                    <Button variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: '#89b847',
                            '&:hover': {
                                backgroundColor: '#75a73f',
                                cursor: 'pointer'
                            },
                        }}
                    >
                        Thêm
                    </Button>
                </Box>
            </Modal>
        </div>


    );
}