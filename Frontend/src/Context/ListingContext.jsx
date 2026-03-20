import React, { createContext, useContext, useEffect, useState } from 'react'
import {authDataContext} from '../Context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'; 
import { useNavigate } from 'react-router-dom'; 

// Creating Context
export const listingDataContext = createContext() ; 

const ListingContext = ({children}) => {

    const navigate = useNavigate(); 

    const {serverUrl} = useContext(authDataContext); 

    const [title , setTitle] = useState(""); 
    const [description , setDescription] = useState(""); 
    const [rent , setRent] = useState(""); 
    const [city , setCity] = useState(""); 
    const [landmark , setLandmark] = useState(""); 
    const [category , setCategory] = useState("");

    const [frontEndImage1 , setFrontEndImage1] = useState(null); 
    const [frontEndImage2 , setFrontEndImage2] = useState(null); 
    const [frontEndImage3 , setFrontEndImage3] = useState(null); 

    const [backEndImage1 , setBackEndImage1] = useState(null);
    const [backEndImage2 , setBackEndImage2] = useState(null); 
    const [backEndImage3 , setBackEndImage3] = useState(null);
    
    const [amenities , setAmenities] = useState([]); 
    const [points , setPoints] = useState([]); 
    const [maxGuestAllowed , setMaxGuestAllowed] = useState(0); 

    const [listingData , setListingData] = useState([]); 
    const [newListingData , setNewListingData] = useState([]);
    const [cardDetails , setCardDetails] = useState(null); 
    const [mapUrl , setMapUrl] = useState(''); 

    const [page , setPage] = useState(1);
    const [totalPages , setTotalPages] = useState(1);  

    // Search 
    const [searchData , setSearchData] = useState([]); 

    const [adding , setAdding] = useState(false); 
    const [loading , setLoading] = useState(false);
    const [updating , setUpdating] = useState(false); 
    const [deleting , setDeleting] = useState(false); 

    // ---------- Add Listing -----------
    const HandleAddListing = async () => {
        if(adding){
            return ; 
        }

        try {
            // Formdata
            setAdding(true); 
            let formData = new FormData(); 

            formData.append("title" , title); 
            formData.append("description" , description);
            formData.append("rent" , rent );  
            formData.append("city" , city);
            formData.append("landmark" , landmark);
            formData.append("category" , category);
            formData.append("image1" , backEndImage1);
            formData.append("image2" , backEndImage2);
            formData.append("image3" , backEndImage3);
            formData.append("maxGuestAllowed" , maxGuestAllowed); 

            amenities.forEach((item) => {
                formData.append("amenities[]" , item);
            });

            points.forEach((item) => {
                formData.append("points[]" , item); 
            })

            // Calling
            const res = await axios.post(serverUrl + "/listing/add" , 
                formData , {withCredentials : true}
            ); 

            if(res.data.success){
                setTitle(""); 
                setDescription(""); 
                setFrontEndImage1(null);
                setFrontEndImage2(null);
                setFrontEndImage3(null);
                setBackEndImage1(null); 
                setBackEndImage2(null); 
                setBackEndImage3(null); 
                setRent(""); 
                setCity(""); 
                setLandmark(""); 
                setCategory("");  
                setAmenities(""); 

                toast.success(res.data.message); 
                navigate('/'); 
                setAdding(false); 
            }
            
        }

        catch (error) {
            toast.error("Error While Adding Listing!"); 
            console.log(error);
            setAdding(false);      
        }

        finally{
            setAdding(false); 
        }
    }

    // ---------- Get Listing ----------
    // Pagination 
    const getListings = async () => {
        try {
            setLoading(true); 
            const res = await axios.get(serverUrl + `/listing/get?page=${page}&limit=12` , 
                {withCredentials:true}
            );     
            if(res.data.success){
                setListingData(res.data.listing);
                setNewListingData(res.data.listing); 
                setTotalPages(res.data.totalPages); 
                setLoading(false); 
            }
        }

        catch (error) {
            console.log(error);  
            setLoading(false);    
        }

        finally{
            setLoading(false); 
        }
    }

    // ---------- Find Listing ------------
    const HandleViewCard = async (id) => {
        try {
            const res = await axios.get(
                serverUrl + `/listing/findlistingbyid/${id}` , 
                {withCredentials:true}
            );
            setCardDetails(res.data.listing);

            if(res.data.lat && res.data.lon){
                setMapUrl(`https://maps.google.com/maps?q=${res.data.lat},${res.data.lon}&t=&z=16&ie=UTF8&iwloc=near&output=embed`)
            }
            else{
                setMapUrl(`https://maps.google.com/maps?q=${res.data.listing.city}&t=&z=16&ie=UTF8&iwloc=near&output=embed`)
            }

            navigate('/viewcard');
        }
        
        catch (error) {
            console.log(error);  
            toast.error("Error While Fetching Listing");    
        }
    }

    // ---------- Handle Search ----------
    const HandleSearch = async (data) => {
        try {
            const res = await axios.get(serverUrl + 
                `/listing/search?query=${data}`
            ); 
            setSearchData(res.data.listing);  
        }
        
        catch (error) {
            console.log(error);     
            setSearchData(null); 
        }
    }

    // ------ UseEffect ------
    useEffect(() => {
        getListings(); 
    },[adding , updating , deleting , page]);


    const value = {
        title,setTitle , 
        description,setDescription , 
        rent,setRent , 
        city,setCity , 
        landmark,setLandmark , 
        category,setCategory , 
        frontEndImage1,setFrontEndImage1 , 
        frontEndImage2,setFrontEndImage2 , 
        frontEndImage3,setFrontEndImage3 , 
        backEndImage1,setBackEndImage1 , 
        backEndImage2,setBackEndImage2 , 
        backEndImage3,setBackEndImage3 ,
        amenities , setAmenities ,
        points , setPoints , 
        maxGuestAllowed , setMaxGuestAllowed ,

        mapUrl , 
        page , setPage , 
        totalPages , 
        
        loading , setLoading ,
        adding ,
        updating , setUpdating , 
        deleting , setDeleting ,

        listingData , setListingData ,
        newListingData , setNewListingData ,
        cardDetails , setCardDetails ,
        searchData , setSearchData ,

        getListings , 
        HandleAddListing , 
        HandleViewCard ,
        HandleSearch , 
    }; 

    return (
        <div>
            {/* // Providing the context */}
            <listingDataContext.Provider value={value} >
                {children}
            </listingDataContext.Provider>
        </div>
    )
}


export default ListingContext
