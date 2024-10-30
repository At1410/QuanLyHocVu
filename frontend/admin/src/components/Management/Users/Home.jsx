import React, { useState } from "react";
import { Button, styled } from '@mui/material';
import NoRegistrationForm from "./NoRegistrationForm";
import RegistrationForm from "./RegistrationForm";
import RegistrationLeave from "./RegisterLeave";
import StatisticalDayOff from "./StatisticalDayOff";


export default function HomeStaff() {

    // Style
    const StyleButton = styled(Button)(({ active }) => ({
        marginLeft: 20,
        backgroundColor: active ? '#ffffff' : '#89b847',
        border: 'none',
        borderRadius: 3,
        color: active ? '#75a73f' : '#ffffff',
        fontSize: 16,
        '&:hover': {
            backgroundColor: active ? '#75a73f' : '#75a73f',
            color: '#ffffff',
        },
    }));

    const [showRegistration, setShowRegistration] = useState(false);
    const [showRegistrationLeave, setShowRegistrationLeave] = useState(false);
    const [showStatical, setShowStatical] = useState(false);

    const [isDefaultView, setIsDefaultView] = useState(true);

    const toggleStaffView = () => {
        if (showRegistration) {
            setShowRegistration(false);
            setIsDefaultView(true);
        } else {
            setShowRegistration(true);
            setShowRegistrationLeave(false);
            setShowStatical(false);
            setIsDefaultView(false);
        }
    };

    const toggleStaffLeave = () => {
        setShowRegistrationLeave(true);
        setShowRegistration(false);
        setShowStatical(false);
        setIsDefaultView(false);
    };

    const toggleNoRegistration = () => {
        setShowStatical(true);
        setShowRegistration(false);
        setShowRegistrationLeave(false);
        setIsDefaultView(false);
    };

    return (
        <div style={{ marginTop: 90 }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>

                <StyleButton variant="contained" sx={{
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
                    onClick={toggleStaffView}
                    active={isDefaultView || showRegistration}
                >
                    {showRegistration ? "ĐÃ ĐẾN THĂM" : "CHƯA ĐẾN THĂM"}
                </StyleButton>
                <StyleButton variant="contained" sx={{
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
                    onClick={toggleStaffLeave}
                    active={showRegistrationLeave}
                >
                    XIN NGHỈ PHÉP
                </StyleButton>
                <StyleButton variant="contained" sx={{
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
                    onClick={toggleNoRegistration}
                    active={showStatical}
                >
                    THỐNG KÊ
                </StyleButton>
            </div>

            <div style={{
                padding: '20px',
            }}>
                {showRegistration && <NoRegistrationForm />}
                {showRegistrationLeave && <RegistrationLeave />}
                {!showRegistration && !showRegistrationLeave && !showStatical && <RegistrationForm />}
                {showStatical && <StatisticalDayOff />}
            </div>
        </div >
    );
}