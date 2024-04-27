import { Button, Dialog, Stack, TextField, Typography } from '@mui/material';
import React from 'react'

const DialogBox = ({ openDialog, setOpenDialog, mobileNumber,handleverifyMobileOtp,setMobileNumberOtp,mobileNumberOtp }) => {
    const handleClose = () => {
        setOpenDialog(false);
    };
    return (
        <Dialog fullWidth maxWidth="sm" open={openDialog} onClose={handleClose} >
            <Stack padding={2} spacing={2}>
                <Typography>OTP send with {mobileNumber}</Typography>
                <TextField label="otp" value={mobileNumberOtp} onChange={(e)=>setMobileNumberOtp(e.target.value)} />
                <Button variant='contained' size="small" onClick={handleverifyMobileOtp}>Verify Otp</Button>
            </Stack>
        </Dialog>
    )
}

export default DialogBox;