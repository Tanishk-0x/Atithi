import React, { createContext } from 'react'

// Create the context 
export const authDataContext = createContext() ; 

const AuthContext = ({children}) => {

    const serverUrl = "http://localhost:5000" ; 

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
