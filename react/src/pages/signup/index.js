import React, { useState } from 'react';
import { Avatar, Button, Stack, TextField, Typography, Stepper, Step, StepLabel } from '@mui/material';

import CustomSnackbar from '../../componants/CustomSnackbar';
import { sendOtpEmailApi, sendOtpMobileApi, userCreateApi, verifyEmailApi, verifyMobileApi } from '../../services/authApi';
import DialogBox from './Dialog';
import DialogEmail from './DialogEmail';
import { NavLink } from 'react-router-dom';
function IconCloudUpload(props) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="2em"
      width="2em"
      {...props}
    >
      <path d="M518.3 459a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 459z" />
      <path d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7-23.5-24.2-36-56.8-34.9-90.6.9-26.4 9.9-51.2 26.2-72.1 16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0152.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 01-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z" />
    </svg>
  );
}
const Signup = () => {
  // State variables for form fields
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verify, setVerify] = useState({
    email: false,
    number: false
  })
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberOtp, setMobileNumberOtp] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEmail, setOpenDialogEmail] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openAlert, setOpenAlert] = useState({
    open: false,
    msg: "",
    msgType: ""
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Profile', 'Verify Number', 'Verify Email', 'Set Password'];
  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  // Handler for file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };
  const handleverifyMobileOtp = async () => {
    const { data, error } = await verifyMobileApi({ mobileNumber: "+91"+mobileNumber, otp: mobileNumberOtp })
    if (data) {
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: data.message,
        msgType: 'success'
      });
      setOpenDialog(false)
      setActiveStep(activeStep+1)
    }
    else {

      setOpenAlert({
        ...openAlert,
        open: true,
        msg: error?.message,
        msgType: 'error'
      });
    }
  }
  const handleSendMobileOtp = async () => {

    const { data, error } = await sendOtpMobileApi({ mobileNumber: "+91"+mobileNumber })
    if (data) {
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: data.message,
        msgType: 'success'
      });
      setOpenDialog(true)
      setVerify((prev) => (
        {
          ...prev,
          number: true
        }
      ))
    }
    else {
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: error.message,
        msgType: 'error'
      });
    }
  }
  const handleverifyEmailOtp = async () => {
    const { data, error } = await verifyEmailApi({ email: email, otp: emailOtp })
    if (data) {
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: data.message,
        msgType: 'success'
      });
      setOpenDialogEmail(false)
      setActiveStep(activeStep+1)
      setVerify((prev) => (
        {
          ...prev,
          email: true
        }
      ))
    }
    else {

      setOpenAlert({
        ...openAlert,
        open: true,
        msg: error?.message,
        msgType: 'error'
      });
    }
  }
  const handleSendEmailOtp = async () => {

    const { data, error } = await sendOtpEmailApi({ email: email })
    if (data) {
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: data.message,
        msgType: 'success'
      });
      setOpenDialogEmail(true)
    }
    else {
      setOpenAlert({
        ...openAlert,
        open: true,
        msg: error.message,
        msgType: 'error'
      });
    }
  }
  // Handler for form submission
  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append("profileImage", profileImage)
    formData.append("name", name)
    formData.append("email", email)
    formData.append("mobileNumber", `+91${mobileNumber}`)
    formData.append("password", password)
    formData.append("verifyed", true)
    const { data, error } = await userCreateApi(formData)
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
        if(data?.data?.role=='user'){
          window.location.href = `/`
      }else{
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
    <DialogBox openDialog={openDialog} setOpenDialog={setOpenDialog} mobileNumber={mobileNumber} handleverifyMobileOtp={handleverifyMobileOtp} setMobileNumberOtp={setMobileNumberOtp} mobileNumberOtp={mobileNumberOtp} />
    <CustomSnackbar openAlert={openAlert} setOpenAlert={setOpenAlert} />
    <DialogEmail openDialogEmail={openDialogEmail} setOpenDialogEmail={setOpenDialogEmail} email={email} handleverifyEmailOtp={handleverifyEmailOtp} setEmailOtp={setEmailOtp} emailOtp={emailOtp} />
    <Stepper activeStep={activeStep} alternativeLabel sx={{width:"100%"}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    <Stack spacing={2} boxShadow={24} padding={2} width={600} >

      {activeStep === 0 && (
        <>
          {/* Profile Step */}
          <input
            type="file"
            id="upload"
            
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="upload">
              <Avatar
                src={profileImage ? URL.createObjectURL(profileImage) : ""}
                alt=""
                sx={{ width: 100, height: 100 }}
              >
                <IconCloudUpload />
              </Avatar>
            </label>
          </div>
          <TextField
            id="name"
            variant="outlined"
            
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </>
      )}
      {activeStep === 1 && (
        <>
          {/* Verify Number Step */}
          <Stack direction="column" width="100%" spacing={2}>
            <TextField
              id="mobileNumber"
              variant="outlined"
              
              label='Mobile Number'
              fullWidth
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <Button variant='contained'  onClick={handleSendMobileOtp}>Send OTP</Button>
          </Stack>
        </>
      )}
      {activeStep === 2 && (
        <>
          {/* Verify Email Step */}
          <Stack direction="column" width="100%" spacing={2}>
            <TextField
              id="email"
              variant="outlined"
              
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant='contained'  onClick={handleSendEmailOtp}>SendOTP</Button>
          </Stack>
        </>
      )}
      {activeStep === 3 && (
        <>
          {/* Set Password Step */}
          <TextField
            id="password"
            variant="outlined"
            
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            
            label="Confirm Password"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </>
      )}
      <Stack direction="row" spacing={2}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} variant="contained" >
            Back
          </Button>
        )}
        <Button
          variant="contained"
          
          onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
        >
          {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </Stack>
    </Stack>
    <Stack padding={2} justifyContent="end">
                
                <NavLink to='/signin'>Allredy Account there Login</NavLink>
                </Stack>
  </Stack >
  );
};

export default Signup;
