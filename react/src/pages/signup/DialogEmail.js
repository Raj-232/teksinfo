import { Button, Dialog, Stack, TextField, Typography } from '@mui/material';
import React from 'react'

const DialogEmail = ({ openDialogEmail, setOpenDialogEmail, email,handleverifyEmailOtp,setEmailOtp,emailOtp }) => {
    const handleClose = () => {
        setOpenDialogEmail(false);
    };
    return (
        <Dialog fullWidth maxWidth="sm" open={openDialogEmail} onClose={handleClose} >
            <Stack padding={2} spacing={2}>
                <Typography>OTP send with {email}</Typography>
                <TextField label="otp" value={emailOtp} onChange={(e)=>setEmailOtp(e.target.value)} />
                <Button variant='contained' size="small" onClick={handleverifyEmailOtp}>Verify Otp</Button>
            </Stack>
        </Dialog>
    )
}

export default DialogEmail;