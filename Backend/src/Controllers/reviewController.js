const Review = require('../Models/reviewModel'); 
const Listing = require('../Models/listingModel'); 

// ---------- Add Review ----------
const addReview = async (req , res) => {
    try {
        const {id} = req.params ; 
        const feedback = req.body.feedback ; 
        const rating = Number(req.body.rating);
       
        if( !feedback || !rating ){
            return res.status(404).json({
                success : false , 
                message : "Feedback And Rating Can't Be Empty!"
            }); 
        }

        const listing = await Listing.findById(id); 
        
        if(!listing){
            return res.status(400).json({
                success : false , 
                message : "Listing Not Found!"
            }); 
        }
        
        // Creating review 
        const newReview = new Review({
            listing : listing._id ,
            host : listing.host ,
            guest : req.userId , 
            feedback : feedback , 
            rating : rating 
        }); 

        await newReview.save(); 

        // ---------- Avg Rating --------------
        const oldCount = listing.reviews.length ; 
        const oldRating = listing.ratings || 0 ; 

        const newCount = oldCount + 1 ; 
        const newAverage = ((oldRating * oldCount) + rating) / newCount ; 

        // Save rating to listing model 
        listing.ratings = Number(newAverage.toFixed(1)); 

        // pushing review's id into listing model 
        listing.reviews.push(newReview._id); 
        await listing.save();         

        return res.status(201).json({
            success : true , 
            message : "Review Added!"
        });
        
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Adding Review ${error}`
        });
    }
}

// ---------- Get Reviews ----------
const getReviews = async (req , res) => {
    try {
        const {id} = req.params ; 

        const reviews = await Review.find(
            { listing : id }
        ).lean()
        .populate('guest' , 'name')
        .populate('listing' , 'title')
        .select('feedback rating createdAt guest listing')
        .sort({ createdAt: -1 }); 

        if(!reviews){
            return res.status(404).json({
                success : false , 
                message : "No Review Found!"
            }); 
        }

        return res.status(200).json({
            success : true , 
            message : "Reviews Fetched SuccessFully" , 
            reviews : reviews 
        }); 
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Fetching Review ${error}`
        });
    }
}

// ---------- Fetch Reviews ----------
const FetchReviews = async (req , res) => {
    try {
        const user = req.userId ; 
        const reviews = await Review.find({
            host : user 
        }).sort({ createdAt: -1 }).limit(5).populate('guest' , 'name').populate('listing' , 'title');  

        if(!reviews){
            return res.status(404).json({
                success : false , 
                message : "No Reviews Found!"
            }); 
        }

        return res.status(200).json({
            success : true , 
            message : "Reviews Fetched" , 
            reviews : reviews 
        }); 
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Fetching Review ${error}`
        });
    }
}

module.exports = {addReview , getReviews , FetchReviews} 