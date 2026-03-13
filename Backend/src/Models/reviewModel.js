const mongoose = require('mongoose'); 

const reviewSchema = new mongoose.Schema({
    listing : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Listing" , 
        required : true 
    }, 

    guest : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" , 
        required : true 
    },

    host : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" , 
        required : true 
    },

    rating : {
        type : Number , 
        default : 0 , 
        min : 1 ,
        max : 4  ,
        required : true 
    }, 

    feedback : {
        type : String , 
        trim : true , 
        required : true 
    }

},{ timestamps: true }); 

module.exports = mongoose.model("Review" , reviewSchema); 