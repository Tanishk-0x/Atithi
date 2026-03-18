const express = require('express'); 
const router = express.Router(); 
const isAuth = require('../Middlewares/authMiddleware'); 
const {addReview , getReviews , FetchReviews} = require('../Controllers/reviewController'); 
const SummarizeReviews = require('../Controllers/reviewSummarize');

router.post('/addreview/:id' , isAuth , addReview ); 

router.get('/getreviews/:id' , getReviews); 

router.get('/fetchreviews' , isAuth , FetchReviews); 

router.get('/summarize/:id' , SummarizeReviews); 

module.exports = router ;