const axios = require('axios'); 

// ---------- Get Cordinates ----------
const getCordinates = async (landmark , city) => {
    try {
        // creating address with landmark and city 
        const address = landmark+','+city ; 
        
        // calling api to fetch lat & lon 
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