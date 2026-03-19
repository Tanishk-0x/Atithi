import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'; 
import { authDataContext } from '../Context/AuthContext'; 
import toast from 'react-hot-toast'; 

// Creating context
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

    // ---------- Add Review ----------
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
                setFeedback(" "); 
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

    // ---------- Get Reviews ----------
    const HandleGetReviews = async (id) => {
        try {
            const res = await axios.get(serverUrl + `/review/getreviews/${id}` , 
                { withCredentials: true }
            ); 

            if(res.data.success){
                toast.success("Reviews Fetched"); 
                setReviews(res.data.reviews);  
            }
        }
        
        catch (error) {
            toast.error("Error While Fetching Reviews"); 
            console.log(error);      
        }
    }

    // ---------- Fetch Reviews ----------
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


    // ---------- Summarize Reviews ------------
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
