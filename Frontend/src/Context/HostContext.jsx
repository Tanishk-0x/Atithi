import React, { createContext, useContext, useState } from 'react'
import axios from 'axios';
import { authDataContext } from './AuthContext';
import toast from 'react-hot-toast';

// create context 
export const hostDataContext = createContext();


const HostContext = ({children}) => {

    const { serverUrl } = useContext(authDataContext); 

    const [isApproving , setIsApproving] = useState(false); 
    const [isGettingData , setIsGettingData] = useState(false); 
    const [isCheckIn , setIsCheckIn] = useState(false); 

    const [pending , setPending] = useState([]); 
    const [approved , setApproved] = useState([]); 
    const [ongoing , setOngoing] = useState([]); 

    // Host Dashboard Data ...
    const getHostData = async () => {
        try {
            setIsGettingData(true); 
            const res = await axios.get(serverUrl + "/booking/gethostdata" , 
                {withCredentials : true} 
            );

            if( res.data?.success ){
                const result = res.data.data ; 
                setPending(result?.pending || []); 
                setApproved(result?.approved || []); 
                setOngoing(result?.ongoing || []); 
            }

            console.log("Dashboard Data: " , res.data);  
        }
        
        catch (error) {
            console.error("Fetch Error: " , error); 
            toast.error("An Error While Approving!");
        }
        finally{
            setIsGettingData(false); 
        }
    }

    // Approve Booking ... 
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

    // CheckIn ...
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
            }
        }
        
        catch (error) {
            console.error("CheckIn Error:" ,error);
            toast.error(error.response.data.message);
        }

        finally{
            setIsCheckIn(false); 
        }
    }

    let value = {
        getHostData ,
        pending , 
        approved , 
        ongoing ,
        approveBooking ,
        isApproving , 
        isGettingData , 
        CheckInBooking , 
        isCheckIn , 
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
