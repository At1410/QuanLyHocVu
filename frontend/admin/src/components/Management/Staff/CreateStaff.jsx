import React, { useState } from 'react';
import axios from 'axios';

import { Modal, TextField, Box, Button, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import Swal from 'sweetalert2'

export default function CreateStaff() {

    const [formData, setFormData] = useState({
        Ten_Nhan_Vien: '',
        Ngay_sinh: '',
        Dia_chi: '',
        Gioi_tinh: null,
        Que_quan: '',
        Sdt: '',
        CMND: '',
        Lop_id: null,
        trang_thai: true,
        Chuc_vu_id: '',
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
        tempErrors.Ten_Nhan_Vien = formData.Ten_Nhan_Vien ? "" : "Tên nhân viên là bắt buộc.";
        tempErrors.Ngay_sinh = formData.Ngay_sinh ? "" : "Ngày sinh là bắt buộc.";
        tempErrors.Sdt = formData.Sdt ? "" : "Số điện thoại là bắt buộc.";
        tempErrors.Dia_chi = formData.Dia_chi ? "" : "Địa chỉ là bắt buộc.";
        tempErrors.Que_quan = formData.Que_quan ? "" : "Quê quán là bắt buộc.";
        tempErrors.CMND = formData.CMND ? "" : "Số CMND là bắt buộc.";
        tempErrors.Chuc_vu_id = formData.Chuc_vu_id ? "" : "Chức vụ là bắt buộc.";
        tempErrors.Gioi_tinh = formData.Gioi_tinh !== null ? "" : "Giới tính là bắt buộc.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };


    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('handleSubmit đã được gọi');

        if (validate()) {
            try {
                const response = await axios.post('http://localhost:5000/nhan-vien', formData);
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
                            Ten_Nhan_Vien: '',
                            Ngay_sinh: '',
                            Dia_chi: '',
                            Gioi_tinh: null,
                            Que_quan: '',
                            Sdt: '',
                            CMND: '',
                            trang_thai: true,
                            Chuc_vu_id: '',
                            Lop_id: null,
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
            <Button variant="contained" onClick={handleOpen}
                sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '16px',
                    marginLeft: 5,
                    backgroundColor: '#89b847',
                    '&:hover': {
                        backgroundColor: '#75a73f',
                    },
                }}
            >
                Thêm nhân viên
            </Button>

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
                        label="Tên nhân viên"
                        name="Ten_Nhan_Vien"
                        variant="outlined"
                        value={formData.Ten_Nhan_Vien}
                        onChange={handleChange}
                        error={!!errors.Ten_Nhan_Vien}
                        helperText={errors.Ten_Nhan_Vien}
                    />


                    <div style={{
                        display: 'flex',
                    }}>
                        <TextField
                            size="small"
                            fullWidth
                            label="Ngày sinh"
                            name="Ngay_sinh"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            value={formData.Ngay_sinh}
                            onChange={handleChange}
                            error={!!errors.Ngay_sinh}
                            helperText={errors.Ngay_sinh}
                        />

                        <TextField
                            sx={{ marginLeft: '10px' }}
                            size="small"
                            fullWidth
                            label="Số điện thoại"
                            name="Sdt"
                            variant="outlined"
                            value={formData.Sdt}
                            onChange={handleChange}
                            error={!!errors.Sdt}
                            helperText={errors.Sdt}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                    }}>
                        <TextField
                            size="small"
                            fullWidth
                            label="Số CCCD"
                            name="CMND"
                            variant="outlined"
                            value={formData.CMND}
                            onChange={handleChange}
                            error={!!errors.CMND}
                            helperText={errors.CMND}
                        />

                        <FormControl fullWidth size="small" sx={{ marginLeft: '10px' }} error={!!errors.Chuc_vu_id}>
                            <InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData.Chuc_vu_id}
                                label="Chức vụ"
                                name="Chuc_vu_id"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Giáo viên</MenuItem>
                                <MenuItem value={2}>Bảo vệ</MenuItem>
                                <MenuItem value={3}>Ý tá</MenuItem>
                                <MenuItem value={4}>Lao công</MenuItem>
                            </Select>
                            <FormHelperText>{errors.Chuc_vu_id}</FormHelperText>
                        </FormControl>
                    </div>

                    <TextField
                        size="small"
                        fullWidth
                        label="Địa chỉ"
                        name="Dia_chi"
                        variant="outlined"
                        value={formData.Dia_chi}
                        onChange={handleChange}
                        error={!!errors.Dia_chi}
                        helperText={errors.Dia_chi}
                    />

                    <TextField
                        size="small"
                        fullWidth
                        label="Quê quán"
                        name="Que_quan"
                        variant="outlined"
                        value={formData.Que_quan}
                        onChange={handleChange}
                        error={!!errors.Que_quan}
                        helperText={errors.Que_quan}
                    />


                    <FormControl fullWidth size="small"
                        sx={{
                            marginLeft: '10px',
                        }}
                        error={!!errors.Gioi_tinh}
                    >
                        <FormLabel component="legend">Giới tính*</FormLabel>
                        <RadioGroup
                            aria-label="Giới tính"
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

                    <Button variant="contained" type="submit" onClick={handleSubmit}
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