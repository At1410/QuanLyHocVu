import React from "react";

import {
    Modal, Box,
    Typography,
    styled
} from "@mui/material";

export default function ModalParents({ open, handleClose, parent }) {

    const StyleTypography = styled(Typography)({
        marginLeft: '10px',
        paddingTop: '10px',
    })

    return (
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
                    width: '40%',
                    margin: '0 auto',
                    padding: 2,
                    backgroundColor: '#f4f6f8',
                    borderRadius: '8px',
                }}
            >

                <Typography
                    sx={{
                        fontWeight: 'bold',
                    }}>THÔNG TIN PHỤ HUYNH CỦA TRẺ</Typography>
                {
                    parent.map((item) => (
                        <div key={item.id}>
                            <StyleTypography>Họ tên phụ huynh: {item.Ten_PH}</StyleTypography>
                            <StyleTypography>Số điện thoại: {(item.Sdt)}</StyleTypography>
                            <StyleTypography>Địa chỉ: {item.Dia_Chi}</StyleTypography>
                            <StyleTypography>Quan hệ với trẻ: {item.Quan_he}</StyleTypography>
                        </div>
                    ))
                }
            </Box>
        </Modal>
    );
}