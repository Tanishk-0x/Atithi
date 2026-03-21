const Booking = require('../Models/bookingModel'); 
const Listing = require('../Models/listingModel'); 
const User = require('../Models/userModel'); 
const SendMail = require('../Services/sendMail');
const { mongoose } = require('mongoose');

// ---------- Create Booking ----------
const createBooking = async (req , res) => {
    try {
        const {id} = req.params ; 
        const {checkIn , checkOut , totalRent} = req.body ; 

        // ---- Check for Overlap Booking Dates ----
        const reqIn = new Date(checkIn); 
        const reqOut = new Date(checkOut); 

        const isOverlapping = await Booking.findOne({
            listing : id , 
            $and : [
                { checkIn : { $lt: reqOut } }, 
                { checkOut : { $gt: reqIn } }, 
            ]
        }); 

        if(isOverlapping){
            return res.status(400).json({
                success : false , 
                message : "Dates already booked!"
            });
        }

        const listing = await Listing.findById(id)
            .populate('host' , 'name email phone'); 

        // check for listing 
        if(!listing){
            res.status(404).json({
                success : false , 
                message : "Listing Not Found"
            }); 
        }

        // check for invalid dates
        if(new Date(checkIn) >= new Date(checkOut)){
            res.status(400).json({
                success : false , 
                message : "Invalid CheckIn/CheckOut Date"
            }); 
        }
        
        // check for already booked 
        const alreadyBooked = await Booking.findOne({
            listing : id , 
            guest : req.userId ,
            status : { $in : ['pending', 'approved', 'ongoing'] }
        }); 

        if(alreadyBooked){
            return res.status(403).json({
                success : false , 
                message : "You Have Already Booked This Listing!"
            }); 
        }

        // creating booking
        const booking = await Booking.create({
            checkIn ,
            checkOut ,
            totalRent , 

            host : listing.host , 
            guest : req.userId , 
            listing : listing._id ,
        }); 

        // push listing_id into user's booking
        const user = await User.findByIdAndUpdate(req.userId , {
            $push:{booking:booking._id} ,
        } , {new:true});

        await (await booking.populate("host" , "name phone email"))
            .populate("listing" , "title city landmark image1 rent");

        if(!user){
            res.status(404).json({
                success : false , 
                message : "User Not Found"
            });
        }

        // save
        await listing.save(); 

        res.status(201).json({
            success : true , 
            message : "Booking Created SuccessFully" , 
            booking : booking , 
        });
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While Booking : ${error}`
        }); 
    }
}

// ---------- Approve Booking ----------
const GeneratePassCode = () => {
    return Math.floor(1000 + Math.random() * 9000); 
}

const ApproveBooking = async (req , res) => {
    try {
        const {id} = req.params ;
        
        const booking = await Booking.findById(id).populate("guest" , "email");  

        // check for booking exist or not?
        if(!booking){
            res.status(404).json({
                success : false ,
                message : "Booking Not Found"
            });
        }

        // approving status 
        booking.status = "approved"; 

        // Generating Passcode 
        const PassCode = GeneratePassCode(); 

        // setting passCode 
        booking.passCode = PassCode ; 
        
        // extract guest email to send mail 
        const email = booking?.guest.email ; 

        // send mail
        const mail = await SendMail(email , PassCode); 

        await booking.save();

        return res.status(200).json({
            success : true , 
            message : "Approved! Email has been sent" , 
        });
    }
    
    catch (error) {
       res.status(500).json({
            success : false , 
            message : `An Error Occured While Approving Booking : ${error}`
        }); 
    }
}

// ---------- CheckIn Booking ----------
const CheckInBooking = async (req , res) => {
    try {
        const {id} = req.params ; 
        const passcode = Number(req.body.passcode) ;  

        const booking = await Booking.findById(id); 

        if(!booking){
            return res.status(404).json({
                success : false ,
                message : "Booking Not Found"
            });
        }

        // check for passCode 
        if(!passcode){
            return res.status(404).json({
                success : false , 
                message : "PassCode Not Found!"
            });
        }

        if( booking.passCode !== passcode ){
            return res.status(403).json({
                success : false , 
                message : "Invalid PassCode"
            });
        }

        booking.status = 'ongoing' ; 
        
        await booking.save() ; 

        return res.status(200).json({
            success : true ,
            message : "CheckInned! SuccessFully"
        });
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While CheckIn : ${error}`
        }); 
    }
}

