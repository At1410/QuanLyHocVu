import React from "react";

import logo from '../img/Logo.png';
import EmailIcon from '@mui/icons-material/Email';
import { Typography } from "@mui/material";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

export default function Footer() {
    return (
        <div style={{
            backgroundColor: "#fbb1bd",
            marginBottom: 0,
            marginTop: '10px',
            display: 'flex',
            fontFamily: 'Times New Roman',
        }}>

            <div>
                <img src={logo} style={{
                    width: "20%",
                    marginTop: "10px",
                    marginLeft: "10px",
                }} />
                <Typography sx={{ marginLeft: '10px' }}>Mỗi trẻ một thế giới. Vui chơi, học hỏi, khôn lớn mỗi ngày</Typography>
            </div>
            <div style={{
                display: 'flex',
                marginTop: '10px',
                marginBottom: '10px',
                marginLeft: '10px',
                marginRight: '50px',
            }}>
                <div style={{
                    marginRight: '10px',
                    flexDirection: 'column',
                    display: 'flex',
                }}>
                    <EmailIcon />
                    <PhoneInTalkIcon />
                    <FmdGoodIcon />
                </div>
                <div>
                    <Typography>lanhthudethuong@gmail</Typography>
                    <Typography>094693644986</Typography>
                    <Typography>43/9 Đường Trần Hưng Đạo, An Khánh, Ninh Kiều.</Typography>
                </div>
            </div>
        </div >
    );
}