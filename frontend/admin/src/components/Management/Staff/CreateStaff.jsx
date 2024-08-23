import React from 'react';

import { Modal, Paper, styled, Button } from "@mui/material"


export default function CreateStaff() {

    //Style
    const StyledPaper = styled(Paper)(({ theme }) => ({
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }));

    const StyledForm = styled('form')({
        display: 'flex',
        flexDirection: 'column',
    });

    const StyledDivButton = styled('div')({
        marginTop: '10px'
    });

    return (
        <div>
            sndsgi
        </div>
        // <Modal open={{}}>
        //     <StyledPaper id="simple-modal-title">
        //         <h2>Thêm Nhân Viên Mới</h2>
        //         <StyledForm noValidate autoComplete="off">


        //             <StyledDivButton>
        //                 <Button variant='contained' sx={{
        //                     backgroundColor: '#89b847',
        //                     '&:hover': {
        //                         backgroundColor: "#75a73f",
        //                     },
        //                 }} component='span' fullWidth>
        //                     Thêm
        //                 </Button>
        //             </StyledDivButton>
        //         </StyledForm>
        //     </StyledPaper>
        // </Modal>
    );
}