const express = require('express');
const { createBooking , CancelBooking , ApproveBooking , getBookingsData, CheckInBooking , FetchBusyDates , CompleteBooking , RejectBooking} = require('../Controllers/bookingController');
const isAuth = require('../Middlewares/authMiddleware');
const router = express.Router(); 

router.post('/create/:id' , isAuth , createBooking); 

router.put('/approve/:id' , ApproveBooking ); 

router.put('/checkin/:id' , CheckInBooking ); 

router.put('/complete/:id' , CompleteBooking ); 

router.put('/reject/:id' , RejectBooking ); 

router.get('/fetchdates/:id' , FetchBusyDates ); 

router.get('/gethostdata' , isAuth , getBookingsData); 

router.put('/cancel/:id' , isAuth , CancelBooking ); 

module.exports = router ; 