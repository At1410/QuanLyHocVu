import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../img/Logo.png';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material';



export default function Navbar() {

    const location = useLocation();

    const StyleButton = styled('button')(({ isActive }) => ({
        backgroundColor: isActive ? "#fbb1bd" : "#ffffff",
        marginRight: 15,
        borderRadius: 3,
        color: '000000',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        border: '2px solid #fbb1bd',
        borderColor: "#fbb1bd",
        '&:hover': {
            backgroundColor: "#ff99ac",
        },
    }));

    return (
        <AppBar position="fixed" sx={{
            backgroundColor: "#ffffff",
            borderRadius: 2,
            marginTop: 1,
        }}>
            <Toolbar>
                <IconButton edge="start" aria-label="logo" sx={{}}>
                    <img src={logo} alt="logo"
                        style={{
                            height: 40,
                            marginLeft: 15,
                        }} />
                </IconButton>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <StyleButton isActive={location.pathname === "/"}>Trang Chủ</StyleButton>
                    </Link>
                    <Link to="/giaovien" style={{ textDecoration: 'none' }}>
                        <StyleButton isActive={location.pathname === "/giaovien"}>Giáo viên</StyleButton>
                    </Link>
                    <Link to="/lophoc" style={{ textDecoration: 'none' }}>
                        <StyleButton isActive={location.pathname === "/lophoc"}>Lớp học</StyleButton>
                    </Link>
                    <Link to="/dangki" style={{ textDecoration: 'none' }}>
                        <StyleButton isActive={location.pathname === "/dangki"}>Đăng ký</StyleButton>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}