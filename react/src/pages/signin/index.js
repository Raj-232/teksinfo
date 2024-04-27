import React, { useState } from 'react'
import { userLoginApi } from '../../services/authApi';
import { Button, Stack, TextField } from '@mui/material';
import CustomSnackbar from '../../componants/CustomSnackbar';
import { NavLink } from 'react-router-dom';

const Signin = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [openAlert, setOpenAlert] = useState({
        open: false,
        msg: "",
        msgType: ""
    });
    const handleSubmit = async (event) => {
        const formData = {
            mobileNumber: "+91"+mobileNumber,
            password: password
        }
        const { data, error } = await userLoginApi(formData)
        if (data) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data?.data?._id)
            setOpenAlert({
                ...openAlert,
                open: true,
                msg: data.message,
                msgType: 'success'
            });
            setTimeout(() => {
                if (data?.data?.role == 'user') {
                    window.location.href = `/`
                } else {
                    window.location.href = `/admin`
                }
            }, [2000])
        }
        else {
            setOpenAlert({
                ...openAlert,
                open: true,
                msg: error.message,
                msgType: 'error'
            });
        }
        event.preventDefault();
    };
    return (
        <Stack justifyContent="center" alignItems="center" height={"100vh"}>
            <CustomSnackbar openAlert={openAlert} setOpenAlert={setOpenAlert} />

            <Stack spacing={2} boxShadow={24} padding={2} width={500} >



                <TextField
                    id="mobileNumber"
                    variant="outlined"
                    size="small"
                    label='Mobilenumber'
                    fullWidth
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
                <TextField
                    id="password"
                    variant="outlined"
                    size="small"
                    label="Password"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button variant="contained" size="small" fullWidth onClick={handleSubmit}>
                    Submit
                </Button>
            </Stack>
            <Stack padding={2} justifyContent="end">
                
            <NavLink to='/signup'>Create A Account</NavLink>
            </Stack>
        </Stack >
    )
}

export default Signin