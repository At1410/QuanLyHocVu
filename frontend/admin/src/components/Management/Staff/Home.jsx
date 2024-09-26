import React, { useState } from "react";
import Staff from "./Staff";
import CreateStaff from "./CreateStaff";
import SearchBar from "../SearchBar";
import FilterStaff from "./FilterStaff";
import StopStaff from "./StopStaff";
import { IconButton, Menu, MenuItem, Typography, Button, styled } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';


export default function HomeStaff() {

    // Style
    const StyleButton = styled(Button)({
        paddingTop: 0,
        paddingBottom: 0,
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

    const [showStoppedStaff, setShowStoppedStaff] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedFilterCode, setSelectedFilterCode] = useState('');
    const open = Boolean(anchorEl);

    const [showFilter, setShowFilter] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (filter, filterCode) => {
        setAnchorEl(null);
        setSelectedFilter(filter);
        setSelectedFilterCode(filterCode);
        setShowFilter(true);
    };

    const toggleStaffView = () => {
        setShowStoppedStaff(!showStoppedStaff);
        setShowFilter(false);
    };

    return (
        <div style={{ marginTop: 90 }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <SearchBar />

                <CreateStaff />

                <StyleButton variant="contained" sx={{
                    paddingLeft: '15px',
                    paddingRight: '15px',
                }}
                    onClick={toggleStaffView}
                >
                    {showStoppedStaff ? "ĐÃ NGHỈ VIỆC" : "ĐANG HOẠT ĐỘNG"}
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
                    open={open}
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
                    <MenuItem onClick={() => handleClose('Giáo viên', 1)}>Giáo viên</MenuItem>
                    <MenuItem onClick={() => handleClose('Bảo vệ', 2)}>Bảo vệ</MenuItem>
                    <MenuItem onClick={() => handleClose('Y tá', 3)}>Y tá</MenuItem>
                    <MenuItem onClick={() => handleClose('Lao công', 4)}>Lao công</MenuItem>
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
            <div style={{
                padding: '20px',
            }}>
                {showFilter && <FilterStaff codeFilterStaff={selectedFilterCode} />}
                {!showFilter && (showStoppedStaff ? <StopStaff /> : <Staff />)}
            </div>
        </div >
    );
}