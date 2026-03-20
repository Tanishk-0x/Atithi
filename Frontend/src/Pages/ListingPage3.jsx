import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { RxCross2 } from "react-icons/rx";
import { userDataContext } from '../Context/UserContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { GiConfirmed } from "react-icons/gi";
import { IoPeopleSharp } from "react-icons/io5";
import Loader from '../Components/Loader'; 


const ListingPage3 = () => {

    const navigate = useNavigate() ; 

    const { serverUrl } = useContext(authDataContext); 
    const { userData , getUserDetails } = useContext(userDataContext); 

    const {
        title, 
        description,
        rent,
        city, 
        landmark,
        category, 
        frontEndImage1, 
        frontEndImage2, 
        frontEndImage3, 
        adding ,
        amenities , 
        HandleAddListing ,
        points , 
        maxGuestAllowed , 
    } = useContext(listingDataContext);

    const [showPopUp , setShowPopUp] = useState(false);
    const [phone , setPhone] = useState(''); 
    const [validating , setValidating] = useState(false);  

    // --------- Check Phone Validation ----------
    const addListing = () => {
        if( userData.phone ){
            HandleAddListing(); 
        }
        else{
            setShowPopUp(true); 
            toast.error("Phone number is not validated"); 
        }
    }

    // ---------- Add Phone No ----------
    const updatePhone = async () => {
        try {
            setValidating(true); 
            const phonestr = phone.toString(); 
            const res = await axios.post(serverUrl + '/user/addphone' , 
                {phone : phonestr} , {withCredentials : true}
            ); 
            toast.success("Phone Number Validated");
            setShowPopUp(false); 
            setValidating(false);
            getUserDetails(); 
        }
        
        catch (error) {
            console.log(`Error While Updating Phone no : ${error}`);
            toast.error("Error on updating phone no") ; 
            setValidating(false); 
        }
    }

  return (

    <div className='w-full h-full min-h-screen md:h-auto flex items-center justify-start md:justify-center gap-1 flex-col overflow-y-auto relative'>

        <div className='w-[95%] md:w-[90%] mt-2 md:mt-5 h-[55px] md:h-[70px] rounded-lg shadow-md shadow-gray-600 flex justify-between items-center px-4'>
            <div className='h-full flex justify-start items-center px-4 '>
                <p className='font-semibold text-[18px] md:text-[30px]'>In {landmark} , {city} </p>
            </div>
        
            <button onClick={() => navigate('/listingpage2')} className='bg-red-500 hidden md:block rounded-lg px-20 py-3 text-[white] text-[18px] font-semibold cursor-pointer hover:bg-red-600'>
                Back to Home
            </button>
        </div>
        
        <div className='w-[95%] md:w-[90%] h-[300px] md:h-[400px] flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 mt-1 md:mt-0'>
            <div className='h-[60%] md:h-[95%] w-[98%] md:w-[65%] flex items-center justify-center'>
                <img src={frontEndImage1} 
                className='w-full h-full md:w-full md:h-full object-cover rounded-lg'
                />
            </div>
        
            <div className='h-[40%] w-[98%] md:h-[95%] md:w-[32%] flex flex-row md:flex-col justify-center items-center gap-2 md:gap-3 '>
                <div className='h-[95%] w-[50%] md:h-[48%] md:w-[98%] '>
                    <img src={frontEndImage2} 
                    className='w-full h-full object-cover rounded-lg'
                    />
                </div>
        
                <div className='h-[95%] w-[50%] md:h-[48%] md:w-[98%] '>
                    <img src={frontEndImage3} 
                    className='w-full h-full object-cover rounded-lg'
                    />
                </div>
            </div>
        </div>
        
        <div className='w-[95%] md:w-[90%] h-[60px] rounded-lg shadow-sm shadow-gray-600 flex justify-between items-center gap-2 md:gap-0'>
            <div className='truncate h-full w-auto md:w-[80%] flex flex-col items-start justify-center px-4'>
                <p className='text-[18px] md:text-[24px]'>
                    {title.toUpperCase()} . {category.toUpperCase()}  
                </p>
                <p className='text-gray-800 text-[10px] md:text-[14px]'>
                    {landmark}
                </p>   
            </div>
        
            <div className='h-full w-auto md:w-[15%] flex items-center justify-center'>
                <p className='text-[18px] md:text-[24px] text-nowrap px-4'>
                    ₹{rent} /day
                </p>
            </div>       
        </div>
        
        <div className='w-[98%] h-auto md:w-[90%] md:h-[300px] flex items-center justify-center gap-2 flex-col md:flex-row'>
                  
            <div className='h-[95%] w-[95%] md:w-[50%] gap-2 flex items-start justify-center flex-col'>
        
                <div className='shadow-sm shadow-gray-500 rounded-lg overflow-y-auto w-full h-[200px] md:w-full md:h-[90%] flex justify-start items-start px-4 py-1 flex-col gap-1'>
                    <p className='font-semibold text-[18px] md:text-[22px]'>About This Property</p>
        
                    <p className='text-[16px] md:text-[20px] overflow-y-auto'>
                        {description}
                    </p>
                </div>
                    
                <div className='w-[98%] gap-2 h-[120px] md:h-[60px] flex items-center justify-center flex-col md:flex-row '>
                      
                    <div className='shadow-sm shadow-gray-500 rounded-lg w-[98%] md:w-[48%] h-[60px] flex items-center justify-center '>
                        <div className='text-[red] h-12 w-12 rounded-full border-2 border-red-500 flex items-center justify-center font-semibold text-[20px] bg-gray-300'>
                          {userData.name.slice(0,1).toUpperCase()}
                        </div>
                        <div className='flex flex-col ml-1'>
                          <div>Hosted by - {userData.name}</div>
                          <div>{userData.email}</div>
                        </div>
                    </div>
        
                    <div className='w-[98%] h-[60px] md:w-[48%] md:h-full shadow-sm shadow-gray-500 rounded-lg flex items-center justify-center'>
                        <div className='flex flex-row items-center justify-center text-xl gap-2'>
                          <IoPeopleSharp className='text-[28px]'/> Max Guest Allowed: {maxGuestAllowed} 
                        </div>
                    </div>
                </div>
        
            </div>
        
            <div className='w-[98%] h-auto md:h-[95%] md:w-[50%] flex rounded-lg items-center justify-center flex-col gap-2'>
                
                <div className='w-full flex justify-start items-center px-4'>
                    <p className='font-semibold text-[18px]'>
                        What it provides?
                    </p>
                </div>
            
                <div className='bg-gray-100 overflow-y-auto w-full h-[98%] flex flex-wrap gap-2 items-center justify-center px-3'>
                    {
                        amenities && amenities.length > 0 && 
                        <div className='mt-2 md:mt-0 w-full flex flex-wrap gap-2 overflow-auto'>
                            {
                                amenities.map((item) => (
                                    <div className='bg-gray-200 text-black rounded-lg text-[15px] p-2'>
                                        <span className='flex flex-row  items-center justify-center gap-1'> {item} <span className='text-green-700'><GiConfirmed/></span> </span> 
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>

                <div className='w-full flex justify-start items-center px-4'>
                    <p className='font-semibold text-[18px]'>
                        Points to be Noted
                    </p>
                </div>

                <div className='bg-gray-100 w-full flex gap-1 flex-col px-3 py-1'>
                    {
                        points.length > 0 && 
                        points.map((item) => (
                            <div className='w-[98%] rounded-lg flex items-center justify-start px-4 border border-gray-800 bg-gray-200 py-1'>
                                {item}
                            </div>
                        ))
                    }
                </div>
                
            </div>

        </div>


        <div className='w-[90%] h-[70px] mb-5 px-2 flex items-center justify-center md:justify-start'>
            <button disabled={adding} onClick={addListing} className='bg-[red] rounded-lg py-4 w-[280px] font-semibold text-[white] cursor-pointer hover:bg-red-600 flex text-center justify-center items-center'>
                {adding ? <Loader /> : 'Add Listing'}
            </button>
        </div>
        

        {/* ----------- Phone PopUp ------------ */}
        { showPopUp && 
            <div className='fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-md'>
                <div className='bg-gray-200 h-[250px] w-[90%] md:w-[500px] border-2 border-gray-400 flex justify-center px-8 flex-col gap-4 rounded-2xl relative shadow-2xl'>
                    <button onClick={() => setShowPopUp(false)} className='absolute top-2 right-3 bg-[red] rounded-full p-1 cursor-pointer'>
                        <RxCross2 />
                    </button>

                    <p className='text-[24px] font-semibold'> Validate Your Phone no </p>
                    
                    <input onChange={(e) => setPhone(e.target.value)}
                     type="number" name="phone" value={phone} placeholder='Enter phone number'  
                        className='w-[90%] bg-white text-black px-2 h-12 outline-none border-2 border-gray-700 rounded-lg '
                    />

                    <button onClick={updatePhone} 
                     className='h-12 w-[120px] bg-red-500 text-white rounded-lg border-red-900 cursor-pointer flex text-center justify-center items-center'>
                        { validating ? <Loader /> : 'Validate' }
                    </button>
                </div>
            </div>
        }

    </div>

  )
}

export default ListingPage3
