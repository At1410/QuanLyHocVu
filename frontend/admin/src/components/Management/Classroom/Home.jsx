import React, { useState } from "react";

import { Button, styled } from "@mui/material";

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import AddBoxIcon from '@mui/icons-material/AddBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DesignServicesIcon from '@mui/icons-material/DesignServices';


import AddChild from './AddChild';
import ClassList from './ClassList';
import CreateClass from './CreateClass';
import ChildList from './ChildList';
import RegistrationForm from './RegistrationForm';

import SearchBar from "../SearchBar";
import ChildStop from './ChildStop';
import ClassStop from "./ClassStop";
import NoRegistrationForm from "./NoRegistrationForm";



const actions = [
    { icon: <AddBoxIcon />, name: 'Thêm trẻ', action: 'addChild' },
    { icon: <AddCircleOutlineIcon />, name: 'Tạo lớp', action: 'createClass' },
];

export default function ManagementClassRoomHome() {

    //Style
    const StyleButton = styled(Button)({
        backgroundColor: "#89b847",
        borderRadius: 3,
        color: '#ffffff',
        marginLeft: '20px',
        paddingLeft: 15,
        paddingRight: 15,
        border: '2px solid #89b847',
        cursor: 'pointer',
        borderColor: "#89b847",
        '&:hover': {
            backgroundColor: "#75a73f",
        },
    });

    const StyleDiv = styled('div')({
        display: 'flex',
        justifyContent: 'center',
    });

    const [activeComponent, setActiveComponent] = useState('classList');

    const handleClassToggle = () => {
        setActiveComponent(activeComponent === 'classList' ? 'classStop' : 'classList');
    };

    const handleStudentToggle = () => {
        setActiveComponent(activeComponent === 'childList' ? 'childStop' : 'childList');
    };

    const handleFromToggle = () => {
        setActiveComponent(activeComponent === 'registrationForm' ? 'noRegistrationForm' : 'registrationForm');
    };

    const [open, setOpen] = useState(false);
    const [showAddChild, setShowAddChild] = useState(false);
    const [showCreateClass, setShowCreateClass] = useState(false);

    const handleSpeedDialAction = (action) => {
        if (action === 'addChild') {
            setShowAddChild(true);
            setShowCreateClass(false);
        } else if (action === 'createClass') {
            setShowCreateClass(true);
            setShowAddChild(false);
        }
    };

    const handleCloseModal = () => {
        setShowAddChild(false);
        setShowCreateClass(false);
    };


    return (
        <Box sx={{ minHeight: '80vh', transform: 'translateZ(0px)', flexGrow: 1 }}>
            <div style={{
                justifyContent: 'center',
                padding: '20px',
                marginTop: 70,
            }}>

                <StyleDiv>
                    <SearchBar />
                    <StyleButton
                        onClick={handleClassToggle}
                    >
                        {activeComponent === 'classStop' ? "ĐÃ KẾT THÚC" : "ĐANG DIỄN RA"}
                    </StyleButton>
                    <StyleButton
                        onClick={handleStudentToggle}
                    >
                        {activeComponent === 'childStop' ? "TRẺ NGHỈ HỌC" : "TRẺ ĐANG HỌC"}
                    </StyleButton>
                    <StyleButton
                        onClick={handleFromToggle}
                    >
                        {activeComponent === 'noRegistrationForm' ? "ĐÃ ĐẾN THĂM" : "CHƯA ĐẾN THĂM"}
                    </StyleButton>
                </StyleDiv>

                {
                    activeComponent === 'classList' && <ClassList />
                }
                {
                    activeComponent === 'childList' && <ChildList />
                }
                {
                    activeComponent === 'registrationForm' && <RegistrationForm />
                }
                {
                    activeComponent === 'classStop' && <ClassStop />
                }
                {
                    activeComponent === 'childStop' && <ChildStop />
                }
                {
                    activeComponent === 'noRegistrationForm' && <NoRegistrationForm />
                }
            </div >

            <Backdrop open={showAddChild || showCreateClass} onClick={handleCloseModal} />
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                }}
                icon={<SpeedDialIcon openIcon={<DesignServicesIcon />} />}
                onClick={() => setOpen(!open)}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleSpeedDialAction(action.action)}
                    />
                ))}
            </SpeedDial>

            {showAddChild && <AddChild />}
            {showCreateClass && <CreateClass />}
        </Box >
    );
}

