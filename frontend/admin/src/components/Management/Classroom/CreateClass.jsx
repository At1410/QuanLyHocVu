import React, { useState } from "react";

import Swal from 'sweetalert2';
import { Modal, TextField, Box, Button, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';
import axios from "axios";

export default function CreateClass() {

    const [formData, setFormData] = useState({
        Ten_lop: '',
        Ngay_DB: '',
        Ngay_KT: '',
        Loai_id: '',
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
        tempErrors.Ten_lop = formData.Ten_lop ? "" : "Tên lớp là bắt buộc.";
        tempErrors.Ngay_DB = formData.Ngay_DB ? "" : "Ngày bắt đầu lớp học là bắt buộc.";
        tempErrors.Ngay_KT = formData.Ngay_KT ? "" : "Ngày kết thúc lớp học là bắt buộc.";
        tempErrors.Loai_id = formData.Loai_id ? "" : "Loại lớp là bắt buộc.";
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
                const response = await axios.post('http://localhost:5000/lop', formData);
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
                            Ten_lop: '',
                            Ngay_DB: '',
                            Ngay_KT: '',
                            Loai_id: '',
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
                onClick={handleOpen}>Tạo lớp</Button>
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
                        label="Tên lớp*"
                        name="Ten_lop"
                        variant="outlined"
                        value={formData.Ten_lop}
                        onChange={handleChange}
                        error={!!errors.Ten_lop}
                        helperText={errors.Ten_lop}
                    />

                    <TextField
                        size="small"
                        fullWidth
                        label="Ngày bắt đầu lớp học*"
                        name="Ngay_DB"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        value={formData.Ngay_DB}
                        onChange={handleChange}
                        error={!!errors.Ngay_DB}
                        helperText={errors.Ngay_DB}
                    />

                    <TextField
                        size="small"
                        fullWidth
                        label="Ngày kết thúc lớp học*"
                        name="Ngay_KT"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        value={formData.Ngay_KT}
                        onChange={handleChange}
                        error={!!errors.Ngay_KT}
                        helperText={errors.Ngay_KT}
                        sx={{
                            marginRight: '5px',
                        }}
                    />

                    <FormControl fullWidth size="small"
                        sx={{
                            marginLeft: '10px',
                        }}
                        error={!!errors.Loai_id}
                    >
                        <FormLabel component="legend">Loại lớp</FormLabel>
                        <RadioGroup
                            aria-label="Loại lớp*"
                            name="Loai_id"
                            value={formData.Loai_id}
                            onChange={handleChange}
                            sx={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <FormControlLabel value={301} control={<Radio />} label="Loại 1" />
                            <FormControlLabel value={302} control={<Radio />} label="Loại 2" />
                            <FormControlLabel value={303} control={<Radio />} label="Loại 3" />
                        </RadioGroup>

                        <FormHelperText>{errors.Loai_id}</FormHelperText>
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