const mongoose = require('mongoose'); 

const bookingSchema = new mongoose.Schema({

    host : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" ,
        required : true , 
    }, 
    guest : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" ,
        required : true , 
    }, 

    listing : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Listing" ,
        required : true ,
    },

    status : {
        type : String , 
        enum : ["pending" , "approved" , "ongoing" , "completed"] , 
        default : "pending" , 
    }, 
    passCode : {
        type : Number , 
    },

    checkIn : {
        type : Date , 
        required : true
    }, 
    checkOut : {
        type : Date , 
        required : true 
    }, 

    totalRent : {
        type : Number , 
        required : true
    }

}, { timestamps:true }); 

module.exports = mongoose.model("Booking" , bookingSchema); 