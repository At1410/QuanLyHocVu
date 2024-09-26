import React, { useState } from "react";

import { Button, styled, IconButton, Menu, MenuItem, Typography } from "@mui/material";

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import AddBoxIcon from '@mui/icons-material/AddBox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import FilterListIcon from '@mui/icons-material/FilterList';


import AddChild from './AddChild';
import ClassList from './ClassList';
import CreateClass from './CreateClass';
import ChildList from './ChildList';
import RegistrationForm from './RegistrationForm';
import FilterClass from "./FilterClass";
import FilterChild from "./FilterChild";

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

    const [activeComponent, setActiveComponent] = useState('classList');

    const handleClassToggle = () => {
        setActiveComponent(activeComponent === 'classList' ? 'classStop' : 'classList');
        setSelectedFilter('');
        setSelectedFilterChild('');
    };

    const handleStudentToggle = () => {
        setActiveComponent(activeComponent === 'childList' ? 'childStop' : 'childList');
        setSelectedFilter('');
        setSelectedFilterChild('');
    };

    const handleFromToggle = () => {
        setActiveComponent(activeComponent === 'registrationForm' ? 'noRegistrationForm' : 'registrationForm');
        setSelectedFilter('');
        setSelectedFilterChild('');
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

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedFilterCode, setSelectedFilterCode] = useState('');
    const open1 = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (filter, filterCode) => {
        setAnchorEl(null);
        setSelectedFilter(filter);
        setSelectedFilterCode(filterCode);
        setActiveComponent('filterClass');
        setSelectedFilterChild('');
    };

    const [selectedFilterChild, setSelectedFilterChild] = useState('');
    const [selectedFilterCodeChild, setSelectedFilterCodeChild] = useState('');

    const [anchorElGender, setAnchorElGender] = useState(null);
    const openGender = Boolean(anchorElGender);

    const handleClickGender = (event) => {
        setAnchorElGender(event.currentTarget);
    };

    const handleCloseGender = (filterChild, filterCodeChild) => {
        setAnchorElGender(null);
        setSelectedFilterChild(filterChild);
        setSelectedFilterCodeChild(filterCodeChild);
        setActiveComponent('filterChild');
        setSelectedFilter('');
    };

    return (
        <Box sx={{ minHeight: '80vh', transform: 'translateZ(0px)', flexGrow: 1 }}>
            <div style={{
                justifyContent: 'center',
                padding: '20px',
                marginTop: 70,
            }}>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <SearchBar />
                    <StyleButton
                        onClick={handleFromToggle}
                    >
                        {activeComponent === 'noRegistrationForm' ? "ĐÃ ĐẾN THĂM" : "CHƯA ĐẾN THĂM"}
                    </StyleButton>
                    <StyleButton
                        onClick={handleStudentToggle}
                    >
                        {activeComponent === 'childStop' ? "TRẺ NGHỈ HỌC" : "TRẺ ĐANG HỌC"}
                    </StyleButton>

                    <IconButton
                        onClick={handleClickGender}
                        sx={{
                            backgroundColor: '#89b847',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#75a73f',
                            },
                            marginLeft: '15px',
                        }}
                    >
                        <FilterListIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElGender}
                        open={openGender}
                        onClose={() => handleCloseGender(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={() => handleCloseGender('Nữ', 0)}>Nữ</MenuItem>
                        <MenuItem onClick={() => handleCloseGender('Nam', 1)}>Nam</MenuItem>
                    </Menu>
                    {selectedFilterChild && (
                        <Typography variant="body1" style={{
                            marginLeft: '20px',
                            alignSelf: 'flex-end',
                            borderBottom: '2px solid #89b847',
                            paddingBottom: 0,
                            color: '#89b847',
                        }}>
                            {`Lọc: ${selectedFilterChild}`}
                        </Typography>
                    )}

                    <StyleButton
                        onClick={handleClassToggle}
                    >
                        {activeComponent === 'classStop' ? "ĐÃ KẾT THÚC" : "ĐANG DIỄN RA"}
                    </StyleButton>

                    <IconButton
                        onClick={handleClick}
                        sx={{
                            backgroundColor: '#89b847',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#75a73f',
                            },
                            marginLeft: '15px',
                        }}
                    >
                        <FilterListIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open1}
                        onClose={() => handleClose(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={() => handleClose('Loại 1', 301)}>Loại 1</MenuItem>
                        <MenuItem onClick={() => handleClose('Loại 2', 302)}>Loại 2</MenuItem>
                        <MenuItem onClick={() => handleClose('Loại 3', 303)}>Loại 3</MenuItem>
                    </Menu>

                    {selectedFilter && (
                        <Typography variant="body1" style={{
                            marginLeft: '20px',
                            alignSelf: 'flex-end',
                            borderBottom: '2px solid #89b847',
                            paddingBottom: 0,
                            color: '#89b847',
                        }}>
                            {`Lọc: ${selectedFilter}`}
                        </Typography>
                    )}

                </div>

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
                {
                    activeComponent === 'filterClass' && <FilterClass codeFilter={selectedFilterCode} />
                }
                {
                    activeComponent === 'filterChild' && <FilterChild codeFilterChild={selectedFilterCodeChild} />
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

            <AddChild open={showAddChild} setOpen={setShowAddChild} />
            <CreateClass open={showCreateClass} setOpen={setShowCreateClass} />
        </Box >
    );
}

