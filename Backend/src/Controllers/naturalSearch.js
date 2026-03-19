const Listing = require('../Models/listingModel'); 
const GenerateContent = require('../GroqAI/ai.controller'); 
const QueryBuilder = require('../Config/queryBuilder');

/*
1. get the query from request 
2. send the query to Groq(ai) to parse and extract useful info
3. now send the aiResponse to Query-Builder to built dynamic query 
4. using that query -> Query the database 
5. sort them accordingly 
*/


const NaturalSearch = async (req , res) => {
    try {
        const { query } = req.query ; 

        if(!query){
            return res.status(401).json({
                success : false , 
                message : "SearchQuery Required!"
            }); 
        }

        // calling ai 
        const response = await GenerateContent( query , '0' ); 

        // build query 
        const queryBuilds = QueryBuilder( response ); 

        // find listing using his query 
        const listings = await Listing.find( queryBuilds )
            .limit(12)
            .lean()
            .select('title description rent city landmark image1 category'); 
        

        return res.status(200).json({
            success : true , 
            message : "Natural Search Worked!" , 
            aiResponse : response , 
            buildQuery : queryBuilds , 
            matchedListings : listings.length , 
            results : listings , 
        }); 
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `Error In Natural Search: ${error}`
        });     
    }
}

module.exports = NaturalSearch ; 