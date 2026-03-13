const axios = require('axios'); 

const getCordinates = async (landmark , city) => {
    try {
        const address = landmark+','+city ; 
        
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1` , 
            {
                headers : { 
                    "User-Agent" : "Project-Alpha-01" 
                }
            }
        );
        
        return [response.data[0].lat , response.data[0].lon] ; 
    }
    
    catch (error) {
        return error ;    
    }
}

module.exports = getCordinates ; 