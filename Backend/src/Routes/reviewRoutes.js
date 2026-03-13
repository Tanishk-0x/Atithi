const express = require('express'); 
const router = express.Router(); 
const isAuth = require('../Middlewares/authMiddleware'); 
const {addReview , getReviews , FetchReviews} = require('../Controllers/reviewController'); 

router.post('/addreview/:id' , isAuth , addReview ); 

router.get('/getreviews/:id' , getReviews); 

router.get('/fetchreviews' , isAuth , FetchReviews); 

module.exports = router ;