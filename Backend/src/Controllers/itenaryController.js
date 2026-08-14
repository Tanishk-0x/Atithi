const axios = require('axios') ; 
const GenerateContent = require('../GroqAI/ai.controller') ; 

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY1 ; 


const GenerateItenary = async (req , res) => {
    try {
        const { destination , days } = req.body ; 
        const info = `Destination: ${destination} - Days: ${days}`; 

        // Generating JSON Data (Groq)
        const response = await GenerateContent(info, '3') ;

        if( !response ){
            return res.status(404).json({
                success: false , 
                message: 'Itenary Not Found!'
            }); 
        }

        // Unsplash 
        for(const itr of response.itinerary ){
            const PlacesPromise = itr.places.map( async(place) => {
                try {
                    const unsplash_url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(place.imageSearchQuery)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1` ; 
                    const unsplash_res = await axios.get(unsplash_url) ; 

                    if( unsplash_res.data.results.length > 0 ){
                        place.imageUrl = unsplash_res.data.results[0].urls.regular ; 
                    }
                    else{
                        place.imageUrl = "https://images.unsplash.com/photo-1587786514494-6c673e729dd2?q=80&w=1128&auto=format&fit=crop" ; 
                    }
                }
                
                catch (error) {
                    console.log(`Error While Fetching From Unsplash: ${error}`); 
                    place.imageUrl = "https://images.unsplash.com/photo-1587786514494-6c673e729dd2?q=80&w=1128&auto=format&fit=crop" ; 
                }
            }); 

            await Promise.all(PlacesPromise) ; 
        }

        return res.status(200).json({
            success: true , 
            message: 'Itenary Generated SuccessFully!' , 
            itenary: response
        }) ; 
    }
    
    catch (error) {
        return res.status(500).json({
            success : false , 
            message : `An Error Occured While Generating Itenary : ${error}`
        }); 
    }
}

module.exports = GenerateItenary ; 