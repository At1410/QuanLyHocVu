import React, { useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2'

import { Modal, TextField, Button, Box } from '@mui/material';

export default function CreateInf({ }) {

    const [formData, setFormData] = useState({
        TenDM: '',
        NoiDung: '',
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        tempErrors.TenDM = formData.TenDM ? "" : "Tên danh mục là bắt buộc.";
        tempErrors.NoiDung = formData.NoiDung ? "" : "Nội dung là bắt buộc.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                handleClose();

                const response = await axios.post(`${process.env.REACT_APP_API_URL}/thong-tin`, formData);
                if (response.data.success) {
                    // Hiển thị thông báo thành công
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Dữ liệu đã được thêm thành công!',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        // Reset form data
                        setFormData({
                            TenDM: '',
                            NoiDung: '',
                        });
                    });
                }
            } catch (error) {
                console.error('Lỗi khi thêm dữ liệu:', error);
                Swal.fire(
                    'Lỗi!',
                    'Thêm dữ liệu không thành công!',
                    'error'
                );
            }
        }
    }

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}
                sx={{
                    marginLeft: 5,
                    backgroundColor: '#89b847',
                    '&:hover': {
                        backgroundColor: '#75a73f',
                    },
                }}
            >
                Thêm danh mục
            </Button>
            <Modal open={open} onClose={handleClose}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1300,
                }}
            >
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '50%',
                        // height: '60%',
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

                        label="Tên danh mục*"
                        name="TenDM"
                        variant="outlined"
                        value={formData.TenDM}
                        onChange={handleChange}
                        error={!!errors.TenDM}
                        helperText={errors.TenDM}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Nội dung*"
                        name="NoiDung"
                        variant="outlined"
                        value={formData.NoiDung}
                        onChange={handleChange}
                        error={!!errors.NoiDung}
                        helperText={errors.NoiDung}
                    />
                    <Button variant="contained" type="submit" onClick={handleSubmit}
                        sx={{
                            backgroundColor: '#89b847',
                            '&:hover': {
                                backgroundColor: '#75a73f',
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