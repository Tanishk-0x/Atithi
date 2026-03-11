const User = require('../Models/userModel'); 

const getCurrentUser = async (req , res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        // updating populate 
            .populate('listing')
            .populate({
                path: 'booking' , 
                populate : [
                    { 
                        path: 'listing' ,
                        select : 'title landmark city rent image1 image2 image3 isBooked ratings'
                    },
                    {
                        path: 'host' , 
                        select : 'name email phone'
                    }
                ]
            });
        
        if(!user){
            res.status(400).json({
                success : false , 
                message : 'User Not Fetched'
            });
        }

        res.status(200).json({
            success : true , 
            message : 'User Fetched SuccessFully' , 
            user : user 
        }); 
    }

    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Fetching User: ${error}`
        });
    }
}

const AddPhone = async (req , res) => {
    try {
        const phone = req.body.phone ; 
        const user = await User.findById(req.userId); 
        if(!user){
            return res.status(404).json({
                success : false , 
                message : "User Not Found"
            }); 
        }
        user.phone = phone ; 
        await user.save() ; 

        return res.status(200).json({
            success : true , 
            message : "Phone Number Added SuccessFully"
        }); 
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Adding Phone no: ${error}`
        });     
    }
}

module.exports = {getCurrentUser , AddPhone};