const mongoose = require('mongoose') ; 
const Mongo_Url = process.env.MONGO_URL ; 

exports.dbConnect = async () => {

    await mongoose.connect(Mongo_Url)
    .then(() => {
        console.log("DB Connected SuccessFully✅"); 
    })
    .catch((error) => {
        console.log("Error in DB Connection : " , error);
    })

}