const cloudinary = require('cloudinary').v2 ; 
const fs = require('fs') ; 

const uploadOnCloudinary = async (filepath) => {
    try {
        
        // set Config 
        cloudinary.config({
            cloud_name : process.env.CLOUDINARY_CLOUD_NAME , 
            api_key : process.env.CLOUDINARY_API_KEY , 
            api_secret : process.env.CLOUDINARY_API_SECRET ,
        }); 

        if(!filepath){
            return null ; 
        }

        // Upload on cloudinary 
        const UploadResult = await cloudinary.uploader.upload(filepath); 
        // fs.unlinkSync(filepath); 
        // // delete from local
        if( fs.existsSync(filepath) ){
            fs.unlinkSync(filepath) ; 
        }

        return UploadResult.secure_url ; 
    }
    
    catch (error) {
        fs.unlinkSync(filepath); 
        console.log(error); 
    }
}

module.exports = uploadOnCloudinary 