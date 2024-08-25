import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../img/Logo.png';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material';



export default function Navbar() {

    const location = useLocation();

    const StyleButton = styled('button')(({ isActive }) => ({
        backgroundColor: isActive ? "#89b847" : "#ffffff",
        marginRight: 15,
        borderRadius: 3,
        color: '000000',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        border: '2px solid #89b847',
        borderColor: "#89b847",
        '&:hover': {
            backgroundColor: "#75a73f",
        },
    }));

    return (
        <AppBar position="static" sx={{
            backgroundColor: "#ffffff",
            borderRadius: 2,
            marginTop: 1,
        }}>
            <Toolbar>
                <IconButton edge="start" aria-label="logo" sx={{}}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <img src={logo} alt="logo"
                            style={{
                                height: 40,
                                marginLeft: 15,
                            }} />
                    </Link>
                </IconButton>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px' }}>
                    <Link to="/lophoc" style={{ textDecoration: 'none' }}>
                        <StyleButton isActive={location.pathname === "/lophoc"}>Quản lý học sinh</StyleButton>
                    </Link>
                    <Link to="/thongtin" style={{ textDecoration: 'none' }}>
                        <StyleButton isActive={location.pathname === "/thongtin"}>Quản lý thông tin</StyleButton>
                    </Link>
                    <Link to="/nhanvien" style={{ textDecoration: 'none' }}>
                        <StyleButton isActive={location.pathname === "/nhanvien"}>Quản lý nhân viên</StyleButton>
                    </Link>
                    <Link to="/dangxuat" style={{ textDecoration: 'none' }}>
                        <StyleButton isActive={location.pathname === "/dangxuat"}
                            onClick={() => {
                                const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
                                if (confirmLogout) {
                                    // Thực hiện hành động đăng xuất ở đây
                                    console.log("Đăng xuất");
                                    // Ví dụ: sử dụng `navigate` từ `react-router-dom` để chuyển hướng tới trang đăng nhập
                                    // navigate('/login');
                                }
                            }}>Đăng xuất</StyleButton>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}