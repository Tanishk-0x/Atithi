const multer = require('multer'); 

// Configure Storage
const storage = multer.diskStorage({

    destination : (req , file , cb) => {
        cb( null , '/tmp'); 
    }, 
    filename : (req , file , cb) => {
        const suffix = Date.now() + '-' + (Math.round(Math.random() * 1000) + 1) ; 
        cb( null , suffix + '-' + file.originalname);
    }
    
}); 

// Initialise Multer Middleware 
const Upload = multer({storage}); 
module.exports = Upload ; 