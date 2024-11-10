import React, { useState } from "react";
import Staff from "./Staff";
import CreateStaff from "./CreateStaff";
import SearchResults from "./SearchResults";
import FilterStaff from "./FilterStaff";
import StopStaff from "./StopStaff";
import { IconButton, Menu, MenuItem, Typography, Button, styled } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';


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
        setSelectedFilter('');
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <div style={{ marginTop: 90 }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <SearchResults onSearch={handleSearch} />
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
                {!showFilter && (showStoppedStaff ? <StopStaff searchTerm={searchTerm} /> : <Staff searchTerm={searchTerm} />)}
            </div>
        </div >
    );
}