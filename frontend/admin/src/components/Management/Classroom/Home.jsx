import { styled } from "@mui/material";
import React from "react";

function ManagementClassRoomHome() {

    //Style
    const StyleButton = styled('button')({
        backgroundColor: "#89b847",
        borderRadius: 3,
        color: '#ffffff',
        width: '100px',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 40,
        border: '2px solid #89b847',
        borderColor: "#89b847",
        '&:hover': {
            backgroundColor: "#75a73f",
        },
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '10px', marginTop: '70px' }}>
            <StyleButton>Danh sách các lớp</StyleButton>
            <StyleButton>Tạo lớp học mới</StyleButton>
            <StyleButton>Thêm bé vào nhà trẻ</StyleButton>
            <StyleButton>Xem danh sách bé</StyleButton>
            <StyleButton>Thông tin đăng ký</StyleButton>
        </div>
    );
}

export default ManagementClassRoomHome;