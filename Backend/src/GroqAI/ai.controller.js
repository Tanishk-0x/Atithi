const GenerateByGroq = require('./ai.service'); 

// ---------- Generate Content ----------
const GenerateContent = async ( searchquery , flag ) => {
    try {
        const response = await GenerateByGroq( searchquery , flag ) ; 

        const result = JSON.parse(response); 
        return result ; 
    }
    
    catch (error) {
        console.log(`Error : ${error}`)
        throw error ;
    }
}

module.exports = GenerateContent ; 