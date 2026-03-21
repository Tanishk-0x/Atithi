const mongoose = require('mongoose'); 

const listingSchema = new mongoose.Schema({
    title : {
        type : String , 
        required : true 
    },
    description : {
        type : String , 
        required : true
    }, 

    host : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" , 
        required : true
    }, 

    image1 : {
        type : String , 
        required : true 
    }, 
    image2 : {
        type : String , 
        required : true
    }, 
    image3 : {
        type : String , 
        required : true
    }, 

    rent : {
        type : Number , 
        required : true
    }, 
    city : {
        type : String , 
        required : true
    }, 
    landmark : {
        type : String , 
        required : true
    }, 
    category : {
        type : String , 
        required : true
    }, 

    ratings : {
        type : Number , 
        min : 0 ,
        max : 5 ,
        default : 0
    },

    amenities : {
        type : [String] , 
        default : [] 
    },

    points : {
        type : [String] , 
        default : [] , 
    }, 

    maxGuestAllowed : {
        type : Number , 
        default : 2 
    }, 

    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "Review"
        }
    ], 

    viewCount : {
        type : Number , 
        default : 0 
    }, 


}, {timestamps:true}); 

module.exports = mongoose.model("Listing" , listingSchema); 