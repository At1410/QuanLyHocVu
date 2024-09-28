import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/Logo.png';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Navbar() {
    const location = useLocation();
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

    const getPageName = (pathname) => {
        switch (pathname) {
            case "/":
                return "Trang Chủ";
            case "/giaovien":
                return "Giáo viên";
            case "/lophoc":
                return "Lớp học";
            case "/dangki":
                return "Đăng ký";
            default:
                return "";
        }
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
        </div>
    );

    return (
        <div>
            <AppBar position="fixed" sx={{
                backgroundColor: "#ffffff",
                borderRadius: 2,
                marginTop: 1,
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
                                marginLeft: 40,
                                alignItems: 'center'
                            }}>

                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={toggleDrawer(true)}
                                    sx={{ color: 'black' }}
                                >
                                    <WidgetsIcon />
                                </IconButton>

                                <Typography color={'black'}
                                    sx={{
                                        marginLeft: 2,
                                        color: 'black',
                                    }}
                                >
                                    {getPageName(location.pathname)}
                                </Typography>
                            </div>

                            <Drawer
                                anchor="right"
                                open={isDrawerOpen}
                                onClose={toggleDrawer(false)}
                            >
                                <List>
                                    <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
                                        Trang Chủ
                                    </ListItem>
                                    <ListItem button component={Link} to="/giaovien" onClick={toggleDrawer(false)}>
                                        Giáo viên
                                    </ListItem>
                                    <ListItem button component={Link} to="/lophoc" onClick={toggleDrawer(false)}>
                                        Lớp học
                                    </ListItem>
                                    <ListItem button component={Link} to="/dangki" onClick={toggleDrawer(false)}>
                                        Đăng ký
                                    </ListItem>
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
