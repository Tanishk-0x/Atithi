const express = require('express'); 
const {Signup , Login , Logout} = require('../Controllers/authController');
const sendOtp = require('../Controllers/otpController'); 
const router = express.Router() ; 

router.post('/signup' , Signup);
router.post('/login' , Login);
router.post('/logout' , Logout); 

router.post('/otp' , sendOtp); 

module.exports = router ; 