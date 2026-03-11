const Booking = require('../Models/bookingModel'); 
const Listing = require('../Models/listingModel'); 
const User = require('../Models/userModel'); 
const SendMail = require('../Config/sendMail');

/*
1. create booking (status = pending)
2. approve booking (status= approved), (passcode Generated), (email send), ( show in Upcoming HOST)
3. checkIn - with passcode ( show in active booking )
4. complete - delete the booking 
*/

const createBooking = async (req , res) => {
    try {
        const {id} = req.params ; 
        const {checkIn , checkOut , totalRent} = req.body ; 

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

        // check for already booked or not?
        if(listing.isBooked){
            res.status(400).json({
                success : false , 
                message : "Listing Already Booked"
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

        // mark the guest
        listing.guest = req.userId ; 

        // mark as booked 
        listing.isBooked = true ; 

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

// ------ Approve Booking (request) -------

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

// -------- CheckIn Booking ----------
/*
1. take ID from params 
2. find booking 
3. update its status to [ongoing]
*/
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

// ------- Get Bookings ---------
/*
1. Pending Request = (status: pending);
2. Timeline = (status: approved); 
3. Ongoing Booking = (status: ongoing); 

*/

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
            .populate('guest' , 'name email')
            .populate('listing' , 'title image1 landmark city')
            .sort({createdAt: -1});
        
        if(!bookings){
            return res.status(404).json({
                success : false , 
                message : "Booking Not Found!"
            }); 
        }

        // filter 
        const pending = bookings.filter(b => b.status === 'pending'); 
        const approved = bookings.filter(b => b.status === 'approved');
        const checkInned = bookings.filter(b => b.status === 'ongoing');  

        res.status(200).json({
            success : true , 
            message : "Data Fetched SuccessFully" , 
            data : {
                pending ,
                approved , 
                checkInned ,
            }
        }); 
    }
    
    catch (error) {
        res.status(500).json({
            success : false , 
            message : `An Error Occured While Getting Data : ${error}`
        }); 
    }
}

// ----------------------------------------

const cancelBooking = async (req , res) => {
    try {
        const {id} = req.params ; 
        // IsBooked = False
        const listing = await Listing.findByIdAndUpdate(id , {isBooked:false})
        // Update in User's Booking 
        const user = await User.findByIdAndUpdate(listing.guest , {
            $pull:{booking:listing._id}
        },{ new:true });

        if(!user){
            res.status(404).json({
                success : false ,
                message : "User Not Found"
            }); 
        }

        res.status(200).json({
            success : true , 
            message : "Booking Canceled SuccessFully"
        }); 
    }
    
    catch (error) {
       res.status(500).json({
            success : false , 
            message : `An Error Occured While Cancel Booking : ${error}`
        }); 
    }
}

module.exports = {createBooking , cancelBooking , ApproveBooking , getBookingsData , CheckInBooking}