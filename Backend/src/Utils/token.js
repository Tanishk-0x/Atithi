const jwt = require('jsonwebtoken'); 

// ---------- Generate Token ----------
const GenerateToken = (userId) => {
    try {
        const Jwt_Secret = process.env.JWT_SECRET ; 
        const token =  jwt.sign({userId} , Jwt_Secret , {expiresIn:"7d"});
        return token ; 
    }
    catch (error) {
        console.log("Error while generating token" , error);    
    }
}

module.exports = GenerateToken 