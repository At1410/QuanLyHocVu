import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../img/Logo.png';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ setIsLoggedIn }) {

    const location = useLocation();

    const StyleButton = styled('button')(({ 'data-is-active': isActive }) => ({
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
            cursor: 'pointer',
        },
    }));

    // Hàm xử lý đăng xuất với xác nhận
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn đăng xuất không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đăng xuất',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                // Xóa trạng thái đăng nhập khỏi localStorage
                localStorage.setItem('isLoggedIn', 'false');
                setIsLoggedIn(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Đăng xuất thành công!",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/dangnhap');
                });
            }
        });
    };



    return (
        <AppBar position="fixed" sx={{
            backgroundColor: "#ffffff",
            borderRadius: 2,
            zIndex: 1,
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
                    <Link to="/thongtin" style={{ textDecoration: 'none' }}>
                        <StyleButton data-is-active={location.pathname === "/thongtin"}>Quản lý thông tin</StyleButton>
                    </Link>
                    <Link to="/nguoidung" style={{ textDecoration: 'none' }}>
                        <StyleButton data-is-active={location.pathname === "/nguoidung"}>Quản lý người dùng</StyleButton>
                    </Link>
                    <Link to="/lophoc" style={{ textDecoration: 'none' }}>
                        <StyleButton data-is-active={location.pathname === "/lophoc"}>Quản lý lớp học</StyleButton>
                    </Link>
                    <Link to="/nhanvien" style={{ textDecoration: 'none' }}>
                        <StyleButton data-is-active={location.pathname === "/nhanvien"}>Quản lý nhân viên</StyleButton>
                    </Link>
                    <StyleButton data-is-active={location.pathname === "/dangxuat"}
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </StyleButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}