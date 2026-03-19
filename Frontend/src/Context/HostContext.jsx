import React, { createContext, useContext, useState } from 'react'
import axios from 'axios';
import { authDataContext } from './AuthContext';
import toast from 'react-hot-toast';

// create context 
export const hostDataContext = createContext();

const HostContext = ({children}) => {

    const { serverUrl } = useContext(authDataContext); 

    // Loading 
    const [isApproving , setIsApproving] = useState(false); 
    const [isGettingData , setIsGettingData] = useState(false); 
    const [isCheckIn , setIsCheckIn] = useState(false); 
    const [isComplete , setIsComplete] = useState(false); 
    const [isReject , setIsReject] = useState(false); 

    // Bookings 
    const [allBookings , setAllBookings] = useState([]); 
    const [pending , setPending] = useState([]); 
    const [approved , setApproved] = useState([]); 
    const [ongoing , setOngoing] = useState([]); 
    const [completed , setCompleted] = useState([]); 

    // Revenue Stats 
    const [revenueStats , setRevenueStats] = useState([]); 
    const [totalRevenue , setTotalRevenue] = useState(0); 
    const [totalBookings , setTotalBookings] = useState(0); 


    // ---------- Get Host Data -----------
    // Host Dashboard Data ...
    const getHostData = async () => {
        try {
            setIsGettingData(true); 
            const res = await axios.get(serverUrl + "/booking/gethostdata" , 
                {withCredentials : true} 
            );

            if( res.data?.success ){
                const result = res.data.data ; 
                setAllBookings(result?.bookings || []); 
                setCompleted(result?.completed || []); 
                setPending(result?.pending || []); 
                setApproved(result?.approved || []); 
                setOngoing(result?.ongoing || []); 

                setRevenueStats(res.data?.revenueStats); 
                setTotalRevenue(res.data?.totalRevenue); 
                setTotalBookings(res.data?.totalBookings); 

            }

        }
        
        catch (error) {
            console.error("Fetch Error: " , error); 
            toast.error("An Error While Fetching Data!");
        }
        finally{
            setIsGettingData(false); 
        }
    }

    // --------- Approve Booking ----------
    const approveBooking = async (id) => {
        if(isApproving){
            return ; // to prevent double click 
        }

        try {
            setIsApproving(true); 
            const res = await axios.put(serverUrl + `/booking/approve/${id}` , 
               {} , {withCredentials : true} 
            ); 

            if(res.data.success){
                toast.success("Approved"); 
                await getHostData(); // refresh the page 
            }
        }

        catch (error) {
            console.error("Approval Error:" ,error);
            toast.error("Error While Approving"); 
        }
        finally{
            isApproving(false); 
        }
    }

    // ---------- CheckIn Booking ----------
    const CheckInBooking = async (id , passcode) => {
        if(isCheckIn){
            return ; 
        }
        try {
            setIsCheckIn(true); 
            const res = await axios.put(serverUrl + `/booking/checkin/${id}` , 
                { passcode : passcode } , {withCredentials : true}
            ); 

            if(res.data.success){
                toast.success("CheckInned!"); 
                await getHostData(); 
                setIsCheckIn(false); 
            }
        }
        
        catch (error) {
            console.error("CheckIn Error:" ,error);
            toast.error(error.response.data.message);
            setIsCheckIn(false); 
        }

        finally{
            setIsCheckIn(false); 
        }
    }

    // --------- Complete Booking ----------
    const CompleteBooking = async (id) => {
        if(isComplete){
            return ; 
        }
        try {
            setIsComplete(true); 
            const res = await axios.put(serverUrl + `/booking/complete/${id}` , 
                { withCredentials: true }
            );

            if(res.data.success){
                toast.success("Marked Completed"); 
                await getHostData(); 
                setIsComplete(false);
            }
        }
        
        catch (error) {
            console.error("Completing Error:" ,error);
            toast.error("Error While Marking Complete!");
            setIsComplete(false);
        }

        finally{
            setIsComplete(false); 
        }
    }

    // --------- Reject Request ---------- 
    const RejectBooking = async (id) => {
        if(isReject){
            return ; 
        }

        try {
            setIsReject(true); 
            const res = await axios.put(serverUrl + `/booking/reject/${id}` , 
                { withCredentials : true }
            );

            if(res.data.success){
                toast.success("Rejected SuccessFully"); 
                await getHostData(); 
                setIsReject(false);
            }
        }
        
        catch (error) {
            console.error("Rejecting Error:" ,error);
            toast.error("Error While Rejecting Booking!");
            setIsReject(false);
        }

        finally{
            setIsReject(false); 
        }
    }

    let value = {
        getHostData ,
        pending , 
        approved , 
        ongoing ,
        allBookings ,
        completed ,  
        approveBooking ,
        isApproving , 
        isGettingData , 
        CheckInBooking , 
        isCheckIn , 
        CompleteBooking , 
        isComplete , 
        RejectBooking , 
        isReject , 

        revenueStats , 
        totalRevenue , 
        totalBookings ,
    }; 

    return (
        <div>
            {/* // providing the value */}
            <hostDataContext.Provider value={value}>
                {children}
            </hostDataContext.Provider>
        </div>
    )
}

export default HostContext
