import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {authDataContext} from './AuthContext'; 
import axios from 'axios';

// Creating context
export const userDataContext = createContext() ;

const UserContext = ({children}) => {

    const {serverUrl} = useContext(authDataContext)

    const [userData , setUserData] = useState(null) ; 

    // ---------- Get User Detail -----------
    const getUserDetails = async () => {
      try {
        const res = await axios.get(serverUrl + "/user/getuser" 
          , {withCredentials:true});
        setUserData(res.data.user);
      }

      catch (error) {
        setUserData(null); 
        console.log(error); 
      }
    }

    // ------ UseEffect -------
    useEffect(() => {
        getUserDetails() ; 
    },[]);


    const value = {
        userData , 
        setUserData , 
        getUserDetails
    };

  return (

    <div>
      <userDataContext.Provider value={value} >
        {children}
      </userDataContext.Provider>
    </div>

  )
}

export default UserContext
