const express = require('express') ; 
require('dotenv').config() ; 
require('./src/Config/database').dbConnect() ; 
const authRoutes = require('./src/Routes/authRoutes') ;
const userRoutes = require('./src/Routes/userRoutes') ; 
const listingRoutes = require('./src/Routes/listingRoutes') ; 
const bookingRoutes = require('./src/Routes/bookingRoutes');
const reviewRoutes = require('./src/Routes/reviewRoutes'); 
const aiRoutes = require('./src/GroqAI/ai.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors') ;

const app = express() ; 
const Port = process.env.PORT ; 

//Setup Cors
app.use(cors({
    origin : [
        "http://localhost:5173" , 
        process.env.FRONTEND_URL  
    ] , 
    methods : ["GET" , "POST" , "PUT" , "DELETE" , "PATCH"] ,
    credentials : true
}));

app.use(cookieParser());
app.use(express.json()); 

app.set("trust proxy", 1);

//Mounting
app.use('/auth' , authRoutes);
app.use('/user' , userRoutes);
app.use('/listing' , listingRoutes); 
app.use('/booking' , bookingRoutes); 
app.use('/review' , reviewRoutes); 
app.use('/ai' , aiRoutes); 

//Starting Server
app.listen(Port , () => {
    console.log(`Server Started SuccessFully At Port : ${Port}✅`)
});