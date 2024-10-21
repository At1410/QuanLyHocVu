import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../img/Logo.png';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Swal from 'sweetalert2';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

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

    const handleLogout = () => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn đăng xuất không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đăng xuất',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem('isLoggedIn', 'false');
                setIsLoggedIn(false);
                navigate('/dangnhap');
            }
        });
    };

    const renderMenuLinks = (
        <div>
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

            {isLoggedIn ? (
                <>
                    <Link to="/taikhoan" style={{ textDecoration: 'none' }}>
                        <StyleButton isActive={location.pathname === "/taikhoan"}>Tài khoản</StyleButton>
                    </Link>
                    <StyleButton onClick={handleLogout}>Đăng xuất</StyleButton>
                </>
            ) : (
                <Link to="/dangnhap" style={{ textDecoration: 'none' }}>
                    <StyleButton isActive={location.pathname === "/dangnhap"}>Đăng nhập</StyleButton>
                </Link>
            )}
        </div>
    );

    return (
        <div>
            <AppBar position="fixed" sx={{
                backgroundColor: "#ffffff",
                borderRadius: 2,
            }}>
                <Toolbar>

                    {isMobile ? (
                        <IconButton edge="start" aria-label="logo" sx={{}}>
                            <img src={logo} alt="logo"
                                style={{
                                    height: 30,
                                    marginLeft: 15,
                                }} />
                        </IconButton>
                    ) : (
                        <IconButton edge="start" aria-label="logo" sx={{}}>
                            <img src={logo} alt="logo"
                                style={{
                                    height: 40,
                                    marginLeft: 15,
                                }} />
                        </IconButton>
                    )}

                    {isMobile ? (
                        <div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={toggleDrawer(true)}
                                    sx={{ color: 'black', margin: '0 auto' }}
                                >
                                    <WidgetsIcon />
                                </IconButton>
                            </div>
                            <Drawer
                                anchor="right"
                                open={isDrawerOpen}
                                onClose={toggleDrawer(false)}
                            >
                                <List>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/"
                                        onClick={toggleDrawer(false)}
                                        sx={{ backgroundColor: location.pathname === "/" ? "#ff99ac" : "inherit" }}
                                    >
                                        Trang Chủ
                                    </ListItem>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/giaovien"
                                        onClick={toggleDrawer(false)}
                                        sx={{ backgroundColor: location.pathname === "/giaovien" ? "#ff99ac" : "inherit" }}
                                    >
                                        Giáo viên
                                    </ListItem>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/lophoc"
                                        onClick={toggleDrawer(false)}
                                        sx={{ backgroundColor: location.pathname === "/lophoc" ? "#ff99ac" : "inherit" }}
                                    >
                                        Lớp học
                                    </ListItem>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/dangki"
                                        onClick={toggleDrawer(false)}
                                        sx={{ backgroundColor: location.pathname === "/dangki" ? "#ff99ac" : "inherit" }}
                                    >
                                        Đăng ký
                                    </ListItem>
                                    <ListItem
                                        button
                                        component={Link}
                                        to="/taikhoan"
                                        onClick={toggleDrawer(false)}
                                        sx={{ backgroundColor: location.pathname === "/taikhoan" ? "#ff99ac" : "inherit" }}
                                    >
                                        Tài Khoản
                                    </ListItem>

                                    {isLoggedIn ? (
                                        <ListItem
                                            button
                                            onClick={() => {
                                                handleLogout();
                                                toggleDrawer(false)();
                                            }}
                                            sx={{ backgroundColor: location.pathname === "/dangnhap" ? "#ff99ac" : "inherit" }}
                                        >
                                            Đăng xuất
                                        </ListItem>
                                    ) : (
                                        <ListItem
                                            button
                                            component={Link}
                                            to="/dangnhap"
                                            onClick={toggleDrawer(false)}
                                            sx={{ backgroundColor: location.pathname === "/dangnhap" ? "#ff99ac" : "inherit" }}
                                        >
                                            Đăng nhập
                                        </ListItem>
                                    )}
                                </List>

                            </Drawer>
                        </div>
                    ) : (
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px' }}>
                            {renderMenuLinks}
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
