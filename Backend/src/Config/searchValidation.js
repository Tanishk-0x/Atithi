
const ValidateAndSearch = ( AiOutput ) => {
    
    // Check for structure (JSON Parsing)
    let data ; 
    try {
        data = typeof AiOutput === 'string' ? JSON.parse(AiOutput) : AiOutput ;    
    }
    
    catch (error) {
        console.log("Validation Error: Invalid JSON"); 
        data = {} ; 
    }

    // Check the entities inside AiOutput 
    const cleanData = {
        city : typeof data.city === 'string' ? data.city.replace(/[^\w\s]/gi, '').trim() : null , 
        guest : data.guest ? parseInt(data.guest.toString().replace(/[^0-9]/g, '')) || null : null,
        maxPrice : data.maxPrice ? parseInt(data.maxPrice) : null , 
        category : 
            ["rooms", "villa", "farm house", "pool house", "shops" , "pg" , "flat" , "cabin"].includes(data.category?.toLowerCase())
            ? data.category.toLowerCase() : null , 
        amenities : Array.isArray(data.amenities)
        ? data.amenities.filter( itr => typeof itr === 'string' ).map( itr => itr.trim() )
        : [] 
    }; 

    // 3. logical fail safe 
    if( cleanData.maxPrice && cleanData.maxPrice < 0 ){
        cleanData.maxPrice = null ; 
    }
    
    if( cleanData.guest && cleanData.guest < 1 ){
        cleanData.guest = 1 ; 
    }

    return cleanData ; 
}

module.exports = ValidateAndSearch ; 