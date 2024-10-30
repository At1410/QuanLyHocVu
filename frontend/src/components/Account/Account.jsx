import React, { useState } from "react";
import { Button, styled } from "@mui/material";
import Box from '@mui/material/Box';

import LeavesAccount from './Leaves.account';
import HomeAccount from "./Home.account";

export default function SimpleComponentSwitcher() {

    const StyleButton = styled(Button)(({ active }) => ({
        backgroundColor: active ? '#ffffff' : '#ff99ac',
        padding: '5px',
        paddingRight: '15px',
        paddingLeft: '15px',
        borderRadius: '5px',
        color: active ? '#ff99ac' : '#ffffff',
        border: active ? '2px solid #ff99ac' : 'none',
        '&:hover': {
            backgroundColor: active ? '#ff99ac' : '#fbb1bd',
            color: active ? '#ffffff' : '#ffffff',
        },
    }));

    const [activeComponent, setActiveComponent] = useState('HomeAccount');

    const handleToggle = (component) => {
        setActiveComponent(component);
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '85px',
                    marginBottom: '20px'
                }}
            >
                <StyleButton
                    variant='contained'
                    active={activeComponent === 'HomeAccount'}
                    onClick={() => handleToggle('HomeAccount')}
                >
                    Lớp học của trẻ
                </StyleButton>
                <StyleButton
                    variant='contained'
                    active={activeComponent === 'LeavesAccount'}
                    onClick={() => handleToggle('LeavesAccount')}
                    sx={{ marginLeft: '15px' }}
                >
                    Đăng kí nghỉ học
                </StyleButton>
            </div >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '90%',
                    height: { xs: 'auto', sm: 'auto' },
                    margin: '0 auto',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                    overflow: 'auto',
                    marginBottom: '20px'
                }}>
                {activeComponent === 'HomeAccount' && <HomeAccount />}
                {activeComponent === 'LeavesAccount' && <LeavesAccount />}
            </Box>
        </div >
    );
}