const express = require('express'); 
const router = express.Router() ; 
const isAuth = require('../Middlewares/authMiddleware'); 
const Upload = require('../Middlewares/multer');
const {addListing , getListing , findListing , updateListing , deleteListing , rateListing , searchListing , GenerateDescription} = require('../Controllers/listingController'); 
const NaturalSearch = require('../Controllers/naturalSearch');

router.post('/add' , isAuth , Upload.fields([
    {name:"image1" , maxCount:1 },
    {name:"image2" , maxCount:1 },
    {name:"image3" , maxCount:1 },
]) , addListing ); 

router.get('/get' , getListing); 
router.get('/findlistingbyid/:id' , isAuth , findListing); 

router.post('/update/:id' , isAuth , Upload.fields([
    {name:"image1" , maxCount:1 },
    {name:"image2" , maxCount:1 },
    {name:"image3" , maxCount:1 },
]) , updateListing ); 

router.delete('/deletelistingbyid/:id' , isAuth , deleteListing);

router.post('/ratings/:id' , isAuth , rateListing); 

router.get('/search' , searchListing); 

router.get('/naturalsearch' , NaturalSearch); 

router.post('/generatedesc' , GenerateDescription); 


module.exports = router ; 