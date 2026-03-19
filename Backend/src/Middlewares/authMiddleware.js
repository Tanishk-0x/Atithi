const jwt = require('jsonwebtoken');

// ---------- Auth Middleware ----------
const isAuth = async (req , res , next) => {
    try {
        const token = req.cookies.token ; 
        if(!token){
            return res.status(400).json({
                success : false , 
                message : 'Token Missing'
            }); 
        }

        const verifyToken = jwt.verify(token , process.env.JWT_SECRET);
        if(!verifyToken){
            res.status(400).json({
                success : false , 
                message : 'Invalid Token'
            });
        }

        req.userId = verifyToken.userId ; 
        next() ; 
    }

    catch (error) {
        res.status(500).json({
            success : false , 
            message : `isAuth Error : ${error}`
        }); 
    }
}

module.exports = isAuth