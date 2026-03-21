import axios from 'axios';
import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import {authDataContext} from './AuthContext'; 
import toast from 'react-hot-toast'; 

// Creating context 
export const SearchDataContext = createContext(); 

const NaturalSearchContext = ({children}) => {

    const [searchListing , setSearchListings] = useState([]); 
    const [matchedListings , setMatchedListings] = useState(0); 
    const [searchQuery , setSearchQuery] = useState('');
    const [isSearching , setIsSearching] = useState(false); 
    const [searched , setSearched] = useState(false); 

    const {serverUrl} = useContext(authDataContext); 

    // ---------- Natural Search ----------
    const HandleNaturalSearch = async (searchquery) => {
        if(isSearching){
            return ; 
        }

        try {
            setSearched(false); 
            setIsSearching(true); 
            const res = await axios.get(serverUrl + 
                `/listing/naturalsearch?query=${searchquery}`
            ); 

            if(res.data.success){
                setSearchListings(res.data?.results); 
                setMatchedListings(res.data?.matchedListings);
                setSearchQuery(' '); 
                setSearched(true); 
            }
            setIsSearching(false); 
        }
        
        catch (error) {
            console.log(`Error In Natural Search : ${error}`); 
            toast.error("Error While Searching");
            setIsSearching(false); 
            setSearched(false); 
        }

        finally{
            setIsSearching(false); 
        }
    }

    const value = {
        HandleNaturalSearch , 
        searchListing , 
        isSearching , 
        searched , 
        matchedListings , 
        searchQuery , 
        setSearchQuery , 
    };

    return (

        <div>
        {/* ----- providing the value ----- */}
        <SearchDataContext.Provider value={value}>
            {children}
        </SearchDataContext.Provider>
        </div>

    )
}

export default NaturalSearchContext
