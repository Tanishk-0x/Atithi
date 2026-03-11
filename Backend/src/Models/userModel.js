const mongoose = require('mongoose') ; 

const userSchema = new mongoose.Schema({

    name : {
        type : String , 
        required : true 
    }, 
    email : {
        type : String , 
        required : true 
    }, 
    password : {
        type : String , 
        required : true 
    },

    phone : {
        type : String , 
        default : ''
    },

    listing : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Listing" 
    }],

    booking : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Booking"
    }]

},{ timestamps:true }); 

module.exports = mongoose.model("User" , userSchema); 