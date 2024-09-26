import React, { useState } from "react";

import Swal from 'sweetalert2';
import { Modal, TextField, Box, Button, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';
import axios from "axios";


export default function AppChild({ open, setOpen }) {

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

    const handleClose = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^(0[3-9]\d{8}|(0[2-9]\d{7}))$/;
        if (!phoneRegex.test(formData.Sdt)) {
            Swal.fire(
                'Lỗi!',
                'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam hợp lệ.',
                'error'
            );
            return;
        }

        const today = new Date();
        const birthDate = new Date(formData.Ngay_sinh);
        if (birthDate >= today) {
            Swal.fire(
                'Lỗi!',
                'Ngày sinh phải trước ngày hôm nay.',
                'error'
            );
            return;
        }

        if (formData.Ten_PH?.trim() === '' || formData.Ngay_sinh?.trim() === '' ||
            formData.Dia_chi?.trim() === '' ||
            formData.Quan_he?.trim() === '' || formData.Sdt?.trim() === '' ||
            formData.Ten_tre?.trim() === '' || formData.Gioi_tinh === null || formData.Suc_khoe === '') {
            Swal.fire(
                'Lỗi!',
                'Vui lòng nhập đầy đủ thông tin.',
                'error'
            );
            return;
        }



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

    return (
        <div>
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
                    />

                    <TextField
                        size="small"
                        fullWidth
                        label="Địa chỉ*"
                        name="Dia_chi"
                        variant="outlined"
                        value={formData.Dia_chi}
                        onChange={handleChange}
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
                            sx={{
                                marginLeft: '5px',
                            }}
                        />
                    </div>

                    <FormControl fullWidth size="small"
                        sx={{
                            marginLeft: '10px',
                        }}
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