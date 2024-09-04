import React from 'react';
import Information from './Information';
import SearchBar from '../SearchBar';
import CreateInf from './CreateInf';
import { styled } from '@mui/material';

function HomeInf() {

    // Style
    const StyleDiv = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        marginTop: 70,
    })

    return (
        <div>
            <StyleDiv>
                <SearchBar />
                <CreateInf />
            </StyleDiv>
            <Information />
        </div>
    );
}

export default HomeInf;