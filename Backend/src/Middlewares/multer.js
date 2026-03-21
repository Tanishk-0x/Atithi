const multer = require('multer'); 

// Configure Storage
const storage = multer.diskStorage({

    destination : (req , file , cb) => {
        cb( null , '/tmp'); 
    }, 
    filename : (req , file , cb) => {
        cb( null , file.originalname);
    }
    
}); 

// Initialise Multer Middleware 
const Upload = multer({storage}); 
module.exports = Upload ; 