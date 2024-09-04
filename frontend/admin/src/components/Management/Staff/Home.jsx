import React from "react";
import Staff from "./Staff";
import CreateStaff from "./CreateStaff";
import SearchBar from "../SearchBar";
import { styled } from "@mui/material";

export default function HomeStaff() {

    // Style
    const StyleDiv = styled('div')({
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px',
        marginBottom: '30px',
    })

    return (
        <div style={{ marginTop: 70 }}>
            <StyleDiv>
                <SearchBar />
                <CreateStaff />
            </StyleDiv>
            <Staff />
        </div>
    );
}