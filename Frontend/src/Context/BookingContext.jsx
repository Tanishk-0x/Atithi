import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext';
import { userDataContext } from './UserContext';
import { listingDataContext } from './ListingContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Create Context
export const bookingDataContext = createContext(); 

const BookingContext = ({children}) => {

    const navigate = useNavigate(); 

    const { serverUrl } = useContext(authDataContext);
    const { getUserDetails } = useContext(userDataContext);
    const { getListings } = useContext(listingDataContext);

    const [checkIn , setCheckIn] = useState("");
    const [checkOut , setCheckOut] = useState("");
    const [total , setTotal] = useState(0);
    const [night , setNight] = useState(0);
    const [bookingData , setBookingData] = useState([]); 
    const [booking , setBooking] = useState(false); 

    const [isCancelling , setIsCancelling] = useState(false); 

    // --------- Handle Booking ----------
    const HandleBooking = async (id) => {
        if(booking){
            return ; 
        }
         
        try {
            setBooking(true);
            const res = await axios.post(serverUrl + `/booking/create/${id}` , 
                {checkIn , checkOut , totalRent:total} ,
                {withCredentials : true}
            );
            await getUserDetails() ; 
            await getListings() ; 
            setBookingData(res.data.booking);
            toast.success(res.data.message);
            setBooking(false); 
            if(res.data.success){
                navigate('/waiting');
            }
        }
        
        catch (error) {
            console.log(error);  
            setBookingData(null);
            setBooking(false); 
            toast.error(error.response.data.message); 
        }
    }


    // --------- Cancel Booking ----------
    const CancelBooking = async (id) => {
        if(isCancelling){
            return ; 
        }

        try {
            setIsCancelling(true); 
            const res = await axios.put(serverUrl + `/booking/cancel/${id}` , 
               {} , { withCredentials : true }
            ); 

            if(res.data.success){
                getListings(); 
                getUserDetails(); 
                toast.success(res.data?.message);
                setIsCancelling(false); 
                navigate('/');  
            }
        }
        
        catch (error) {
            console.log(error); 
            toast.error(error.response?.data?.message);  
            setIsCancelling(false); 
        }

        finally{
            setIsCancelling(false);
        }
    }

    const value = {
        checkIn , setCheckIn ,
        checkOut , setCheckOut , 
        total , setTotal , 
        night , setNight , 
        bookingData , setBookingData , 
        HandleBooking , 
        CancelBooking , 
        isCancelling , 
        booking , setBooking
    };


    return (
        <div>
        {/* Providing the context / passing the value */}
        <bookingDataContext.Provider value={value}>
            {children}
        </bookingDataContext.Provider>
        </div>
    )

}

export default BookingContext
