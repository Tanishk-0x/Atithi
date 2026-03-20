const OTP = require('../Models/otpModel'); 
const nodemailer = require('nodemailer'); 
require('dotenv').config(); 

const GenerateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

// create a transport (gmail smtp configuration)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com' , 
    port: 587 , 
    secure: false , 
    auth : {
        user: process.env.HOST_EMAIL , 
        pass: process.env.EMAIL_APP_PASSWORD
    },
});

// ---------- Send Otp ----------
const sendOtp = async (req , res) => {
    try {
        const {email} = req.body ; 

        if(!email){
            return res.status(404).json({
                success : false , 
                message : "Email Not Found!"
            }); 
        }

        // delete old otps
        await OTP.deleteMany({ email : email });

        // Generate OTP 
        const otp = GenerateOtp(); 

        // save otp in DB 
        const savedOtp = await OTP.create({
            email : email , 
            otp : otp 
        });

        if (!savedOtp) {
            throw new Error("Database failed to create OTP record");
        }


        const htmlContent = `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="background-color: #ef4444; color: white; padding: 25px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px; letter-spacing: 1px;">Atithi 🏡</h1>
                    <p style="margin: 5px 0 0; opacity: 0.9; font-size: 16px;">Secure Account Verification</p>
                </div>

                <div style="padding: 40px 30px; color: #333; line-height: 1.6;">
                    <h2 style="color: #1a1a1a; margin-top: 0;">Verify Your Email</h2>
                    <p>Welcome to <b>Atithi</b>! We're excited to have you. To complete your signup and start booking unique stays, please use the verification code below:</p>
                    
                    <div style="background-color: #fff5f5; border: 2px dashed #ef4444; padding: 30px; text-align: center; margin: 30px 0; border-radius: 8px;">
                        <p style="margin: 0 0 10px; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 2px;">Your OTP Code</p>
                        <h1 style="margin: 0; font-size: 48px; letter-spacing: 12px; color: #ef4444; font-family: monospace;">${otp}</h1>
                        <p style="margin: 15px 0 0; font-size: 13px; color: #999;">This code is valid for <b>5 minutes</b>. Please do not share this with anyone.</p>
                    </div>

                    <p>If you didn't request this code, you can safely ignore this email.</p>
                    <p style="margin-bottom: 0;">Happy Hosting,<br><b>Team Atithi</b></p>
                </div>

                <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee;">
                    <p style="margin: 0;">© 2026 Atithi Inc. | Indore, India</p>
                    <div style="margin-top: 10px;">
                        <a href="#" style="color: #ef4444; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                        <a href="#" style="color: #ef4444; text-decoration: none; margin: 0 10px;">Support</a>
                    </div>
                </div>
            </div>
        `;

        // sending mail 
        try {
            const info = await transporter.sendMail({
                from: '"Atithi 🏡" <projectalpha00956@gmail.com>',
                to: email, 
                subject: "Otp Verification - Your Otp Inside",
                text: `We have send and Otp, valid for 5 min ${otp}`,
                html: htmlContent,
            });
        } catch (mailError) {
            return res.status(500).json({
                success : false , 
                message : 'Email Server Failed!'
            }); 
        }

        return res.status(200).json({
            success : true , 
            message : "Otp Send SuccessFully"
        }); 

    }
    
    catch (error) {
        return res.status(500).json({
            success : false ,
            message : `An Error Occured While Sending Otp : ${error}`
        });     
    }
}


module.exports = sendOtp ; 