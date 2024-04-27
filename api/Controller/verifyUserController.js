const twilio = require('twilio');
const nodemailer = require('nodemailer');
const User = require('../Model/user');

// Map to store email,num and OTP pairs
const otpMap = new Map();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'aaraj232@gmail.com', // Change to your email address
        pass: 'iebu cvgy faro mjqc' // Change to your email password
    }
});

// Twilio credentials

const accountSid = 'AC5b7b7c790bd4a1a8ea8b94f0d7910bdc';
const authToken = '28d79a045ba2e1e4df9ef73bdb10463f';
const twilioPhoneNumber = '+15713843291';
const client = new twilio(accountSid, authToken);

function generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
const sendMobileOTP = async (req, res) => {
    const { mobileNumber } = req.body;
    const existingUserMobile = await User.findOne({ mobileNumber });
    if (existingUserMobile) {
        return res.status(400).json({ message: 'Mobile number already exists' });
    }
    const otp = generateOTP();

    client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: twilioPhoneNumber,
        to: mobileNumber
    })
        .then(message => {
            console.log('OTP sent successfully:', message.sid);
            otpMap.set(mobileNumber, otp.toString());
            res.json({ success: true, message: 'OTP sent successfully' });
        })
        .catch(err => {
            console.error('Error sending OTP:', err);
            res.status(500).json({ success: false, message: 'Failed to send OTP' });
        });
}
const verifyMobileOTP = async (req, res) => {
    const { otp, mobileNumber } = req.body;
    if (otpMap.has(mobileNumber) && otpMap.get(mobileNumber) === otp) {
        otpMap.delete(mobileNumber);
        res.status(200).send({
            status: 200,
            message: 'OTP verified successfully'
        });
    } else {
        res.status(400).send({
            status: 400,
            message: 'Invalid Otp'
        });
    }
}

const sendEmailOTP = async (req, res) => {
    const { email } = req.body;
   
    const existingUserEmail = await User.findOne({ email });

    if (existingUserEmail) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    const otp = generateOTP();
    const mailOptions = {
        from: 'aaraj232@gmail.com',
        to: email,
        subject: 'OTP for Verification',
        text: `Your OTP for verification is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: 'Failed to send OTP'
            });
        } else {
            console.log('Email sent: ' + info.response);
            otpMap.set(email, otp.toString());
            res.status(200).send({
                status: 200,
                message: 'OTP send successfully'
            });
        }
    });
}
const verifyEmailOTP = async (req, res) => {
    const { email, otp } = req.body;
    if (otpMap.has(email) && otpMap.get(email) === otp) {
        otpMap.delete(email);
        res.status(200).send({
            status: 200,
            message: 'OTP verified successfully'
        });
    } else {
        res.status(400).send({
            status: 400,
            message: 'Invalid Otp'
        });
    }
}


module.exports = {
    sendMobileOTP,
    verifyMobileOTP,
    sendEmailOTP,
    verifyEmailOTP
}