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

    <div className='w-full h-full min-h-screen md:h-auto flex items-center justify-start md:justify-center gap-2.5 flex-col overflow-y-auto relative'>

        <style>{`
        @keyframes fadeUp {
            from { transform: translateY(16px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.96); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .fade-up { animation: fadeUp 0.5s ease-out both; }
        .fade-in { animation: fadeIn 0.6s ease-out both; }
        .scale-in { animation: scaleIn 0.5s ease-out both; }
        `}</style>

        <div className='w-[95%] md:w-[90%] mt-2 md:mt-5 h-[55px] md:h-[70px] rounded-2xl bg-white shadow-md shadow-gray-300 border border-gray-100 flex justify-between items-center px-4 fade-up'>
            <div className='h-full flex justify-start items-center px-4 '>
                <p className='font-semibold text-[18px] md:text-[28px] text-gray-900 flex items-center gap-2'>
                    <span className='w-1.5 h-6 bg-red-600 rounded-full hidden md:inline-block'></span>
                    In {landmark} , {city} 
                </p>
            </div>
        
            <button onClick={() => navigate('/listingpage2')} className='bg-linear-to-r from-red-600 to-red-500 hidden md:flex items-center justify-center rounded-full px-10 py-3 text-[white] text-[16px] font-semibold cursor-pointer shadow-md shadow-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 active:scale-95'>
                Back to Home
            </button>
        </div>
        
        <div className='w-[95%] md:w-[90%] h-[300px] md:h-[400px] flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 mt-3 md:mt-4 scale-in'>
            <div className='h-[60%] md:h-[95%] w-[98%] md:w-[65%] flex items-center justify-center overflow-hidden rounded-2xl shadow-md shadow-gray-300 group'>
                <img src={frontEndImage1} 
                className='w-full h-full md:w-full md:h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105'
                />
            </div>
        
            <div className='h-[40%] w-[98%] md:h-[95%] md:w-[32%] flex flex-row md:flex-col justify-center items-center gap-2 md:gap-3 '>
                <div className='h-[95%] w-[50%] md:h-[48%] md:w-[98%] overflow-hidden rounded-2xl shadow-md shadow-gray-300 group'>
                    <img src={frontEndImage2} 
                    className='w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110'
                    />
                </div>
        
                <div className='h-[95%] w-[50%] md:h-[48%] md:w-[98%] overflow-hidden rounded-2xl shadow-md shadow-gray-300 group'>
                    <img src={frontEndImage3} 
                    className='w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110'
                    />
                </div>
            </div>
        </div>
        
        <div className='w-[95%] md:w-[90%] h-auto md:h-[70px] py-3 md:py-0 rounded-2xl bg-white shadow-sm shadow-gray-300 border border-gray-100 flex justify-between items-center gap-2 md:gap-0 mt-3 fade-up'>
            <div className='truncate h-full w-auto md:w-[80%] flex flex-col items-start justify-center px-4'>
                <p className='text-[17px] md:text-[22px] font-bold text-gray-900 truncate'>
                    {title.toUpperCase()} <span className='text-red-500'>.</span> {category.toUpperCase()}  
                </p>
                <p className='text-gray-500 text-[11px] md:text-[13px]'>
                    {landmark}
                </p>   
            </div>
        
            <div className='h-full w-auto md:w-[20%] flex items-center justify-center'>
                <p className='text-[18px] md:text-[24px] text-nowrap mr-4 font-bold text-red-600'>
                    ₹{rent} <span className='text-gray-400 text-[13px] md:text-[15px] font-medium'>/day</span>
                </p>
            </div>       
        </div>
        
        <div className='w-[98%] h-auto md:w-[90%] md:h-[300px] flex items-center justify-center gap-4 flex-col md:flex-row mt-4'>
                
            <div className='h-[95%] w-[95%] md:w-[50%] gap-3 flex items-start justify-center flex-col'>
        
                <div className='bg-white shadow-sm shadow-gray-300 border border-gray-100 rounded-2xl overflow-y-auto w-full h-[200px] md:w-full md:h-[90%] flex justify-start items-start px-5 py-3 flex-col gap-1'>
                    <p className='font-bold text-[17px] md:text-[20px] text-gray-900 flex items-center gap-2'>
                        <span className='w-1.5 h-5 bg-red-600 rounded-full'></span>
                        About This Property
                    </p>
        
                    <p className='text-[14px] md:text-[16px] leading-relaxed text-gray-600 overflow-y-auto'>
                        {description}
                    </p>
                </div>
                    
                <div className='w-[98%] gap-2 h-[120px] md:h-[60px] flex items-center justify-center flex-col md:flex-row '>
                    
                    <div className='bg-white shadow-sm shadow-gray-300 border border-gray-100 rounded-2xl w-[98%] md:w-[48%] h-[60px] flex items-center justify-center gap-2 px-2 transition-all duration-300 hover:shadow-md hover:border-red-200'>
                        <div className='text-[red] h-11 w-11 shrink-0 rounded-full border-2 border-red-500 flex items-center justify-center font-bold text-[18px] bg-red-50'>
                        {userData.name.slice(0,1).toUpperCase()}
                        </div>
                        <div className='flex flex-col ml-1 overflow-hidden'>
                        <div className='text-[13px] font-semibold text-gray-800 truncate'>Hosted by {userData.name}</div>
                        <div className='text-[11px] text-gray-400 truncate'>{userData.email}</div>
                        </div>
                    </div>
        
                    <div className='bg-white w-[98%] h-[60px] md:w-[48%] md:h-full shadow-sm shadow-gray-300 border border-gray-100 rounded-2xl flex items-center justify-center transition-all duration-300 hover:shadow-md hover:border-red-200'>
                        <div className='flex flex-row items-center justify-center text-[15px] font-semibold text-gray-800 gap-2'>
                        <IoPeopleSharp className='text-[24px] text-red-500'/> Max Guest Allowed: {maxGuestAllowed} 
                        </div>
                    </div>
                </div>
        
            </div>
        
            <div className='w-[98%] h-auto md:h-[95%] md:w-[50%] flex rounded-2xl items-center justify-center flex-col gap-2'>
                
                <div className='w-full h-full px-5 py-4 bg-white rounded-2xl shadow-sm shadow-gray-300 border border-gray-100'>
                    <p className='font-bold text-[18px] text-gray-900 flex items-center gap-2 mt-1'>
                        <span className='w-1.5 h-5 bg-red-600 rounded-full'></span>
                        What it provides?
                    </p>

                    <div>
                        {
                            amenities && amenities.length > 0 && 
                            <div className='mt-3 w-full flex flex-wrap gap-2 overflow-auto'>
                                {
                                    amenities.map((item) => (
                                        <div className='bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-[13px] px-3 py-1.5 transition-all duration-300 hover:bg-red-50 hover:border-red-200 hover:text-red-600'>
                                            <span className='flex flex-row  items-center justify-center gap-1.5'> {item} <span className='text-green-600'><GiConfirmed/></span> </span> 
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>

                    <p className='font-bold text-[18px] text-gray-900 flex items-center gap-2 mt-4'>
                        <span className='w-1.5 h-5 bg-red-600 rounded-full'></span>
                        Points to be Noted
                    </p>

                    <div className='text-[14px] md:text-[15px] text-gray-600 mt-1 flex flex-col gap-1'>
                        {
                            points.length > 0 && 
                            points.map((item) => (
                                <div className='flex items-start gap-2'>
                                    <span className='text-red-400 mt-1'>•</span> {item}
                                </div>
                            ))
                        }
                    </div>
                </div>
                
            </div>

        </div>


        <div className='w-[90%] h-[70px] mb-5 px-2 flex items-center justify-center md:justify-start'>
            <button disabled={adding} onClick={addListing} className='bg-linear-to-r from-red-600 to-red-500 rounded-2xl py-4 w-[280px] font-semibold text-[white] cursor-pointer shadow-md shadow-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 active:scale-95 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-md disabled:cursor-not-allowed flex text-center justify-center items-center'>
                {adding ? <Loader /> : 'Add Listing'}
            </button>
        </div>
        

        {/* ----------- Phone PopUp ------------ */}
        { showPopUp && 
            <div className='fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-md fade-in'>
                <div className='bg-white h-[250px] w-[90%] md:w-[500px] border border-gray-100 flex justify-center px-8 flex-col gap-4 rounded-2xl relative shadow-2xl scale-in'>
                    <button onClick={() => setShowPopUp(false)} className='absolute top-2 right-3 bg-linear-to-r from-red-600 to-red-500 rounded-full p-1 cursor-pointer text-white shadow-sm shadow-red-500/30 transition-all duration-300 hover:scale-105 active:scale-95'>
                        <RxCross2 />
                    </button>

                    <p className='text-[24px] font-bold text-gray-900 flex items-center gap-2'>
                        <span className='w-1.5 h-6 bg-red-600 rounded-full'></span>
                        Validate Your Phone no
                    </p>
                    
                    <input onChange={(e) => setPhone(e.target.value)}
                    type="number" name="phone" value={phone} placeholder='Enter phone number'  
                        className='w-[90%] bg-white text-black px-2 h-12 outline-none border-2 border-gray-200 focus:border-red-400 rounded-xl transition-all duration-300'
                    />

                    <button onClick={updatePhone} 
                    className='h-12 w-[120px] bg-linear-to-r from-red-600 to-red-500 text-white rounded-xl cursor-pointer shadow-md shadow-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 active:scale-95 flex text-center justify-center items-center'>
                        { validating ? <Loader /> : 'Validate' }
                    </button>
                </div>
            </div>
        }

    </div>

  )
}

export default ListingPage3
