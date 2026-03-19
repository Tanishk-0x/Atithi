import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import {toast} from 'react-hot-toast'
import { IoStar } from "react-icons/io5";
import { bookingDataContext } from '../Context/BookingContext';
import { GiConfirmed } from "react-icons/gi";
import { FaWhatsapp } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoPeopleSharp } from "react-icons/io5";
import { IoSadOutline } from "react-icons/io5";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { BsEmojiNeutral } from "react-icons/bs";
import { IoHappyOutline } from "react-icons/io5";
import { PiSparkleLight } from "react-icons/pi";
import { IoIosStar } from "react-icons/io";
import Loader from '../Components/Loader'; 
import { HiOutlineEmojiHappy } from "react-icons/hi";



import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { reviewDataContext } from '../Context/reviewContext';

const ViewCard = () => {

  const navigate = useNavigate(); 

  const { serverUrl } = useContext(authDataContext);
  const { cardDetails , updating , setUpdating , deleting , setDeleting , mapUrl} = useContext(listingDataContext);
  const { userData } = useContext(userDataContext);

  const { 
    feedback , setFeedback , 
    rating , setRating , 
    isAddingReview , 
    HandleAddReview ,
    HandleGetReviews , 
    reviews , 
    SummarizeReviews , 
    isSummarizing , 
    summarized , 
  } = useContext(reviewDataContext); 

  const [showUpdatePopUp , setShowUpdatePopUp] = useState(false);
  const [showBookingPopUp , setShowBookingPopUp] = useState(false); 
  const [showReviewPopUp , setShowReviewPopUp] = useState(false); 
  const [showSummarizePopUp , setShowSummarizePopUp] = useState(false); 
  
  const [title , setTitle] = useState(cardDetails.title); 
  const [description , setDescription] = useState(cardDetails.description); 
  const [rent , setRent] = useState(cardDetails.rent); 
  const [city , setCity] = useState(cardDetails.city); 
  const [landmark , setLandmark] = useState(cardDetails.landmark); 
  const [backEndImage1 , setBackEndImage1] = useState(null);
  const [backEndImage2 , setBackEndImage2] = useState(null); 
  const [backEndImage3 , setBackEndImage3] = useState(null); 

  const [minDate , setMinDate] = useState(null);
  const {
    checkIn , setCheckIn ,
    checkOut , setCheckOut , 
    total , setTotal , 
    night , setNight , 
    HandleBooking , 
    booking , 
  } = useContext(bookingDataContext) ; 

  // Handle Minimum Date To Choose 
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0] ; 
    setMinDate(today); // min={minDate}
  },[]);


  // Handle TotalRent 
  useEffect(() => {

    if(checkIn && checkOut){
      const InDate = new Date(checkIn);
      const OutDate = new Date(checkOut);
      const n = (OutDate - InDate) / (24*60*60*1000) ; 
      setNight(n); 

      // Platform Charges (7%)
      const platfromCharges = (cardDetails.rent * (7/100));
      // Tax (8%)
      const tax = (cardDetails.rent * (8/100));
      
      if(n > 0){
        setTotal((cardDetails.rent * n) + platfromCharges + tax); 
      }
      else{
        setTotal(0);
      }
    }

  },[checkIn , checkOut , cardDetails.rent , total]);
  

  const HandleUpdateListing = async () => {
        setUpdating(true);
        try { 
            // Formdata
            let formData = new FormData(); 
 
            formData.append("title" , title); 
            formData.append("description" , description);
            formData.append("rent" , rent );  
            formData.append("city" , city);
            formData.append("landmark" , landmark);
            if(backEndImage1){
              formData.append("image1" , backEndImage1);
            }
            if(backEndImage2){
              formData.append("image2" , backEndImage2);
            }
            if(backEndImage3){
              formData.append("image3" , backEndImage3);
            }
            // Calling
            const res = await axios.post(serverUrl + `/listing/update/${cardDetails._id}` , 
                formData , {withCredentials : true}
            ); 
            setTitle(""); 
            setDescription(""); 
            setRent(""); 
            setCity(""); 
            setLandmark(""); 

            toast.success(res.data.message); 
            setUpdating(false); 
            navigate('/'); 
        }

        catch (error) {
            toast.error('Error While Updating');
            setUpdating(false); 
        }
  }

  // Image Handlers 
  const handleImage1 = (e) => {
    let file = e.target.files[0]; 
    setBackEndImage1(file);
  }

  const handleImage2 = (e) => {
    let file = e.target.files[0]; 
    setBackEndImage2(file);
  }

  const handleImage3 = (e) => {
    let file = e.target.files[0]; 
    setBackEndImage3(file);
  }

  // Delete Listing
  const HandleDeleteListing = async () => {
    setDeleting(true); 
    try {
      const res = await axios.delete(serverUrl + `/listing/deletelistingbyid/${cardDetails._id}` , 
        {withCredentials : true}
      ); 
      console.log(res.data); 
      toast.success(res.data.message); 
      setDeleting(false); 
      navigate('/'); 
    }
    
    catch (error) {
      console.log(error);  
      toast.error('Error While Deleting'); 
      setDeleting(false); 
    }
  }

  // Handle Whatsapp Connect 
  const HandleWhatsappConnect = (phone , title) => {
    const phoneno = Number(phone); 
    // create message , embeded url , redirect 
    toast.success("Redirecting to whatsapp"); 
    const msg = `Hi! I'm interested in these listing: ${title} . Is it available? ` ; 
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}` ; 
    window.open(url , "_blank") ; 
  }

  // ----------- Date Handle --------------

  const [startDate , setStartDate] = useState(null); 
  const [endDate , setEndDate] = useState(null); 
  const [bookedIntervals , setBookedIntervals] = useState([]); 

    useEffect(() => {

      // function to fetch dates 
      const fetchBusyDates = async () => {
        const res = await axios.get(serverUrl + 
           `/booking/fetchdates/${cardDetails._id}`); 
        
        const formattedDates = res.data.dates.map( itr => ({
          start : new Date(itr.checkIn) , 
          end : new Date(itr.checkOut) 
        }));

        setBookedIntervals(formattedDates); 
      }

      fetchBusyDates(); 

    }, [cardDetails._id]); 


  // --------- Handle FetchReviews ----------- 
  useEffect(() => {
    HandleGetReviews(cardDetails._id); 
  },[]); 

  // -----------------------------------------

  return (

    <div className='w-full h-full min-h-screen md:h-auto flex items-center justify-start md:justify-center gap-2.5 flex-col overflow-y-auto relative'>
          

        <div className='w-[95%] md:w-[90%] mt-2 md:mt-5 h-[55px] md:h-[70px] rounded-lg shadow-md shadow-gray-600 flex justify-between items-center px-4'>
          <div className='h-full flex justify-start items-center px-4 '>
            <p className='font-semibold text-[18px] md:text-[30px]'>In {cardDetails.landmark}, {cardDetails.city}</p>
          </div>

          <button className='bg-red-500 hidden md:block rounded-lg px-20 py-3 text-[white] text-[18px] font-semibold cursor-pointer hover:bg-red-600'>
            Back to Home
          </button>
        </div>

        <div className='w-[95%] md:w-[90%] h-[300px] md:h-[400px] flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 mt-1 md:mt-0'>
          <div className='h-[60%] md:h-[95%] w-[98%] md:w-[65%] flex items-center justify-center'>
            <img src={cardDetails.image1} 
            className='w-full h-full md:w-full md:h-full object-cover rounded-lg'
            />
          </div>

          <div className='h-[40%] w-[98%] md:h-[95%] md:w-[32%] flex flex-row md:flex-col justify-center items-center gap-2 md:gap-3 '>
            <div className='h-[95%] w-[50%] md:h-[48%] md:w-[98%] '>
              <img src={cardDetails.image2} 
              className='w-full h-full object-cover rounded-lg'
              />
            </div>

            <div className='h-[95%] w-[50%] md:h-[48%] md:w-[98%] '>
              <img src={cardDetails.image3} 
              className='w-full h-full object-cover rounded-lg'
              />
            </div>
          </div>
        </div>

        <div className='w-[95%] md:w-[90%] h-[60px] rounded-lg shadow-sm shadow-gray-600 flex justify-between items-center gap-2 md:gap-0'>
          <div className='truncate h-full w-auto md:w-[80%] flex flex-col items-start justify-center px-4'>
            <p className='text-[18px] md:text-[24px]'>
              {cardDetails.title.toUpperCase()} . {cardDetails.category.toUpperCase()}  
            </p>
            <p className='text-gray-800 text-[10px] md:text-[14px]'>
              {cardDetails.landmark}
            </p>   
          </div>

          <div className='h-full w-auto md:w-[15%] flex items-center justify-center'>
            <p className='text-[18px] md:text-[24px] text-nowrap mr-3'>
              ₹{cardDetails.rent} /day
            </p>
          </div>
          
        </div>

        <div className='w-[98%] h-auto md:w-[90%] md:h-[300px] flex items-center justify-center gap-4 flex-col md:flex-row'>
          
          <div className='h-[95%] w-[95%] md:w-[50%] gap-3 flex items-start justify-center flex-col'>

            <div className='bg-[#FAF9F6] shadow-sm shadow-gray-500 rounded-lg overflow-y-auto w-full h-[200px] md:w-full md:h-[90%] flex justify-start items-start px-4 py-1 flex-col gap-1'>
              <p className='font-semibold text-[18px] md:text-[22px]'>About This Property</p>

              <p className='text-[16px] md:text-[20px] overflow-y-auto'>
                {cardDetails.description}
              </p>
            </div>
            
            <div className='w-[98%] gap-2 h-[120px] md:h-[60px] flex items-center justify-center flex-col md:flex-row '>
              
              <div className='bg-[#FAF9F6] shadow-sm shadow-gray-500 rounded-lg w-[98%] md:w-[48%] h-[60px] flex items-center justify-center '>
                <div className='text-[red] h-12 w-12 rounded-full border-2 border-red-500 flex items-center justify-center font-semibold text-[20px] bg-gray-300'>
                  T
                </div>
                <div className='flex flex-col ml-1'>
                  <div>Hosted by - {cardDetails.host?.name}</div>
                  <div>{cardDetails.host?.email}</div>
                </div>
              </div>

              <div className='bg-[#FAF9F6] w-[98%] h-[60px] md:w-[48%] md:h-full shadow-sm shadow-gray-500 rounded-lg flex items-center justify-center'>
                <div className='flex flex-row items-center justify-center text-xl gap-2'>
                  <IoPeopleSharp className='text-[28px]'/> Max Guest Allowed: {cardDetails.maxGuestAllowed || 0 } 
                </div>
              </div>
            </div>


          </div>

          <div className='bg-[#FAF9F6] w-[98%] h-60 md:h-[95%] md:w-[50%] flex shadow-sm shadow-gray-400 rounded-lg  items-center justify-center'>
            <iframe 
              src={mapUrl}
              width="98%"
              height="98%"
              loading='lazy'
            />
          </div>
        </div>

        <div className='w-[98%] h-auto  md:w-[90%] md:h-[300px] gap-2 mb-5 flex justify-center items-center flex-col md:flex-row'>
          
          <div className='w-[98%] md:h-[98%] md:w-[50%] '>
            <div className='w-full h-auto px-2 bg-[#FAF9F6]'>
              <p className='font-semibold text-[20px] mt-1'>
                What is Provides?
              </p>
              <div>
                {
                  cardDetails.amenities && cardDetails.amenities.length > 0 && 
                      <div className='mt-2 md:mt-0 w-full flex flex-wrap gap-2 overflow-auto'>
                      {
                        cardDetails.amenities.map((item) => (
                          <div className='bg-gray-200 text-black rounded-lg text-[15px] p-2'>
                            <span className='flex flex-row  items-center justify-center gap-1'> {item} <span className='text-green-700'><GiConfirmed/></span> </span> 
                          </div>
                        ))
                      }
                    </div>
                }
              </div>

              <p className='font-semibold text-[20px] mt-1'>
                Point to Note
              </p>

              <div className='md:text-[16px]'>
                {cardDetails.points.length > 0 && 
                 cardDetails?.points.map((item) => (
                    <div>
                      { item }
                    </div>
                  ))
                }
              </div>

            </div>
          </div>

          <div className='w-full md:h-[98%] md:w-[50%]'>
            
            {
              cardDetails.host?._id !== userData._id ? 
              (
                <div className='w-full flex items-center justify-center flex-row gap-3'>
                  <button onClick={() => setShowBookingPopUp(true)} className='bg-[red] w-[50%] py-3 md:py-4 rounded-lg text-[18px] text-[white] font-semibold cursor-pointer hover:bg-red-600 border border-gray-800'>
                    Reserve
                  </button>

                  <button onClick={() => HandleWhatsappConnect(cardDetails.host.phone , title)} className='bg-green-500 w-[50%] py-3 md:py-4 rounded-lg text-[18px] text-[white] font-semibold cursor-pointer hover:bg-green-600 border border-gray-800'>
                    Connect 
                  </button>
                </div>
              ) : 
              (
                <div className='w-full flex items-center justify-center flex-row gap-3'>
                  <button onClick={() => setShowUpdatePopUp(true)} className='bg-[red] w-[50%] py-3 md:py-4 rounded-lg text-[18px] text-[white] font-semibold cursor-pointer hover:bg-red-600 border border-gray-800'>
                    Update Listing
                  </button>
                </div>
              )
            }

            <p className='font-semibold text-[20px] px-3'>
              Reviews
            </p>

            <div className='w-full h-auto md:h-[60px] flex flex-col md:flex-row justify-center items-center gap-2 '>
                <div className='text-[18px] md:text-[20px] shadow-sm shadow-gray-500 rounded-lg h-[50px] w-[98%] md:w-[48%] flex items-center justify-center flex-row gap-2 border border-gray-400'>
                  Write a review
                  <button onClick={() => setShowReviewPopUp(true)} className='bg-[red] w-[85px] py-2 md:py-1 rounded-lg text-[14px] text-[white] cursor-pointer hover:bg-red-600 border border-gray-800'>
                    Review
                  </button>
                </div>

                <div className='text-[18px] md:text-[20px] shadow-sm shadow-gray-500 rounded-lg h-[50px] w-[98%] md:w-[48%] flex items-center justify-center flex-row gap-2 border border-gray-400'>
                  Summarize with AI
                  <button onClick={() => setShowSummarizePopUp(true)} className='bg-[red] w-[85px] py-2 md:py-1 rounded-lg text-[14px] text-[white] cursor-pointer hover:bg-red-600 border border-gray-800'>
                    Summarize
                  </button>
                </div>
            </div>

            <div className='bg-gray-100 rounded-lg w-[98%] h-[130px] mt-2 flex flex-wrap overflow-y-auto justify-center items-center gap-3 md:gap-4'>
              
              {
                reviews.length > 0 && 
                reviews.map((itr) => (
                  <div className='bg-[#FAF9F6] w-[48%] md:w-[200px] h-auto md:h-auto overflow-y-auto rounded-lg border border-gray-600 shadow-sm shadow-gray-500'>
                    <div className=' flex justify-between px-2 items-center'>
                      <p className='text-[14px] md:text-[16px]'> {itr.guest.name} </p>
                      <p className='text-[14px] md:text-[16px] text-red-500'> {itr.createdAt.split('T')[0]} </p>
                    </div>
                    <div className=' text-[14px] md:text-[16px] w-full flex items-center justify-start px-2 text-[#ff0048]'>
                      {(itr.rating === 1) && (<IoIosStar />) }
                      {(itr.rating === 2) && (<div className='flex flex-row'><IoIosStar /> <IoIosStar /></div>) }
                      {(itr.rating === 3) && (<div className='flex flex-row'><IoIosStar /> <IoIosStar /> <IoIosStar /></div>) }
                      {(itr.rating === 4) && (<div className='flex flex-row'><IoIosStar /> <IoIosStar /> <IoIosStar /> <IoIosStar /></div>) }
                      {(itr.rating === 5) && (<div className='flex flex-row'><IoIosStar /> <IoIosStar /> <IoIosStar /> <IoIosStar /> <IoIosStar /></div>) }
                    </div>
                    <div className=' w-full px-2'>
                      <p className='text-[12px] md:text-[14px]'>
                        {itr.feedback}
                      </p>
                    </div>
                  </div>
                ))
              }

              {
                reviews.length === 0 && 
                <div className='font-semibold font-mono text-[22px] text-center text-gray-600'>
                  No reviews!
                </div>
              }
  

            </div>


          </div>
        </div>

        {/* Update Listing PopUp */}
        
        {
          showUpdatePopUp && 
          
          <div className='w-full h-full flex items-center justify-center bg-[#000000a9] fixed top-0 z-100 backdrop-blur-sm'>
            
            <div onClick={() => setShowUpdatePopUp(false)} className='h-8 w-8 bg-[red] rounded-full flex justify-center items-center top-[6%] left-[25px] absolute text-[18px] font-bold'>
              <RxCross2/>
            </div>

            <form action="" onSubmit={(e) => {e.preventDefault()}}
            className='text-[white] bg-[#272727] p-5 rounded-lg max-w-[900px] w-[90%] h-[550px] flex items-center justify-start flex-col gap-2.5 overflow-auto mt-[50px]'>

                <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute top-[5%] right-2.5 shadow-lg cursor-pointer'>
                    Update Your Home
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="title" className='text-[20px]'>Title</label>
                  <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='title' id='title' value={title} required className=' bg-[white] text-[black] w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="description" className='text-[20px]'>Description</label>
                  <textarea onChange={(e) => setDescription(e.target.value)} placeholder='description' id='description' value={description} required className='bg-[white] text-[black] w-[90%] h-20 border-2 border-[#555656] rounded-lg text-[18px] px-4 pt-1' />
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="img1" className='text-[20px]'>Image1</label>
                  <div className='flex items-center justify-center w-[90%] h-10 border-[#555656] border-2 rounded-[10px]'>
                    <input onChange={handleImage1} type="file" id='img1' className='w-full rounded-lg text-[15px] px-2.5' />
                  </div>
                </div>
                
                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="img2" className='text-[20px]'>Image2</label>
                  <div className='flex items-center justify-center w-[90%] h-10 border-[#555656] border-2 rounded-[10px]'>
                    <input onChange={handleImage2} type="file" id='img2' className='w-full rounded-lg text-[15px] px-2.5' />
                  </div>
                </div>
  
                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="img3" className='text-[20px]'>Image3</label>
                  <div className='flex items-center justify-center w-[90%] h-10 border-[#555656] border-2 rounded-[10px]'>
                    <input onChange={handleImage3} type="file" id='img3' className='w-full rounded-lg text-[15px] px-2.5' />
                  </div>
                </div>
  
                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="rent" className='text-[20px]'>Rent</label>
                  <input onChange={(e) => setRent(e.target.value)} type="number" placeholder='rent' id='rent' value={rent} required className='bg-[white] text-[black] w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
                </div>
  
                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="city" className='text-[20px]'>City</label>
                  <input onChange={(e) => setCity(e.target.value)} type="text" placeholder='city' id='city' value={city} required className='bg-[white] text-[black] w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
                </div>
  
                <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                  <label htmlFor="landmark" className='text-[20px]'>Landmark</label>
                  <input onChange={(e) => setLandmark(e.target.value)} type="text" placeholder='landmark' id='landmark' value={landmark} required className='bg-[white] text-[black] w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
                </div>
  
                <div className='w-full flex items-center justify-center gap-5 '>
                  <button disabled={updating} onClick={HandleUpdateListing} className='px-5 py-2.5 bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg cursor-pointer mt-2 md:text-[18px] text-nowrap' >
                    { updating ? 'Updating' : 'Update Listing' }
                  </button>
                  
                  {/* Delete */}
                  <button onClick={HandleDeleteListing} className='px-5 py-2.5 bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg cursor-pointer mt-2 md:text-[18px] text-nowrap' >
                    { deleting ? 'Deleting' : 'Delete Listing' }
                  </button>
                </div>
  
            </form>          

          </div>
        }


        {/* Booking PopUp */}

       { showBookingPopUp &&

          <div className='gap-2  w-full h-full flex items-center justify-center bg-[#000000a9] fixed top-0 z-100 p-5  backdrop-blur-sm md:flex-row md:gap-[100px] flex-col'>

            <div onClick={() => setShowBookingPopUp(false)} className='h-8 w-8 bg-[red] rounded-full flex justify-center items-center top-[6%] left-[25px] absolute text-[18px] font-bold'>
              <RxCross2/>
            </div>

            <form onSubmit={(e) => {e.preventDefault()}}
            className='h-[50%] md:max-w-[450px] w-[90%] md:h-[450px] overflow-auto bg-[#f7fbfcfe] p-5 rounded-lg flex items-center justify-center flex-col gap-2.5 border border-[#dedddd]'>
              
              <h1 className='w-full flex items-center justify-center py-2.5 text-[25px] border-b border-[#a3a3a3] '>
                Confirm & Book
              </h1>

              <div className='w-full h-[80%] bg-[#79797933] mt-2.5 rounded-lg p-2.5 md:h-[70%]'>
                <h3 className='text-[14px] md:text-[19px] font-semibold'>
                  Your Trip - 
                </h3>

                {/* // ---------------------------------------- */}

                <div className='w-[90%] flex items-center justify-center flex-col gap-1 md:gap-2 md:justify-center md:flex-col md:items-center mt-1 md:mt-2  ' >
                  <label className='text-[18px] md:text-[20px]'> Select Dates </label>
                  
                  <DatePicker 
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(itr) => {
                      const [start , end] = itr ; 
                      setStartDate(start) ; 
                      setEndDate(end) ;

                      // formatt to local 
                      const formatLocal = (date) => {
                        if(!date) return null ; 
                        const offset = date.getTimezoneOffset(); 
                        const localDate = new Date(date.getTime() - offset * 60 * 1000 ); 
                        return localDate.toISOString().split('T')[0] ; 
                      }

                      // setting checkIn/Out
                      if(start) setCheckIn(formatLocal(start));
                      if(end) setCheckOut(formatLocal(end)); 
                    }}

                    // Excluding Intervals 
                    excludeDateIntervals={bookedIntervals}
                    
                    minDate={ new Date() }
                    isClearable={true}
                    placeholderText='Select In/Out Dates'
                    className="w-full max-w-[300px] h-10 md:h-12 border-[#555656] border-2 rounded-[10px] px-3 text-center"
                  />
                </div>

                <div className='w-full flex items-center justify-center flex-col gap-1 md:gap-2 mt-2'>
                  <p className='font-semibold text-[12px] md:text-[16px]'> CheckIn - <span>{checkIn.split('T')[0]}</span> </p>
                  <p className='font-semibold text-[12px] md:text-[16px]'> CheckOut - <span>{checkOut.split('T')[0]}</span> </p>
                </div>

                {/* // ---------------------------------------- */}

                <div className='w-full flex items-center justify-center'>
                  <button disabled={booking} onClick={() => HandleBooking(cardDetails._id)} className='px-20 py-2.5 bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg cursor-pointer text-nowrap mt-2.5' >
                    { booking ? 'Booking..' : 'Book Now' }
                  </button>
                </div>

              </div>

            </form>

            <div className='h-[45%] md:max-w-[450px] w-[90%] md:h-[450px] bg-[#f7fbfcfe] p-5 rounded-lg flex items-center justify-center flex-col gap-2.5 border border-[#e2e1e1] '>
              
              <div className='w-[95%] h-[30%] border border-[#abaaaa] rounded-lg flex justify-center items-center gap-2 p-5 overflow-hidden'>

                <div className='w-[70px] h-[90px] flex items-center justify-center shrink-0 rounded-lg md:w-[100px] md:h-[100px]  '>
                  <img className='w-full h-full  rounded-lg' src={cardDetails.image1} alt="" />
                </div>

                <div className='w-[80%] h-[100px] gap-[5px]'>
                    <h1 className='text-[12px] md:text-[18px] w-[90%] truncate'>
                      { `In ${cardDetails.landmark},${cardDetails.city}` }
                    </h1>
                    <h1 className='text-[12px] md:text-[18px]'> {cardDetails.title} </h1>
                    <h1 className='text-[12px] md:text-[18px]'> {cardDetails.category.toUpperCase()} </h1>
                </div>

              </div>

              <div className='w-[95%] h-[60%] border border-[#abaaaa] rounded-lg flex justify-start items-start p-2 md:p-5 gap-1 md:gap-[15px] flex-col'>
                <h1 className='text-[14px] md:text-[22px] font-semibold'>
                  Booking Price -
                </h1>

                <p className='w-full flex justify-between items-center px-5'>
                  <span className='font-semibold text-[12px] md:text-[14px]'>
                    {`₹${cardDetails.rent} X ${night} nights`}
                  </span>
                  <span className='text-[12px] md:text-[14px]'>
                    {cardDetails.rent * night}
                  </span>
                </p>

                <p className='w-full flex justify-between items-center px-5'>
                  <span className='font-semibold text-[12px] md:text-[14px]'>
                    Tax
                  </span>
                  <span className='text-[12px] md:text-[14px]'>
                    {cardDetails.rent * (8/100)}
                  </span>
                </p>

                <p className='w-full flex justify-between items-center px-5 border-b border-gray-500 pb-2.5'>
                  <span className='font-semibold text-[12px] md:text-[14px] text-nowrap'>
                    Platform Charge 
                  </span>
                  <span className='text-[12px] md:text-[14px]'>
                    {cardDetails.rent * (7/100)}
                  </span>
                </p>

                <p className='w-full flex justify-between items-center px-5'>
                  <span className='font-semibold text-[14px] md:text-[16px]'>
                    Total Price
                  </span>
                  <span className='text-[14px] md:text-[16px]'>
                    ₹{total}
                  </span>
                </p>
                
              </div>

            </div>

          </div>
      }


      {/* // --------- Review PopUp --------------- */}
      { showReviewPopUp && 
          <div className='fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#fffefc] h-[400px] w-[90%] md:w-[500px] flex items-center justify-center flex-col gap-1 rounded-lg shadow-xl shadow-gray-500 border border-gray-500 z-50'>
                
            <button onClick={() => setShowReviewPopUp(false)} className='absolute top-1 font-semibold text-gray-800 right-1 p-1 text-2xl flex items-center justify-center rounded-full cursor-pointer'>
                <RxCross2 />
            </button>
                
            <h1 className='font-semibold text-[24px] text-gray-900'>
                Share Your Experience!
            </h1>

            <div className='w-full h-[100px] flex justify-center items-center flex-row flex-wrap gap-3 '>
                <div onClick={() => setRating(1)} className={`h-12 w-12 md:h-15 md:w-15 flex justify-center items-center flex-col rounded-lg cursor-pointer border-2 border-gray-500 hover:bg-red-400 ${ (rating === 1) && 'bg-red-400'}`}>
                    <IoSadOutline className='text-[18px] md:text-[26px]'/>
                    <p className='text-[8px] md:text-[10px]'>Angry</p> 
                </div>

                <div onClick={() => setRating(2)} className={`h-12 w-12 md:h-15 md:w-15 flex justify-center items-center flex-col rounded-lg cursor-pointer border-2 border-gray-500 hover:bg-orange-400 ${ (rating === 2) && 'bg-orange-400'}`}>
                    <FaRegFaceSadTear className='text-[18px] md:text-[26px]'/>
                    <p className='text-[8px] md:text-[10px]'>Sad</p> 
                </div>

                <div onClick={() => setRating(3)} className={`h-12 w-12 md:h-15 md:w-15 flex justify-center items-center flex-col rounded-lg cursor-pointer border-2 border-gray-500 hover:bg-yellow-400 ${ (rating === 3) && 'bg-yellow-400'}`}>
                    <BsEmojiNeutral className='text-[18px] md:text-[26px]'/>
                    <p className='text-[8px] md:text-[10px]'>Neutral</p>
                </div>

                <div onClick={() => setRating(4)} className={`h-12 w-12 md:h-15 md:w-15 flex justify-center items-center flex-col rounded-lg cursor-pointer border-2 border-gray-500 hover:bg-green-400 ${ (rating === 4) && 'bg-green-400'}`}>
                    <HiOutlineEmojiHappy className='text-[18px] md:text-[26px]'/>
                    <p className='text-[8px] md:text-[10px]'>Happy</p>
                </div>

                <div onClick={() => setRating(5)} className={`h-12 w-12 md:h-15 md:w-15 flex justify-center items-center flex-col rounded-lg cursor-pointer border-2 border-gray-500 hover:bg-cyan-400 ${ (rating === 5) && 'bg-cyan-400'}`}>
                    <IoHappyOutline className='text-[18px] md:text-[26px]'/>
                    <p className='text-[8px] md:text-[10px]'>Wonderful</p>
                </div>
                    
            </div>

            <h2 className='font-semibold text-[20px] text-gray-900'>
                How was the stay?
            </h2>

            <div className='w-full h-36 flex items-center justify-center'>
                <textarea onChange={(e) => setFeedback(e.target.value)} value={feedback} name="" id="" placeholder='Write your detailed feedback here...'
                className='w-[92%] h-[95%] border-2 border-gray-500 min-h-34 max-h-34 rounded-lg text-[18px] text-black outline-none p-2 '
                />
            </div>

            <button onClick={() => HandleAddReview(cardDetails._id)} disabled={isAddingReview} className='bg-teal-600 w-[95%] h-[50px] rounded-lg text-[white] text-[18px] font-semibold cursor-pointer hover:bg-teal-700'>
              { isAddingReview ? 'Adding Review...' : 'Submit Review' }
            </button>

        </div>
      }

      {/* // --------- Review Summarize PopUp ---------- */}
      { showSummarizePopUp && 
          <div className='fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#fffefc] h-[500px] w-[90%] md:w-[500px] flex items-center justify-start  flex-col gap-1 rounded-lg shadow-xl shadow-gray-500 border border-gray-500 z-50 overflow-y-auto'>
                
            <button onClick={() => setShowSummarizePopUp(false)} className='absolute top-1 font-semibold text-gray-800 right-1 p-1 text-2xl flex items-center justify-center rounded-full cursor-pointer'>
                <RxCross2 />
            </button>
                
            <h1 className='mt-3 font-semibold text-[26px] text-gray-900 flex justify-center items-center gap-1'> 
              <PiSparkleLight className='text-[red]'/>  AI Review Summary
            </h1>

            <p className='text-center text-[14px] md:text-[16px] w-[90%] md:w-[80%] '>
              Get a quick overview of guest feedback for this property without reading every review.
            </p>

            {
              summarized?.overallSentiment && (
                <div className='h-10 w-[90%] flex justify-center items-center'>
                  {/* // ----- bar ------  */}
                  <div style={{ width: `${Number(summarized?.overallSentiment?.positive)}%` }}
                  className='bg-green-500 h-5 flex justify-center items-center text-[8px]'>
                    { Number(summarized?.overallSentiment?.positive) > 0 && `${Math.ceil(summarized?.overallSentiment?.positive)}% Positive` }
                  </div>

                  <div style={{ width: `${Number(summarized?.overallSentiment?.negative)}%` }}
                  className='bg-red-500 h-5 flex justify-center items-center text-[8px]'>
                    { Number(summarized?.overallSentiment?.negative) > 0 && `${Math.ceil(summarized?.overallSentiment?.negative)}% Negative` }
                  </div>
                </div>
              )
            }

            {
              summarized?.pros && 
              <div className='w-[90%] flex justify-start items-center flex-col gap-2'>
                
                <div className='w-[90%] h-[50px] text-gray-600 rounded-lg bg-gray-50 border-2 border-gray-200 flex justify-center items-center'>
                  <p className='font-semibold text-[22px]'> Avg Rating: <span> {summarized?.ratingScore}<span>⭐</span> <span className='text-[15px]'> (out of 5) </span> </span> </p>
                </div>
                
                <div className='bg-green-100 w-full border-2 border-green-300 px-2 py-1 rounded-lg '>
                  <p className='text-[16px] font-semibold text-[green]'> +
                    <span className='text-[14px] font-normal'> { summarized?.pros } </span>
                  </p>
                </div>

                <div className='bg-red-100 w-full border-2 border-red-300 px-2 py-1 rounded-lg '>
                  <p className='text-[16px] font-semibold text-[red]'> - 
                    <span className='text-[14px] font-normal'> { summarized?.cons } </span>
                  </p>
                </div>

                <div className='bg-gray-100 w-full rounded-lg border-2 border-gray-300 px-2 py-1'>
                  <p className='text-[16px] font-semibold'> Verdict: 
                    <span className='text-[14px] font-normal'> { summarized?.verdict } </span>
                  </p>
                </div>
              </div>
            }

            <button onClick={() => SummarizeReviews(cardDetails._id)} className='bg-[red] mb-4 mt-2 w-[90%] py-3 rounded-lg cursor-pointer text-[white] font-semibold hover:bg-red-600 text-center flex justify-center items-center'>
              { isSummarizing ? <Loader /> : 'Summarize with AI' }
            </button>

        

        </div>
      }            
    
    </div>
    
  )
}

export default ViewCard