// ---------- Complete Booking ----------
const CompleteBooking = async (req , res) => {
    try {
        const {id} = req.params ; 

        const booking = await Booking.findById(id); 

        if(!booking){
            return res.status(404).json({
                success : false ,
                message : "Booking Not Found"
            });
        }

        booking.status = 'completed' ; 
        
        await booking.save(); 

        return res.status(200).json({
            success : true , 
            message : "Marked As Completed"
        }); 
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While Completing : ${error}`
        });
    }
}

// ---------- Reject Request ----------
const RejectBooking = async (req , res) => {
    try {
        const {id} = req.params ; 

        const booking = await Booking.findByIdAndUpdate(id , 
            { status : 'rejected'},
            { new : true}
        );

        if(!booking){
            return res.status(404).json({
                success : false ,
                message : "Booking Not Found"
            });
        }

        return res.status(200).json({
            success : true ,
            message : "Booking Rejected!"
        }); 
    }
    
    catch (error) {
       res.status(500).json({
            success : false , 
            message : `An Error Occured While Rejecting : ${error}`
        }); 
    }
}

// ---------- Get Bookings ----------
const getBookingsData = async (req , res) => {
    try {
        // getting host'sId 
        const hostId = req.userId ; 

        if(!hostId){
            return res.status(404).json({
                success : false ,
                message : "User Not Found!"
            }); 
        }

        const bookings = await Booking.find({ host: hostId })
            .lean()
            .populate('guest' , 'name email')
            .populate('listing' , 'title image1 landmark city')
            .sort({createdAt: -1});
        
        if(!bookings){
            return res.status(404).json({
                success : false , 
                message : "Booking Not Found!"
            }); 
        }

        // ------- Revenue Logic -------
        /*
            1. filter only this host and completed bookings 
            2. group => { taking month from checkOut Date } + { calculate the totalrent Month-wise }
            3. sort => { _id } => Jan-Feb-Mar-....
            4. mongoDb only gives the avialable month's revenue field.  for all months manually set it to 0 ( found => monthlyTotal , 0 )
            5. return as response  
        */

        const revenueStats = await Booking.aggregate([

            // Stage: 1 - Filter Bookings 
            { 
                $match : { 
                    host : new mongoose.Types.ObjectId(hostId) , 
                    status : 'completed'
                }
            }, 

            // Stage: 2 - Grouping by Months / Calculate total 
            {
                $group : {
                    _id : { $month: "$checkOut" }, // 1 = Jan , 2 = Feb 
                    monthlyTotal : { $sum : "$totalRent" }, // calculating monthWise total
                    totalBookings : { $sum : 1 }, 
                }
            }, 

            // Stage: 3 - Sort by Months 
            {
                $sort : {
                    "_id" : 1 
                }
            }

        ]); 

        // manually mapping the empty months to 0 

        const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 

        let totalOverallRevenue = 0 ; 
        let totalOverallBookings = 0 ; 

        const FinalData = monthsNames.map((name , index) => {
            const monthCode = index + 1 ; 
            const found = revenueStats.find(itr => itr._id === monthCode) ; 

            if(found){
                totalOverallRevenue += found.monthlyTotal ; 
                totalOverallBookings += found.totalBookings ; 
            }

            return {
                month : name ,
                revenue : found ? parseInt(found.monthlyTotal) : 0 ,
            }
        }); 

        res.status(200).json({
            success : true , 
            message : "Data Fetched SuccessFully" , 
            booking : bookings ,
            revenueStats : FinalData ,
            totalRevenue : parseInt(totalOverallRevenue) , 
            totalBookings : totalOverallBookings , 
        }); 
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While Getting Data : ${error}`
        }); 
    }
}

// ---------- Cancel Booking ----------
const CancelBooking = async (req , res) => {
    try {
        const {id} = req.params ; 
        const userId = req.userId ; 

        const booking = await Booking.findById(id); 

        if(!booking){
            return res.status(404).json({
                success : false , 
                message : "Booking Not Found!"
            }); 
        }

        // Check for unauthorized cancellation 
        if( booking.guest.toString() !== userId.toString() ){
            return res.status(403).json({
                success : false , 
                message : "Unauthorized Action!"
            }); 
        }

        // Check for status 
        if( booking.status === 'ongoing' || booking.status === 'completed' ){
            return res.status(400).json({
                success : false , 
                message : `Unable to cancel : ${booking.status} booking`
            }); 
        }

        // updating the status
        booking.status = 'cancelled' ; 
        await booking.save(); 
        
        return res.status(200).json({
            success : true , 
            message : "Booking Cancelled!"
        }); 
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured Cancelling Booking : ${error}`
        }); 
    }
}


// ---------- Get Busy Dates ----------
/*
    1. Fetch Busy Dates
    2. Convert the dates in required format DatePicker  
    3. Exclude Booked Dates using DatePicker 
    4. Additional checks for safety to avoid overlap 
*/

const FetchBusyDates = async (req , res) => {
    try {
        const { id } = req.params ; 

        const busyBookings = await Booking.find({
            listing : id 
        }).lean().select('checkIn checkOut -_id'); 

        if(!busyBookings){
            return res.status(404).json({
                success : false , 
                message : "No Booking Found!"
            }); 
        }

        res.status(200).json({
            success : true , 
            message : 'Dates Fetched SuccessFully!' , 
            dates : busyBookings , 
        });

    }
    
    catch (error) {
          res.status(500).json({
            success : false , 
            message : `An Error Occured While Fetching Dates : ${error}`
        });   
    }
}

module.exports = {createBooking , CancelBooking , ApproveBooking , getBookingsData , CheckInBooking , FetchBusyDates , CompleteBooking , RejectBooking}