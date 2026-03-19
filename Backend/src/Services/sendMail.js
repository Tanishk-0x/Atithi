const nodemailer = require('nodemailer'); 
require('dotenv').config(); 

// ---------- Send Mail ----------
const SendMail = async (email , passcode) => {

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

    // email content 
    const htmlContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #ef4444; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">Project Alpha 🪴</h1>
                <p style="margin: 5px 0 0;">Booking Confirmed</p>
            </div>
            <div style="padding: 30px; color: #333;">
                <h2 style="color: #333;">Hello Guest,</h2>
                <p>Your booking has been <b>successfully confirmed</b> by the host. We are excited to host you!</p>
                <div style="background-color: #fff5f5; border: 2px dashed #ef4444; padding: 20px; text-align: center; margin: 20px 0;">
                    <p style="margin: 0; font-size: 14px; color: #666;">CHECK-IN PASSCODE</p>
                    <h1 style="margin: 10px 0; font-size: 36px; letter-spacing: 8px; color: #ef4444;">${passcode}</h1>
                    <p style="margin: 0; font-size: 12px; color: #999;">Please show this code to the host during check-in.</p>
                </div>
                <p>Enjoy your stay and have a wonderful experience!</p>
            </div>
            <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #888;">
                © 2026 Project Alpha | RentHub
            </div>
        </div>
    `;

    // sending mail 
    const info = await transporter.sendMail({
        from: '"Project Alpha 🪴" <projectalpha00956@gmail.com>',
        to: email, 
        subject: "🎉 Booking Confirmation - Your Passcode Inside",
        text: `Your Booking is Confirmed! Your check-in passcode is ${passcode}`,
        html: htmlContent,
    });

    return info.messageId ; 
}

module.exports = SendMail ; 