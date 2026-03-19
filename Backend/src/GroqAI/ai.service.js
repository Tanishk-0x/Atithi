const Groq = require('groq-sdk'); 
const Instructions = require('../Constants/instruction'); 

const groq = new Groq({
    apiKey : process.env.GROQ_API_KEY 
});

// setting the instruction based on requirement 
const SetSystemInstruction = async (flag) => {
    let system ;
    if( flag === '0'){
        system = Instructions.NaturalSearch ;  
    } 
    if( flag === '1' ){
        system = Instructions.DescriptionGeneration ; 
    }
    if( flag === '2' ){
        system = Instructions.SummaryGeneration ; 
    }
    return system ; 
}

const GenerateByGroq = async ( ques , flag ) => {
    try {
        const SystemInstruction = await SetSystemInstruction(flag);  

        const ChatCompletion = await groq.chat.completions.create({
            // Model ... llama-3.3-70b-versatile
            model : "llama-3.1-8b-instant" ,

            // Message ... 
            messages : [
                {
                    role : "system" ,
                    content : SystemInstruction ,
                            
                },
                {
                    role : "user" , 
                    content : ques 
                }
            ],

            
        }); 

        const result = (ChatCompletion.choices[0].message.content)

        return result ;
    }
    
    catch (error) { 
        console.log(`Error In Groq : ${error}`);
        throw error ;
    }
}

module.exports = GenerateByGroq ; 
