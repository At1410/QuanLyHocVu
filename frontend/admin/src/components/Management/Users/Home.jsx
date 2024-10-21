import React, { useState } from "react";
import { Button, styled } from '@mui/material';
// import FilterListIcon from '@mui/icons-material/FilterList';
import NoRegistrationForm from "./NoRegistrationForm";
import RegistrationForm from "./RegistrationForm";
import RegistrationLeave from "./RegisterLeave";
import StatisticalDayOff from "./StatisticalDayOff";


export default function HomeStaff() {

    // Style
    const StyleButton = styled(Button)({
        marginLeft: 20,
        backgroundColor: '#89b847',
        border: 'none',
        borderRadius: 3,
        color: 'white',
        fontSize: 16,
        '&:hover': {
            backgroundColor: '#75a73f',
        },
    })

    const [showRegistration, setShowRegistration] = useState(false);
    const [showRegistrationLeave, setShowRegistrationLeave] = useState(false);
    const [showStatical, setShowStatical] = useState(false);

    const toggleStaffView = () => {
        setShowRegistration(!showRegistration);
        setShowRegistrationLeave(false);
        setShowStatical(false);
    };

    const toggleStaffLeave = () => {
        setShowRegistrationLeave(true);
        setShowRegistration(false);
        setShowStatical(false);
    };

    const toggleNoRegistration = () => {
        setShowStatical(true);
        setShowRegistration(false);
        setShowRegistrationLeave(false);
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
                >
                    {showRegistration ? "ĐÃ ĐẾN THĂM" : "CHƯA ĐẾN THĂM"}
                </StyleButton>
                <StyleButton variant="contained" sx={{
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
                    onClick={toggleStaffLeave}
                >
                    XIN NGHỈ PHÉP
                </StyleButton>
                <StyleButton variant="contained" sx={{
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
                    onClick={toggleNoRegistration}
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