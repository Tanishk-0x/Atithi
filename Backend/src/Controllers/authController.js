const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const GenerateToken = require('../Config/token');
const Otp = require('../Models/otpModel'); 

const Signup = async (req , res) => {
    try {
        const {name , email , password , otp} = req.body ; 
        const userExist = await User.findOne({email}); 

        // Verify Otp 
        const otpCheck = await Otp.findOne({ email , otp }); 

        if(!otpCheck){
            return res.status(400).json({
                success : false , 
                message : "Invalid or Expired Otp"
            }); 
        }


        if(userExist){
            return res.status(400).json({
                success : false , 
                message : "User Already Exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10); 

        const user = await User.create({
            name , email , password : hashedPassword
        }); 

        const token = await GenerateToken(user._id); 

        res.cookie("token" , token , {
            httpOnly : true , 
            secure : true , 
            maxAge : 7 * 24 * 60 * 60 * 1000 , 
            sameSite: 'None',
        });

        return res.status(201).json({
            success : true , 
            message : "Signup SuccessFully" , 
            user 
        });
    }
    
    catch (error) {
      return res.status(500).json({
        success : false , 
        message : `An Error Occured While Signup : ${error}`
      })  
    }
}


const Login = async (req , res) => {
    try {
        const {email , password} = req.body ;
        const user = await User.findOne({email}).populate(
            "listing" , "title description image1 image2 image3 rent city landmark category"
        );

        if(!user){
            return res.status(404).json({
                success : false , 
                message : "User Not Found"
            })
        }

        const isMatch = await bcrypt.compare(password , user.password); 

        if(!isMatch){
            return res.status(403).json({
                success : false , 
                message : "Incorrect Password"
            })
        }

        const token = await GenerateToken(user._id); 

        res.cookie("token" , token , {
            httpOnly : true , 
            secure : true , 
            maxAge : 7 * 24 * 60 * 60 * 1000 , 
            sameSite: 'None',
        });

        return res.status(200).json({
            success : true , 
            message : "Login SuccessFully" , 
            user 
        });

    }
    
    catch (error) {
        return res.status(500).json({
            success : false ,
            message : "An Error Occured While Login"
        }) 
    }
}


const Logout = async (req , res) => {
    try {
        res.clearCookie("token"); 

        return res.status(200).json({
            success : true , 
            message : "Logout SuccessFully"
        });
    }
    
    catch (error) {
       return res.status(400).json({
            success : false , 
            message : "An Error Occured While Logout"
       })
    }
}


module.exports = {Signup , Login , Logout}