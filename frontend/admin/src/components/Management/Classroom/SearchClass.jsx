import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function SearchClass({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <div>
      <TextField
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Nhập tên lớp để tìm kiếm"
        variant="outlined"
        size="small"
        sx={{ width: '450px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>

  );
}

export default SearchClass;
