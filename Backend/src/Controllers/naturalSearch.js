const Listing = require('../Models/listingModel'); 
const GenerateContent = require('../GroqAI/ai.controller'); 
const QueryBuilder = require('../Utils/queryBuilder');
const ValidateAndSearch = require('../Utils/searchValidation'); 

/*
    1. get the query from request 
    2. send the query to Groq(ai) to parse and extract useful info
    3. validate the ai response 
    4. now send the validated response to queryBuilder to build Query  
    4. using that query -> Query the database 
    5. sort them accordingly 
*/

// ---------- Natural Search ----------
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

        // validate response 
        const validatedResult = ValidateAndSearch( response ); 

        // build query 
        const queryBuilds = QueryBuilder( validatedResult ); 

        // find listing using his query 
        const listings = await Listing.find( queryBuilds )
            .limit(12)
            .lean()
            .select('title description rent city landmark image1 category'); 
        

        return res.status(200).json({
            success : true , 
            message : "Natural Search Worked!" , 
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