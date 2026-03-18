const Review = require('../Models/reviewModel'); 
const GenerateContent = require('../GroqAI/ai.controller'); 

const SummarizeReviews = async (req , res) => {
    try {
        const {id} = req.params ; 

        const reviews = await Review.find({
            listing : id 
        }).select('feedback rating -_id').sort({createdAt: -1});

        const reviewString = JSON.stringify(reviews);  

        const Summmarized = await GenerateContent( reviewString , '2' ); 

        return res.status(200).json({
            success : true , 
            message : "Reviews Summarized SuccessFully!" , 
            reviews : reviews , 
            summmarized : Summmarized , 
        }); 
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Summarize Reviews : ${error}`
        }); 
    }
}

module.exports = SummarizeReviews ;