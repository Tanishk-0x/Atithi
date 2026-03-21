const uploadOnCloudinary = require('../Config/cloudinary'); 
const Listing = require('../Models/listingModel'); 
const User = require('../Models/userModel'); 
const GenerateContent = require('../GroqAI/ai.controller'); 
const getCordinates = require('../Services/geoCoding'); 
const { dbConnect } = require('../Config/database'); 

// ---------- Add Listing ----------
const addListing = async (req , res) => {
    try {
        const host = req.userId ; 
        const {title , description , rent , city , landmark , category , amenities , points , maxGuestAllowed} = req.body ;
        
        const image1 = await uploadOnCloudinary(req.files.image1[0].path); 
        const image2 = await uploadOnCloudinary(req.files.image2[0].path); 
        const image3 = await uploadOnCloudinary(req.files.image3[0].path); 

        const listing = await Listing.create({
            host , 
            title , 
            description , 
            rent , 
            city , 
            landmark , 
            category , 
            image1 , 
            image2 ,
            image3 , 
            amenities , 
            points , 
            maxGuestAllowed , 
        }); 

        const user = await User.findByIdAndUpdate(host , {$push:{listing:listing._id}} , {new:true}); 

        if(!user){
            return res.status(404).json({
                success : false , 
                message : "User Not Found"
            }); 
        }

        return res.status(201).json({
            success : true , 
            message : "Listing Created SuccessFully" , 
            listing : listing
        }); 
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Creating Listing ${error}`
        });
    }
}; 

// ---------- Get Listings(through pagination) ----------
const getListing = async (req , res) => {
    try {
        // fixing the buffering timeout 
        await dbConnect(); 

        // taking page & limit from query 
        const page = parseInt(req.query.page) || 1 ;  
        const limit = parseInt(req.query.limit) || 12 ; 

        // calculate document to skip 
        const skip = (page-1) * limit ; 

        // total documents 
        const totalListings = await Listing.countDocuments(); 

        // fetch the listings 
        const listings = await Listing.find()
            .lean()
            .sort({ createdAt: -1 } )
            .skip(skip)
            .limit(limit);
        
        return res.status(200).json({
            success : true , 
            message : "Listing Through Pagination Fetched SuccessFully" , 
            listing : listings , 
            totalPages : Math.ceil(totalListings / limit), 
            currentPage : page , 
            totalResults : totalListings  
        }); 
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Fetching Listings ${error}`
        })    
    }
}


// ---------- Find Listing (ViewCard) ----------
const findListing = async (req , res) => {
    try {
        const {id} = req.params ; 
        const listing = await Listing.findById(id).populate('host' , 'name email phone')

        if(!listing){
            return res.status(404).json({
                success : false , 
                message : "Listing Not Found"
            });
        }

        // call to fetch lat and lon
        const response = await getCordinates(listing.landmark , listing.city); 

        listing.viewCount = listing.viewCount + 1 ; 
        await listing.save();

        return res.status(200).json({
            success : true , 
            message : "Listing Found SuccessFully" , 
            listing : listing ,
            lat : response[0] , 
            lon : response[1] ,  
        });
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Finding Listings ${error}`
        })
    }
}

// ---------- Update Listing ----------
const updateListing = async (req , res) => {
    try {
        let image1 ; 
        let image2 ; 
        let image3 ; 
        const {id} = req.params ; 
        const {title , description , rent , city , landmark , category} = req.body ;
        
        if(req.files.image1){
            image1 = await uploadOnCloudinary(req.files.image1[0].path); 
        }
        if(req.files.image2){
            image2 = await uploadOnCloudinary(req.files.image2[0].path); 
        }
        if(req.files.image3){
            image3 = await uploadOnCloudinary(req.files.image3[0].path); 
        }   

        const listing = await Listing.findByIdAndUpdate( id , {
            title , 
            description , 
            rent , 
            city , 
            landmark , 
            category , 
            image1 , 
            image2 ,
            image3
        }, { new:true }); 


        return res.status(201).json({
            success : true , 
            message : "Listing Updated SuccessFully" , 
            listing : listing
        });

    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Updating Listings ${error}`
        }); 
    }
}

// ---------- Delete Listing ----------
const deleteListing = async (req , res) => {
    try {
        const {id} = req.params ; 
        const listing = await Listing.findByIdAndDelete(id); 
        const user = await User.findByIdAndUpdate(listing.host , {
            $pull:{listing:listing._id} , 
        },{new:true});
        
        if(!user){
            return res.status(404).json({
                success : false , 
                message : 'User Not Found'
            });
        }

        return res.status(200).json({
            success : true , 
            message : 'Listing Deleted SuccessFully'
        }); 
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Deleting Listing ${error}`
        }); 
    }
}

// ---------- Search Listing ----------
const searchListing = async (req , res) => {
    try {
        const { query } = req.query ; 

        if(!query){
            return res.status(400).json({
                success : false , 
                message : "Search Query Is Required"
            }); 
        }

        const listing = await Listing.find({
            $or : [
                { landmark : { $regex : query , $options : "i"}} , 
                { city : { $regex : query , $options : "i"}} , 
                { title : { $regex : query , $options : "i"}} , 
            ]
        }).lean();  

        return res.status(200).json({
            success : true , 
            message : "Listing Fetched" , 
            listing : listing
        }); 
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Search Listing ${error}`
        })     
    }
}

// ---------- Generate Description ----------
const GenerateDescription = async (req , res) => {
    try {
        const { searchquery } = req.body ; 

        const searchQuery = searchquery.toString(); 

        if(!searchquery){
            return res.status(403).json({
                success : false , 
                message : "Input Can't Be Empty"
            })
        }

        // calling ai
        const response = await GenerateContent( searchQuery , '1' ); 

        return res.status(200).json({
            success : true , 
            message : "Description Generated SuccessFully" , 
            desc : response 
        }); 
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Generating Description ${error}`
        })
    }
}

module.exports = {addListing , getListing , findListing , updateListing , deleteListing , searchListing , GenerateDescription} ; 