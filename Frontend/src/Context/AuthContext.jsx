import React, { createContext } from 'react'

// Create the context 
export const authDataContext = createContext() ; 

const AuthContext = ({children}) => {

    const serverUrl = "https://atithi-backend.vercel.app" ; 

    let value = {
        serverUrl
    }

  return (
    <div>
        {/* Provide the value */}
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
