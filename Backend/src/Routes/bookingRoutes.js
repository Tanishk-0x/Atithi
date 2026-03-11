const express = require('express');
const { createBooking , cancelBooking , ApproveBooking , getBookingsData} = require('../Controllers/bookingController');
const isAuth = require('../Middlewares/authMiddleware');
const router = express.Router(); 

router.post('/create/:id' , isAuth , createBooking); 
router.delete('/cancel/:id' , isAuth , cancelBooking);

router.put('/approve/:id' , ApproveBooking ); 

router.get('/gethostdata' , isAuth , getBookingsData); 

module.exports = router ; 