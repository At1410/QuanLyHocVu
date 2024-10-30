import React, { useState } from 'react';
import axios from 'axios';

import UpdateImg from './UpLoadImg.jsx';

import { Modal, TextField, Box, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
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
        trang_thai: true,
        Chuc_vu_id: '',
        image_nv: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleImageUpload = (imageFile) => {
        setFormData((prevData) => ({
            ...prevData,
            image_nv: imageFile,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.Ten_Nhan_Vien?.trim() === '' ||
            formData.Ngay_sinh?.trim() === '' ||
            formData.Dia_chi?.trim() === '' ||
            formData.Que_quan?.trim() === '' ||
            formData.Sdt?.trim() === '' ||
            formData.CMND?.trim() === '' ||
            formData.Gioi_tinh === null ||
            formData.Chuc_vu_id === '' ||
            formData.image_nv === null) {
            Swal.fire(
                'Lỗi!',
                'Vui lòng nhập đầy đủ thông tin.',
                'error'
            );
            return;
        }

        const CCCD = /^\d{14}$/;
        if (!CCCD.test(formData.CMND)) {
            Swal.fire(
                'Lỗi!',
                'CCCD không hợp lệ. Vui lòng nhập lại số CCCD.',
                'error'
            );
            return;
        }

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

        try {
            const formDataImage = new FormData();
            formDataImage.append("image_nv", formData.image_nv);

            const imageUrlResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/upload`,
                formDataImage
            );
            // console.log(imageUrlResponse);

            setFormData((prevData) => ({
                ...prevData,
                image_nv: imageUrlResponse.data.url,
            }));
            // console.log({ ...formData, image_nv: imageUrlResponse.data.url });

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/nhan-vien`,
                { ...formData, image_nv: imageUrlResponse.data.url }
            );
            if (response.data.success) {
                handleClose();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Dữ liệu đã được thêm thành công!",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    setFormData({
                        Ten_Nhan_Vien: "",
                        Ngay_sinh: "",
                        Dia_chi: "",
                        Gioi_tinh: null,
                        Que_quan: "",
                        Sdt: "",
                        CMND: "",
                        trang_thai: true,
                        Chuc_vu_id: "",
                        image_nv: null,
                    });
                });
            }
        } catch (error) {
            handleClose();
            // console.error("Lỗi khi thêm dữ liệu:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Thêm dữ liệu không thành công!",
                showConfirmButton: false,
                timer: 1500,
            });
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
                    />

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
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                    }}>
                        <TextField
                            size="small"
                            fullWidth
                            label="Địa chỉ"
                            name="Dia_chi"
                            variant="outlined"
                            value={formData.Dia_chi}
                            onChange={handleChange}
                            sx={{ marginTop: 0 }}
                        />

                        <TextField
                            size="small"
                            fullWidth
                            label="Quê quán"
                            name="Que_quan"
                            variant="outlined"
                            value={formData.Que_quan}
                            onChange={handleChange}
                            sx={{ marginLeft: '10px' }}
                        />
                    </div>

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
                            sx={{ marginTop: '10px' }}
                        />

                        <FormControl fullWidth size="small" sx={{ marginTop: '10px', marginLeft: '10px' }}>
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
                        </FormControl>

                        <FormControl fullWidth size="small"
                            sx={{
                                marginLeft: '20px',
                            }}
                        >
                            <FormLabel component="legend">Giới tính*</FormLabel>
                            <RadioGroup
                                aria-label="Giới tính"
                                name="Gioi_tinh"
                                value={formData.Gioi_tinh}
                                onChange={handleChange}
                                sx={{ display: 'flex', flexDirection: 'row', marginTop: 0 }}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Nữ" />
                                <FormControlLabel value={1} control={<Radio />} label="Nam" />
                            </RadioGroup>
                        </FormControl>

                    </div>

                    <UpdateImg onImageUpload={handleImageUpload} />

                    <Button variant="contained" onClick={handleSubmit}
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