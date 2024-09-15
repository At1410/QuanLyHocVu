import React, { useState } from "react";
import Staff from "./Staff";
import CreateStaff from "./CreateStaff";
import SearchBar from "../SearchBar";
import { styled } from "@mui/material";
import StopStaff from "./StopStaff";

export default function HomeStaff() {

    // Style
    const StyleDiv = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px',
        marginBottom: '30px',
    });

    const StyleButton = styled('button')({
        marginLeft: 38,
        backgroundColor: '#89b847',
        border: 'none',
        borderRadius: 3,
        paddingLeft: 15,
        paddingRight: 15,
        cursor: 'pointer',
        color: 'white',
        fontSize: 16,
        '&:hover': {
            backgroundColor: '#75a73f',
        },
    })

    const [showStoppedStaff, setShowStoppedStaff] = useState(false);

    return (
        <div style={{ marginTop: 70 }}>
            <StyleDiv>
                <SearchBar />
                <CreateStaff />
                <StyleButton
                    onClick={() => setShowStoppedStaff(!showStoppedStaff)}
                >
                    {showStoppedStaff ? "ĐÃ NGHỈ VIỆC" : "ĐANG HOẠT ĐỘNG"}
                </StyleButton>
            </StyleDiv>
            {showStoppedStaff ? <StopStaff /> : <Staff />}
        </div >
    );
}