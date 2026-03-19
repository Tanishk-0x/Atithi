import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'; 
import { authDataContext } from '../Context/AuthContext'; 
import toast from 'react-hot-toast'; 


// creating context
export const reviewDataContext = createContext(); 

const ReviewContext = ({children}) => {

    const { serverUrl } = useContext(authDataContext); 

    const [feedback , setFeedback] = useState(''); 
    const [rating , setRating] = useState(3); 
    const [isAddingReview , setIsAddingReview] = useState(false); 
    const [reviews , setReviews] = useState([]);
    const [reviewsHost , setReviewsHost] = useState([]);  
    const [summarized , setSummarized] = useState({}); 
    const [isSummarizing , setIsSummarizing] = useState(false); 

    const HandleAddReview = async (id) => {
        if(isAddingReview){
            return ; 
        }
        try {
            setIsAddingReview(true); 
            const res = await  axios.post(serverUrl + `/review/addreview/${id}` , 
                { feedback , rating } , { withCredentials: true }
            );


            if(res.data.success){
                toast.success("Thanks For Your Feedback"); 
            }
        
        }
        
        catch (error) {
            toast.error("Error While Adding Review"); 
            console.log(error); 
        }

        finally{
            setIsAddingReview(false); 
        }
    }

    const HandleGetReviews = async (id) => {
        try {
            const res = await axios.get(serverUrl + `/review/getreviews/${id}` , 
                { withCredentials: true }
            ); 

            if(res.data.success){
                toast.success("Reviews Fetched"); 
                setReviews(res.data.reviews); 
                console.log("REVIEWS : " , res.data.reviews); 
            }
        }
        
        catch (error) {
            toast.error("Error While Fetching Reviews"); 
            console.log(error);      
        }
    }


    const FetchReviews = async () => {
        try {
            const res = await axios.get(serverUrl + '/review/fetchreviews' , 
                { withCredentials: true}
            ); 

            if(res.data.success){
                setReviewsHost(res.data.reviews); 
                toast.success("Reviews Fetched"); 
            }
        }
        
        catch (error) {
            toast.error("Error While Fetching Reviews!"); 
            console.log(error); 
        }
    }

    const SummarizeReviews = async (id) => {
        if(isSummarizing){
            return ; 
        }

        try {
            setIsSummarizing(true); 
            const res = await axios.get(serverUrl + `/review/summarize/${id}`); 

            if(res.data.success){
                toast.success("Reviews Summarized!"); 
                setSummarized(res.data?.summmarized); 
                console.log("Summarized: " , res.data?.summarized); 
            }
            setIsSummarizing(false); 
        }
        
        catch (error) {
            toast.error("Error While Summarizing Reviews!"); 
            setIsSummarizing(false); 
            console.log(error); 
        }
        finally{
            setIsSummarizing(false); 
        }
    }

    const value = {
        feedback , setFeedback , 
        rating , setRating , 
        isAddingReview , 
        HandleAddReview , 
        HandleGetReviews , 
        reviews , 
        FetchReviews , 
        reviewsHost , 

        SummarizeReviews , 
        isSummarizing , 
        summarized , 
    }; 

    return (
        <div>
        {/* Provide the value */}
        <reviewDataContext.Provider value={value}>
            {children}
        </reviewDataContext.Provider>
        </div>
    )
}

export default ReviewContext
