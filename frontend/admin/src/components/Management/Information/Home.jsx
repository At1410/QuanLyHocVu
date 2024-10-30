import React, { useState } from 'react';
import Information from './Information';
import SearchInf from './SearchInf';
import CreateInf from './CreateInf';
import { styled } from '@mui/material';

function HomeInf() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Style
    const StyleDiv = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        marginTop: 70,
    });

    return (
        <div>
            <StyleDiv>
                <SearchInf onSearch={handleSearch} />
                <CreateInf />
            </StyleDiv>
            <Information searchTerm={searchTerm} />
        </div>
    );
}

export default HomeInf;
