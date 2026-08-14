import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import {toast} from 'react-hot-toast'
import { bookingDataContext } from '../Context/BookingContext';
import { GiConfirmed } from "react-icons/gi";
import { IoPeopleSharp, IoTicketSharp } from "react-icons/io5";
import { IoSadOutline } from "react-icons/io5";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { BsEmojiNeutral } from "react-icons/bs";
import { IoHappyOutline } from "react-icons/io5";
import { PiSparkleLight } from "react-icons/pi";
import { IoIosStar } from "react-icons/io";
import Loader from '../Components/Loader'; 
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi2";


// ---------- Date Picker -----------
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { reviewDataContext } from '../Context/ReviewContext';

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
    showReviewPopUp , 
    setShowReviewPopUp ,
  } = useContext(reviewDataContext); 

  const [showUpdatePopUp , setShowUpdatePopUp] = useState(false);
  const [showBookingPopUp , setShowBookingPopUp] = useState(false); 
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


  // ----- Handle Minimum Date To Choose -----
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0] ; 
    setMinDate(today); // min={minDate}
  },[]);


  // ---------- Handle TotalRent ------------
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
  

  // ----------- Update Listing -------------
  const HandleUpdateListing = async () => {
        if(updating){
          return ; 
        }
        try { 
            setUpdating(true);
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
            if(res.data.success){
              setTitle(""); 
              setDescription(""); 
              setRent(""); 
              setCity(""); 
              setLandmark(""); 

              toast.success(res.data.message); 
              setUpdating(false); 
              navigate('/'); 
              setUpdating(false); 
            }
        }

        catch (error) {
            toast.error('Error While Updating');
            setUpdating(false); 
        }

        finally{
          setUpdating(false); 
        }
  }

  // Image Handlers 
  const handleImage1 = (e) => {
    let file = e.target.files[0]; 
    setBackEndImage1(file);
  }

  // Image Handlers
  const handleImage2 = (e) => {
    let file = e.target.files[0]; 
    setBackEndImage2(file);
  }

  // Image Handlers
  const handleImage3 = (e) => {
    let file = e.target.files[0]; 
    setBackEndImage3(file);
  }

  // ------------ Delete Listing ------------
  const HandleDeleteListing = async () => {
    if(deleting){
      return ; 
    }
    try {
      setDeleting(true); 
      const res = await axios.delete(serverUrl + `/listing/deletelistingbyid/${cardDetails._id}` , 
        {withCredentials : true}
      ); 
      if(res.data.success){
        toast.success(res.data.message); 
        setDeleting(false); 
        navigate('/'); 
      }
    }
    
    catch (error) {
      console.log(error);  
      toast.error('Error While Deleting'); 
      setDeleting(false); 
    }

    finally{
      setDeleting(false); 
    }
  }

  // ----------- Handle Whatsapp Connect ------------
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


  // ---------- Handle Booked Dates -------------
    useEffect(() => {

      // ----- function to fetch dates -----
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


  // ---------- Handle Fetch-Reviews ------------ 
  useEffect(() => {
    HandleGetReviews(cardDetails._id); 
  },[]); 


  // --------- Handle Review PopUp --------------
  const HandleReviewPopUp = () => {
    if( cardDetails.host._id === userData._id ){
      toast.error("Host Can't Review Own Listing!"); 
      return ; 
    }
    else {
      setShowReviewPopUp(true); 
    }
  }

  // --------------------------------------------

  return (

    <div className='bg-[#F3F1EC] w-full h-full min-h-screen md:h-auto flex items-center justify-start md:justify-center gap-2.5 flex-col overflow-y-auto relative'>
          
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
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div className='w-[95%] md:w-[90%] mt-2 md:mt-5 h-[55px] md:h-[70px] rounded-2xl bg-white shadow-md shadow-gray-300 border border-gray-100 flex justify-between items-center px-4 fade-up'>
          <div className='h-full flex justify-start items-center px-4 '>
            <p className='font-semibold text-[18px] md:text-[28px] text-gray-900 flex items-center gap-2'>
              <span className='w-1.5 h-6 bg-red-600 rounded-full hidden md:inline-block'></span>
              In {cardDetails.landmark}, {cardDetails.city}
            </p>
          </div>

          <button onClick={() => navigate('/')} className='bg-linear-to-r from-red-600 to-red-500 hidden md:flex items-center justify-center rounded-full px-10 py-3 text-[white] text-[16px] font-semibold cursor-pointer shadow-md shadow-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 active:scale-95'>
            Back to Home
          </button>
        </div>

        <div className='w-[95%] md:w-[90%] h-[300px] md:h-[400px] flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 mt-3 md:mt-4 scale-in'>
          <div className='h-[60%] md:h-[95%] w-[98%] md:w-[65%] flex items-center justify-center overflow-hidden rounded-2xl shadow-md shadow-gray-300 group'>
            <img src={cardDetails.image1} 
            className='w-full h-full md:w-full md:h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105'
            />
          </div>

          <div className='h-[40%] w-[98%] md:h-[95%] md:w-[32%] flex flex-row md:flex-col justify-center items-center gap-2 md:gap-3 '>
            <div className='h-[95%] w-[50%] md:h-[48%] md:w-[98%] overflow-hidden rounded-2xl shadow-md shadow-gray-300 group'>
              <img src={cardDetails.image2} 
              className='w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110'
              />
            </div>

            <div className='h-[95%] w-[50%] md:h-[48%] md:w-[98%] overflow-hidden rounded-2xl shadow-md shadow-gray-300 group'>
              <img src={cardDetails.image3} 
              className='w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110'
              />
            </div>
          </div>
        </div>

        <div className='w-[95%] md:w-[90%] h-auto md:h-[70px] py-3 md:py-0 rounded-2xl bg-white shadow-sm shadow-gray-300 border border-gray-100 flex justify-between items-center gap-2 md:gap-0 mt-3 fade-up'>
          <div className='truncate h-full w-auto md:w-[80%] flex flex-col items-start justify-center px-4'>
            <p className='text-[17px] md:text-[22px] font-bold text-gray-900 truncate'>
              {cardDetails.title.toUpperCase()} <span className='text-red-500'>.</span> {cardDetails.category.toUpperCase()}  
            </p>
            <p className='text-gray-500 text-[11px] md:text-[13px]'>
              {cardDetails.landmark}
            </p>   
          </div>

          <div className='h-full w-auto md:w-[20%] flex items-center justify-center'>
            <p className='text-[18px] md:text-[24px] text-nowrap mr-4 font-bold text-red-600'>
              ₹{cardDetails.rent} <span className='text-gray-400 text-[13px] md:text-[15px] font-medium'>/day</span>
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
                {cardDetails.description}
              </p>
            </div>
            
            <div className='w-[98%] gap-2 h-[120px] md:h-[60px] flex items-center justify-center flex-col md:flex-row '>
              
              <div className='bg-white shadow-sm shadow-gray-300 border border-gray-100 rounded-2xl w-[98%] md:w-[48%] h-[60px] flex items-center justify-center gap-2 px-2 transition-all duration-300 hover:shadow-md hover:border-red-200'>
                <div className='text-[red] h-11 w-11 shrink-0 rounded-full border-2 border-red-500 flex items-center justify-center font-bold text-[18px] bg-red-50'>
                  { cardDetails.host?.name.slice(0,1).toUpperCase() }
                </div>
                <div className='flex flex-col ml-1 overflow-hidden'>
                  <div className='text-[13px] font-semibold text-gray-800 truncate'>Hosted by {cardDetails.host?.name}</div>
                  <div className='text-[11px] text-gray-400 truncate'>{cardDetails.host?.email}</div>
                </div>
              </div>

              <div className='bg-white w-[98%] h-[60px] md:w-[48%] md:h-full shadow-sm shadow-gray-300 border border-gray-100 rounded-2xl flex items-center justify-center transition-all duration-300 hover:shadow-md hover:border-red-200'>
                <div className='flex flex-row items-center justify-center text-[15px] font-semibold text-gray-800 gap-2'>
                  <IoPeopleSharp className='text-[24px] text-red-500'/> Max Guest Allowed: {cardDetails.maxGuestAllowed || 0 } 
                </div>
              </div>
            </div>


          </div>

          {/* ------------ Map Embedded ----------- */}
          <div className='bg-white w-[98%] h-60 md:h-[95%] md:w-[50%] flex shadow-sm shadow-gray-300 border border-gray-100 rounded-2xl overflow-hidden items-center justify-center p-1.5'>
            <iframe 
              src={mapUrl}
              width="98%"
              height="98%"
              loading='lazy'
              className='rounded-xl'
            />
          </div>
        </div>

        <div className='w-[98%] h-auto  md:w-[90%] md:h-[300px] gap-4 mb-5 mt-4 flex justify-center items-center flex-col md:flex-row'>
          
          <div className='w-[98%] md:h-[98%] md:w-[50%] '>
            <div className='w-full h-auto px-5 py-4 bg-white rounded-2xl shadow-sm shadow-gray-300 border border-gray-100'>
              <p className='font-bold text-[18px] text-gray-900 flex items-center gap-2 mt-1'>
                <span className='w-1.5 h-5 bg-red-600 rounded-full'></span>
                What is Provided?
              </p>
              <div>
                {
                  cardDetails.amenities && cardDetails.amenities.length > 0 && 
                      <div className='mt-3 w-full flex flex-wrap gap-2 overflow-auto'>
                      {
                        cardDetails.amenities.map((item) => (
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
                Point to Note
              </p>

              <div className='text-[14px] md:text-[15px] text-gray-600 mt-1 flex flex-col gap-1'>
                {cardDetails.points.length > 0 && 
                 cardDetails?.points.map((item) => (
                    <div className='flex items-start gap-2'>
                      <span className='text-red-400 mt-1'>•</span> { item }
                    </div>
                  ))
                }
              </div>

            </div>
          </div>

          <div className='w-full md:h-[98%] md:w-[50%]'>
            
            {/* ----------- For Guest -------------- */}
            {
              cardDetails.host?._id !== userData._id ? 
              (
                <div className='w-full flex items-center justify-center flex-row gap-3'>
                  <button onClick={() => setShowBookingPopUp(true)} className='bg-linear-to-r from-red-600 to-red-500 w-[50%] py-3 md:py-4 rounded-2xl text-[16px] md:text-[18px] text-[white] font-semibold cursor-pointer shadow-md shadow-red-500/30 flex text-center justify-center items-center gap-2 flex-row transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 active:scale-95'>
                    <HiOutlineTicket className='text-[22px]'/> Reserve
                  </button>

                  <button onClick={() => HandleWhatsappConnect(cardDetails.host.phone , title)} className='bg-linear-to-r from-green-600 to-green-500 w-[50%] py-3 md:py-4 rounded-2xl text-[16px] md:text-[18px] text-[white] font-semibold cursor-pointer shadow-md shadow-green-500/30 flex text-center items-center justify-center flex-row gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 hover:-translate-y-0.5 active:scale-95'>
                    <FaWhatsapp className='text-[22px]'/> Connect 
                  </button>
                </div>
              ) : 
              // ------------- For Host ----------------
              (
                <div className='w-full flex items-center justify-center flex-row gap-3'>
                  <button onClick={() => setShowUpdatePopUp(true)} className='bg-linear-to-r from-red-600 to-red-500 w-[50%] py-3 md:py-4 rounded-2xl text-[16px] md:text-[18px] text-[white] font-semibold cursor-pointer shadow-md shadow-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 active:scale-95'>
                    Update Listing
                  </button>
                </div>
              )
            }

            <p className='font-bold text-[18px] text-gray-900 px-3 mt-4 flex items-center gap-2'>
              <span className='w-1.5 h-5 bg-red-600 rounded-full'></span>
              Reviews
            </p>

            <div className='bg-transparent w-full h-auto md:h-[60px] flex flex-col md:flex-row justify-center items-center gap-2 mt-2'>
                <div className='text-[15px] md:text-[17px] text-gray-700 font-medium text-nowrap bg-white shadow-sm shadow-gray-300 rounded-2xl h-[50px] w-[98%] md:w-[48%] flex items-center justify-center flex-row gap-2 border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-red-200'>
                  Write a review
                  <button onClick={() => HandleReviewPopUp() } className='bg-linear-to-r from-red-600 to-red-500 w-[85px] py-2 md:py-1.5 rounded-full text-[13px] text-[white] font-semibold cursor-pointer shadow-sm shadow-red-500/30 transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95'>
                    Review
                  </button>
                </div>

                <div className='text-[15px] md:text-[17px] text-gray-700 font-medium text-nowrap bg-white shadow-sm shadow-gray-300 rounded-2xl h-[50px] w-[98%] md:w-[48%] flex items-center justify-center flex-row gap-2 border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-red-200'>
                  Summarize with AI
                  <button onClick={() => setShowSummarizePopUp(true)} className='bg-linear-to-r from-red-600 to-red-500 w-[85px] py-2 md:py-1.5 rounded-full text-[13px] text-[white] font-semibold cursor-pointer shadow-sm shadow-red-500/30 transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95'>
                    Summarize
                  </button>
                </div>
            </div>

            {/* ----------- Reviews --------------- */}
            <div className='w-full mt-6'>
              <div className='flex items-center gap-2 mb-4 px-1'>
                  <div className='w-1 h-6 bg-red-600 rounded-full'></div>
                  <h2 className='text-lg font-bold text-gray-800 tracking-tight'>Guest Reviews</h2>
                  <span className='bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full border border-red-100'>
                      {reviews.length}
                  </span>
              </div>

              <div className='w-full flex overflow-x-auto md:overflow-y-auto pb-4 gap-4 no-scrollbar snap-x snap-mandatory scroll-smooth'>
                  {reviews.length > 0 ? (
                      reviews.map((itr, index) => (
                          <div 
                              key={index} 
                              style={{ animationDelay: `${index * 90}ms` }}
                              className='fade-up shrink-0 w-[280px] md:w-[320px] bg-[#ffebeb] border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 snap-start relative'
                          >
                              <div className='flex justify-between items-start mb-3'>
                                  <div className='flex flex-col'>
                                      <span className='font-bold text-gray-900 text-[15px] capitalize truncate w-32'>
                                          {itr.guest.name}
                                      </span>
                                      <span className='text-[11px] text-gray-400 font-medium uppercase tracking-wider'>
                                          {new Date(itr.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                      </span>
                                  </div>
                                  <div className='flex items-center bg-red-50 px-2 py-1 rounded-lg gap-1'>
                                      <IoIosStar className='text-red-500 text-sm' />
                                      <span className='text-red-600 font-black text-xs'>{itr.rating}.0</span>
                                  </div>
                              </div>

                              <div className='flex gap-0.5 mb-3'>
                                  {[...Array(5)].map((_, i) => (
                                      <IoIosStar 
                                          key={i} 
                                          className={`text-[13px] ${i < itr.rating ? 'text-red-500' : 'text-gray-200'}`} 
                                      />
                                  ))}
                              </div>

                              <div className='relative'>
                                  <p className='text-[13px] text-gray-600 leading-relaxed italic line-clamp-3'>
                                      "{itr.feedback}"
                                  </p>
                              </div>
                              
                              <div className='absolute bottom-0 right-4 translate-y-1/2'>
                                  <div className='w-8 h-8 bg-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-sm'>
                                      <span className='text-white text-[10px] font-bold'>{itr.guest.name.charAt(0).toUpperCase()}</span>
                                  </div>
                              </div>
                          </div>
                      ))
                  ) : (
                      <div className='w-full py-10 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 fade-in'>
                          <div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3'>
                              <IoIosStar className='text-white text-2xl' />
                          </div>
                          <p className='font-bold text-gray-400 text-sm tracking-wide'>NO REVIEWS YET</p>
                          <p className='text-[11px] text-gray-300'>Be the first one to share your experience!</p>
                      </div>
                  )}
              </div>
            </div>

          </div>
        </div>

        {/* --------- Update Listing PopUp ----------- */}
        {
          showUpdatePopUp &&         
          <div className='w-full h-full flex items-center justify-center bg-[#000000c2] fixed top-0 z-100 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]'>

            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes modalRise {
                from { transform: translateY(30px) scale(0.96); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
              }
              .modal-field { animation: modalRise 0.4s ease-out both; }
            `}</style>
            
            <div onClick={() => setShowUpdatePopUp(false)} className='h-9 w-9 bg-linear-to-r from-red-600 to-red-500 rounded-full flex justify-center items-center top-[6%] left-[25px] absolute text-[18px] font-bold text-white shadow-md shadow-red-500/40 cursor-pointer transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-90 z-10'>
              <RxCross2/>
            </div>

            <form action="" onSubmit={(e) => {e.preventDefault()}}
            className='text-gray-800 bg-[#FAF9F6] p-6 rounded-2xl max-w-[900px] w-[90%] h-[550px] flex items-center justify-start flex-col gap-3 overflow-auto mt-[50px] shadow-2xl border-2 border-gray-300 animate-[modalRise_0.35s_ease-out]'>

                <div className='w-[220px] h-12 text-[17px] font-semibold bg-linear-to-r from-red-600 to-red-500 text-white flex items-center justify-center rounded-full absolute top-[5%] right-4 shadow-md shadow-red-500/40 cursor-default'>
                    Update Your Home
                </div>

                <div className='w-full flex items-center justify-center pt-3 pb-1 border-b-2 border-gray-200'>
                  <p className='font-mono font-semibold text-[15px] text-gray-500 tracking-wide'>Edit the details of your listing below</p>
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-2 modal-field' style={{ animationDelay: '40ms' }}>
                  <label htmlFor="title" className='text-[15px] font-semibold text-gray-700'>Title</label>
                  <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='title' id='title' value={title} required className='bg-white text-black w-[90%] h-10 border-2 border-gray-300 rounded-lg text-[16px] px-4 transition-all duration-300 outline-none focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)]' />
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-2 modal-field' style={{ animationDelay: '80ms' }}>
                  <label htmlFor="description" className='text-[15px] font-semibold text-gray-700'>Description</label>
                  <textarea onChange={(e) => setDescription(e.target.value)} placeholder='description' id='description' value={description} required className='bg-white text-black w-[90%] h-20 border-2 border-gray-300 rounded-lg text-[16px] px-4 pt-2 transition-all duration-300 outline-none focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)]' />
                </div>

                <div className='w-[90%] flex items-start justify-start flex-col gap-2 modal-field' style={{ animationDelay: '120ms' }}>
                  <label htmlFor="img1" className='text-[15px] font-semibold text-gray-700'>Image1</label>
                  <div className='flex items-center justify-center w-[90%] h-10 border-gray-300 border-2 rounded-lg bg-white transition-all duration-300 hover:border-red-300'>
                    <input onChange={handleImage1} type="file" id='img1' className='w-full rounded-lg text-[13px] px-2.5 text-gray-500 cursor-pointer' />
                  </div>
                </div>
                
                <div className='w-[90%] flex items-start justify-start flex-col gap-2 modal-field' style={{ animationDelay: '160ms' }}>
                  <label htmlFor="img2" className='text-[15px] font-semibold text-gray-700'>Image2</label>
                  <div className='flex items-center justify-center w-[90%] h-10 border-gray-300 border-2 rounded-lg bg-white transition-all duration-300 hover:border-red-300'>
                    <input onChange={handleImage2} type="file" id='img2' className='w-full rounded-lg text-[13px] px-2.5 text-gray-500 cursor-pointer' />
                  </div>
                </div>
  
                <div className='w-[90%] flex items-start justify-start flex-col gap-2 modal-field' style={{ animationDelay: '200ms' }}>
                  <label htmlFor="img3" className='text-[15px] font-semibold text-gray-700'>Image3</label>
                  <div className='flex items-center justify-center w-[90%] h-10 border-gray-300 border-2 rounded-lg bg-white transition-all duration-300 hover:border-red-300'>
                    <input onChange={handleImage3} type="file" id='img3' className='w-full rounded-lg text-[13px] px-2.5 text-gray-500 cursor-pointer' />
                  </div>
                </div>
  
                <div className='w-[90%] flex items-start justify-start flex-col gap-2 modal-field' style={{ animationDelay: '240ms' }}>
                  <label htmlFor="rent" className='text-[15px] font-semibold text-gray-700'>Rent</label>
                  <input onChange={(e) => setRent(e.target.value)} type="number" placeholder='rent' id='rent' value={rent} required className='bg-white text-black w-[90%] h-10 border-2 border-gray-300 rounded-lg text-[16px] px-4 transition-all duration-300 outline-none focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)]' />
                </div>
  
                <div className='w-[90%] flex items-start justify-start flex-col gap-2 modal-field' style={{ animationDelay: '280ms' }}>
                  <label htmlFor="city" className='text-[15px] font-semibold text-gray-700'>City</label>
                  <input onChange={(e) => setCity(e.target.value)} type="text" placeholder='city' id='city' value={city} required className='bg-white text-black w-[90%] h-10 border-2 border-gray-300 rounded-lg text-[16px] px-4 transition-all duration-300 outline-none focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)]' />
                </div>
  
                <div className='w-[90%] flex items-start justify-start flex-col gap-2 modal-field' style={{ animationDelay: '320ms' }}>
                  <label htmlFor="landmark" className='text-[15px] font-semibold text-gray-700'>Landmark</label>
                  <input onChange={(e) => setLandmark(e.target.value)} type="text" placeholder='landmark' id='landmark' value={landmark} required className='bg-white text-black w-[90%] h-10 border-2 border-gray-300 rounded-lg text-[16px] px-4 transition-all duration-300 outline-none focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)]' />
                </div>
  
                <div className='w-full flex items-center justify-center gap-5 pt-2 pb-1 border-t-2 border-gray-200 mt-1'>
                  <button disabled={updating} onClick={HandleUpdateListing} className='px-5 py-2.5 bg-linear-to-r from-red-600 to-red-500 text-white text-[15px] md:px-[100px] rounded-full cursor-pointer mt-2 md:text-[16px] font-semibold text-nowrap shadow-md shadow-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0' >
                    { updating ? <Loader /> : 'Update Listing' }
                  </button>
                  
                  {/* ----- Delete ----- */}
                  <button onClick={HandleDeleteListing} className='px-5 py-2.5 bg-white text-red-600 text-[15px] md:px-[100px] rounded-full cursor-pointer mt-2 md:text-[16px] font-semibold text-nowrap border-2 border-red-500 transition-all duration-300 hover:bg-red-50 hover:shadow-md hover:-translate-y-0.5 active:scale-95' >
                    { deleting ? <Loader /> : 'Delete Listing' }
                  </button>
                </div>
  
            </form>          

          </div>
        }

      {/* --------- Booking PopUp ------------ */}
       { showBookingPopUp &&
          <div className='w-full h-full flex items-center justify-center bg-[#000000c2] fixed top-0 z-100 p-5  backdrop-blur-sm animate-[fadeIn_0.25s_ease-out] overflow-auto'>

            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes modalRiseLeft {
                from { transform: translateY(30px) scale(0.96); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
              }
              @keyframes modalRiseRight {
                from { transform: translateY(30px) scale(0.96); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
              }
              .price-row { transition: background-color 0.3s ease; }
              .price-row:hover { background-color: #FAF9F6; }
            `}</style>

            <div onClick={() => setShowBookingPopUp(false)} className='h-9 w-9 bg-linear-to-r from-red-600 to-red-500 rounded-full flex justify-center items-center top-[6%] left-[25px] absolute text-[18px] font-bold text-white shadow-md shadow-red-500/40 cursor-pointer transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-90 z-10'>
              <RxCross2/>
            </div>

            <div className='gap-5 w-full flex items-center md:items-stretch justify-center md:flex-row md:gap-10 flex-col'>

            <form onSubmit={(e) => {e.preventDefault()}}
            className='shadow-2xl shadow-gray-500/30 h-auto md:max-w-[450px] w-[95%] md:w-[90%] overflow-auto bg-[#FAF9F6] p-5 rounded-2xl flex items-start justify-start flex-col gap-3 border-2 border-gray-300 animate-[modalRiseLeft_0.35s_ease-out]'>
              
              <h1 className='font-bold w-full flex items-center py-1 text-[22px] md:text-[25px] text-gray-900 gap-2'>
                <span className='w-1.5 h-6 bg-red-600 rounded-full'></span>
                Confirm & Book
              </h1>

              <div className='w-full flex flex-col gap-2'>
                <label className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'> Select Your Dates </label>
                
                {/* ------ Exclude Dates Using DatePicker ------ */}
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
                  className="w-full h-11 md:h-12 border-gray-300 border-2 rounded-lg px-3 text-center bg-white outline-none transition-all duration-300 focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)]"
                />
              </div>

              <div className='w-full flex items-center justify-between gap-3'>
                <div className='flex-1 flex flex-col gap-1 bg-white border-2 border-gray-200 rounded-xl px-4 py-2'>
                  <span className='text-[10px] font-bold text-gray-400 uppercase tracking-wide'>CheckIn</span>
                  <span className='text-[13px] md:text-[14px] font-bold text-gray-800'>{checkIn.split('T')[0] || '--'}</span>
                </div>

                <IoTicketSharp className='text-red-400 text-[18px] shrink-0'/>

                <div className='flex-1 flex flex-col gap-1 bg-white border-2 border-gray-200 rounded-xl px-4 py-2'>
                  <span className='text-[10px] font-bold text-gray-400 uppercase tracking-wide'>CheckOut</span>
                  <span className='text-[13px] md:text-[14px] font-bold text-gray-800'>{checkOut.split('T')[0] || '--'}</span>
                </div>
              </div>

              <button disabled={booking} onClick={() => HandleBooking(cardDetails._id)} className='w-full py-3 bg-linear-to-r from-red-600 to-red-500 text-white text-[15px] rounded-full cursor-pointer text-nowrap flex text-center items-center justify-center gap-2 font-semibold shadow-md shadow-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0' >
                <IoTicketSharp className='text-[18px]'/> { booking ? <Loader /> : 'Book Now' }
              </button>

            </form>

            <div className='shadow-2xl shadow-gray-500/30 h-auto md:max-w-[450px] w-[95%] md:w-[90%] bg-[#FAF9F6] p-4 rounded-2xl flex items-center justify-center flex-col gap-2.5 border-2 border-gray-300 animate-[modalRiseRight_0.4s_ease-out]'>
              
              <div className='w-full md:w-[95%] h-auto bg-white border-2 border-gray-200 rounded-2xl shadow-sm flex items-center gap-3 p-2 md:p-2.5 overflow-hidden hover:shadow-md hover:border-red-200 transition-all duration-300'>
                <div className='w-[70px] h-[70px] md:w-[90px] md:h-[90px] flex items-center justify-center shrink-0 rounded-xl overflow-hidden border border-gray-100 shadow-inner'>
                  <img className='w-full h-full object-cover rounded-xl' src={cardDetails.image1} alt="" />
                </div>

                <div className='flex-1 flex flex-col justify-center gap-1 md:gap-[5px] overflow-hidden'>
                  <h1 className='text-[13px] md:text-[16px] w-[95%] truncate text-red-600 font-bold tracking-tight'>
                    {cardDetails.title}
                  </h1>
                
                  <h1 className='text-[10px] md:text-[12px] text-gray-500 leading-tight line-clamp-2 md:line-clamp-1'> 
                    {(cardDetails.description?.split(" ").slice(0,14).join(" "))+(cardDetails.description?.split(" ").length > 20 ? '...' : "") } 
                  </h1>
                
                  <div className='mt-1.5 flex items-center justify-between'>
                    <p className='text-[9px] text-nowrap truncate md:text-[12px] font-medium text-gray-400 uppercase tracking-tighter'> 
                      {cardDetails.landmark} • {cardDetails.city} 
                    </p>
                  
                    <div className='flex items-center gap-2 md:gap-3 shrink-0'>
                      <p className='text-[11px] md:text-[14px] text-red-500 font-black'> ₹{cardDetails.rent} </p>
                      <span className='text-[8px] md:text-[11px] px-2 py-0.5 bg-green-50 text-green-600 border border-green-200 font-bold rounded-full uppercase'> 
                        {cardDetails.category} 
                      </span>
                    </div>
                  </div>
                </div>
            </div>

              <div className='w-full md:w-[95%] shadow-sm shadow-gray-300  h-auto bg-white border-2 border-gray-200 rounded-2xl flex justify-start items-start p-4 gap-1 md:gap-2.5 flex-col transition-all duration-300 hover:border-red-200'>
                <h1 className='text-[16px] md:text-[20px] font-bold text-gray-900 flex items-center gap-2'>
                  <span className='w-1.5 h-5 bg-red-600 rounded-full'></span>
                  Booking Price
                </h1>

                <p className='price-row w-full flex justify-between items-center px-3 py-1 rounded-lg'>
                  <span className='font-semibold text-[12px] md:text-[14px] text-gray-600'>
                    {`₹${cardDetails.rent} X ${night} nights`}
                  </span>
                  <span className='text-[12px] md:text-[14px] text-gray-800 font-medium'>
                    {cardDetails.rent * night}
                  </span>
                </p>

                <p className='price-row w-full flex justify-between items-center px-3 py-1 rounded-lg'>
                  <span className='font-semibold text-[12px] md:text-[14px] text-gray-600'>
                    Tax
                  </span>
                  <span className='text-[12px] md:text-[14px] text-gray-800 font-medium'>
                    {cardDetails.rent * (8/100)}
                  </span>
                </p>

                <p className='price-row w-full flex justify-between items-center px-3 py-1 rounded-lg border-b-2 border-gray-100 pb-2'>
                  <span className='font-semibold text-[12px] md:text-[14px] text-gray-600 text-nowrap'>
                    Platform Charge 
                  </span>
                  <span className='text-[12px] md:text-[14px] text-gray-800 font-medium'>
                    {cardDetails.rent * (7/100)}
                  </span>
                </p>

                <p className='w-full flex justify-between items-center px-3 py-1 mt-0.5'>
                  <span className='font-bold text-[15px] md:text-[17px] text-gray-900'>
                    Total Price
                  </span>
                  <span className='text-[15px] md:text-[17px] font-bold text-red-600'>
                    ₹{total}
                  </span>
                </p>
                
              </div>

            </div>

            </div>

          </div>
      }

      {/* ------------ Review PopUp -------------- */}
      { showReviewPopUp && 
          <div className='w-full h-full flex items-center justify-center bg-[#000000c2] fixed top-0 z-100 p-5 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out] overflow-auto'>

            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes modalRise {
                from { transform: translateY(30px) scale(0.96); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
              }
              .mood-card { transition: all 0.25s ease; }
              .mood-card:hover { transform: translateY(-3px); }
            `}</style>

            <div className='shadow-2xl shadow-gray-500/30 h-auto w-[95%] md:w-[500px] bg-[#FAF9F6] p-6 rounded-2xl flex items-center justify-start flex-col gap-4 border-2 border-gray-300 relative animate-[modalRise_0.35s_ease-out]'>

                <button onClick={() => setShowReviewPopUp(false)} className='h-9 w-9 bg-linear-to-r from-red-600 to-red-500 rounded-full flex justify-center items-center -top-3.5 -right-3.5 absolute text-[18px] font-bold text-white shadow-md shadow-red-500/40 cursor-pointer transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-90 z-10'>
                    <RxCross2 />
                </button>

                <h1 className='font-bold w-full flex items-center py-1 text-[22px] md:text-[25px] text-gray-900 gap-2'>
                    <span className='w-1.5 h-6 bg-red-600 rounded-full'></span>
                    Share Your Experience!
                </h1>

                <div className='w-full h-auto flex justify-center items-center flex-row flex-wrap gap-3 '>
                    <div onClick={() => setRating(1)} className={`mood-card h-16 w-16 md:h-[70px] md:w-[70px] flex justify-center items-center flex-col rounded-xl cursor-pointer border-2 bg-white shadow-sm gap-0.5 ${ (rating === 1) ? 'border-red-500 bg-red-50 shadow-md shadow-red-500/20' : 'border-gray-200 hover:border-red-300' }`}>
                        <IoSadOutline className={`text-[20px] md:text-[26px] ${ (rating === 1) ? 'text-red-500' : 'text-gray-500' }`}/>
                        <p className={`text-[9px] md:text-[10px] font-semibold ${ (rating === 1) ? 'text-red-600' : 'text-gray-400' }`}>Angry</p> 
                    </div>

                    <div onClick={() => setRating(2)} className={`mood-card h-16 w-16 md:h-[70px] md:w-[70px] flex justify-center items-center flex-col rounded-xl cursor-pointer border-2 bg-white shadow-sm gap-0.5 ${ (rating === 2) ? 'border-orange-500 bg-orange-50 shadow-md shadow-orange-500/20' : 'border-gray-200 hover:border-orange-300' }`}>
                        <FaRegFaceSadTear className={`text-[20px] md:text-[26px] ${ (rating === 2) ? 'text-orange-500' : 'text-gray-500' }`}/>
                        <p className={`text-[9px] md:text-[10px] font-semibold ${ (rating === 2) ? 'text-orange-600' : 'text-gray-400' }`}>Sad</p> 
                    </div>

                    <div onClick={() => setRating(3)} className={`mood-card h-16 w-16 md:h-[70px] md:w-[70px] flex justify-center items-center flex-col rounded-xl cursor-pointer border-2 bg-white shadow-sm gap-0.5 ${ (rating === 3) ? 'border-yellow-500 bg-yellow-50 shadow-md shadow-yellow-500/20' : 'border-gray-200 hover:border-yellow-300' }`}>
                        <BsEmojiNeutral className={`text-[20px] md:text-[26px] ${ (rating === 3) ? 'text-yellow-500' : 'text-gray-500' }`}/>
                        <p className={`text-[9px] md:text-[10px] font-semibold ${ (rating === 3) ? 'text-yellow-600' : 'text-gray-400' }`}>Neutral</p>
                    </div>

                    <div onClick={() => setRating(4)} className={`mood-card h-16 w-16 md:h-[70px] md:w-[70px] flex justify-center items-center flex-col rounded-xl cursor-pointer border-2 bg-white shadow-sm gap-0.5 ${ (rating === 4) ? 'border-green-500 bg-green-50 shadow-md shadow-green-500/20' : 'border-gray-200 hover:border-green-300' }`}>
                        <HiOutlineEmojiHappy className={`text-[20px] md:text-[26px] ${ (rating === 4) ? 'text-green-500' : 'text-gray-500' }`}/>
                        <p className={`text-[9px] md:text-[10px] font-semibold ${ (rating === 4) ? 'text-green-600' : 'text-gray-400' }`}>Happy</p>
                    </div>

                    <div onClick={() => setRating(5)} className={`mood-card h-16 w-16 md:h-[70px] md:w-[70px] flex justify-center items-center flex-col rounded-xl cursor-pointer border-2 bg-white shadow-sm gap-0.5 ${ (rating === 5) ? 'border-cyan-500 bg-cyan-50 shadow-md shadow-cyan-500/20' : 'border-gray-200 hover:border-cyan-300' }`}>
                        <IoHappyOutline className={`text-[20px] md:text-[26px] ${ (rating === 5) ? 'text-cyan-500' : 'text-gray-500' }`}/>
                        <p className={`text-[9px] md:text-[10px] font-semibold ${ (rating === 5) ? 'text-cyan-600' : 'text-gray-400' }`}>Wonderful</p>
                    </div>
                        
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <label className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'> How was the stay? </label>

                    <textarea onChange={(e) => setFeedback(e.target.value)} value={feedback} name="" id="" placeholder='Write your detailed feedback here...'
                    className='w-full min-h-28 max-h-28 border-gray-300 border-2 rounded-lg px-3 py-2.5 bg-white outline-none text-[14px] md:text-[15px] text-gray-800 transition-all duration-300 focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)] resize-none'
                    />
                </div>

                <button onClick={() => HandleAddReview(cardDetails._id)} disabled={isAddingReview} className='w-full py-3.5 bg-linear-to-r from-red-600 to-red-500 text-white text-[15px] rounded-full cursor-pointer text-nowrap flex text-center items-center justify-center gap-2 font-semibold shadow-md shadow-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0'>
                  { isAddingReview ? <Loader /> : 'Submit Review' }
                </button>

            </div>

          </div>
      }

      
      {/* --------- Review Summarize PopUp ---------- */}
      { showSummarizePopUp && 
          <div className='w-full h-full flex items-center justify-center bg-[#000000c2] fixed top-0 z-100 p-5 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out] overflow-auto'>

            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes modalRise {
                from { transform: translateY(30px) scale(0.96); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
              }
            `}</style>

            <div className={`shadow-2xl shadow-gray-500/30 ${ summarized?.pros ? 'h-[520px] max-h-[85vh]' : 'h-auto' } w-[95%] md:w-[480px] bg-[#FAF9F6] p-5 rounded-2xl flex items-center justify-start flex-col gap-2.5 border-2 border-gray-300 relative animate-[modalRise_0.35s_ease-out]`}>

                <button onClick={() => setShowSummarizePopUp(false)} className='h-8 w-8 bg-linear-to-r from-red-600 to-red-500 rounded-full flex justify-center items-center top-2.5 right-2.5 absolute text-[16px] font-bold text-white shadow-md shadow-red-500/40 cursor-pointer transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95 z-10 shrink-0'>
                    <RxCross2 />
                </button>

                <h1 className='font-bold w-full flex items-center justify-center py-0.5 text-[19px] md:text-[22px] text-gray-900 gap-2 shrink-0'>
                    <PiSparkleLight className='text-red-600 text-[22px] md:text-[24px]'/>
                    AI Review Summary
                </h1>

                <p className='text-center text-[12px] md:text-[13px] text-gray-500 w-full md:w-[85%] leading-snug shrink-0'>
                  Get a quick overview of guest feedback for this property without reading every review.
                </p>

                <div className='w-full flex-1 min-h-0 overflow-y-auto flex flex-col items-center gap-2.5 pr-1'>

                  {
                    summarized?.overallSentiment && (
                      <div className='w-full h-7 flex justify-center items-center rounded-full overflow-hidden border-2 border-gray-200 shadow-sm shrink-0'>
                        {/* // ----- bar ------  */}
                        <div style={{ width: `${Number(summarized?.overallSentiment?.positive)}%` }}
                        className='bg-green-500 h-full flex justify-center items-center text-[8px] font-bold text-white transition-all duration-500'>
                          { Number(summarized?.overallSentiment?.positive) > 0 && `${Math.ceil(summarized?.overallSentiment?.positive)}% Positive` }
                        </div>

                        <div style={{ width: `${Number(summarized?.overallSentiment?.negative)}%` }}
                        className='bg-red-500 h-full flex justify-center items-center text-[8px] font-bold text-white transition-all duration-500'>
                          { Number(summarized?.overallSentiment?.negative) > 0 && `${Math.ceil(summarized?.overallSentiment?.negative)}% Negative` }
                        </div>
                      </div>
                    )
                  }

                  {
                    summarized?.pros && 
                    <div className='w-full flex justify-start items-center flex-col gap-2'>
                      
                      <div className='w-full h-auto py-2 text-gray-800 rounded-xl bg-white border-2 border-gray-200 shadow-sm flex justify-center items-center'>
                        <p className='font-bold text-[16px] md:text-[18px]'> Avg Rating: <span className='text-red-600'> {Math.ceil(summarized?.ratingScore)}<span>⭐</span> <span className='text-[12px] font-medium text-gray-500'> (out of 5) </span> </span> </p>
                      </div>
                      
                      <div className='bg-green-50 w-full border-2 border-green-200 px-3.5 py-2.5 rounded-xl shadow-sm'>
                        <p className='text-[13px] font-bold text-green-600 flex items-start gap-2'> 
                          <span className='shrink-0'>＋</span>
                          <span className='text-[12px] font-medium text-gray-700 leading-snug'> { summarized?.pros } </span>
                        </p>
                      </div>

                      {
                        summarized?.cons ? (
                          <div className='bg-red-50 w-full border-2 border-red-200 px-3.5 py-2.5 rounded-xl shadow-sm'>
                            <p className='text-[13px] font-bold text-red-600 flex items-start gap-2'> 
                              <span className='shrink-0'>－</span>
                              <span className='text-[12px] font-medium text-gray-700 leading-snug'> { summarized?.cons } </span>
                            </p>
                          </div>
                        ) : (
                          <div className='bg-green-50 w-full border-2 border-green-200 px-3.5 py-2.5 rounded-xl shadow-sm'>
                            <p className='text-[13px] font-bold text-green-600 flex items-center gap-2'> 
                              <span className='shrink-0'>✓</span>
                              <span className='text-[12px] font-medium text-gray-700'> No negative reviews reported </span>
                            </p>
                          </div>
                        )
                      }

                      <div className='bg-white w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 shadow-sm'>
                        <p className='text-[13px] font-bold text-gray-900 flex items-start gap-2'> 
                          <span className='w-1.5 h-5 bg-red-600 rounded-full shrink-0'></span>
                          <span> Verdict: <span className='text-[12px] font-medium text-gray-700 leading-snug'> { summarized?.verdict } </span> </span>
                        </p>
                      </div>
                    </div>
                  }

                </div>

                <button onClick={() => SummarizeReviews(cardDetails._id)} className='w-full py-3 bg-linear-to-r from-red-600 to-red-500 text-white text-[14px] rounded-full cursor-pointer text-nowrap flex text-center items-center justify-center gap-2 font-semibold shadow-md shadow-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 shrink-0'>
                  <PiSparkleLight className='text-[16px]'/> { isSummarizing ? <Loader /> : 'Summarize with AI' }
                </button>

            </div>

          </div>
      }            
    
    </div>
    
  )
}

export default ViewCard
