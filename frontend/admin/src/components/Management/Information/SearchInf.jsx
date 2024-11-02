import React, { useState } from 'react';
import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInf({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
                autoFocus
                placeholder="Nhập tên danh mục để tìm kiếm"
                variant="outlined"
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                size="small"
                sx={{ width: '350px' }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}
