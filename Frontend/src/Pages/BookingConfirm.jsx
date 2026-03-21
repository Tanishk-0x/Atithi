import React, { useContext, useState } from 'react'
import { GiConfirmed } from "react-icons/gi";
import { IoMdArrowBack } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { LuBuilding } from "react-icons/lu";
import { CiCalendarDate } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { useParams } from 'react-router-dom';
import { userDataContext } from '../Context/UserContext';
import { reviewDataContext } from '../Context/ReviewContext';
import { FaWhatsapp } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { IoSadOutline } from "react-icons/io5";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { BsEmojiNeutral } from "react-icons/bs";
import { IoHappyOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { bookingDataContext } from '../Context/BookingContext';
import { ImCancelCircle } from "react-icons/im";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import Loader from '../Components/Loader';
import toast from 'react-hot-toast'; 

const BookingConfirm = () => {


    // to fetch id from params (URL) 
    const {id} = useParams(); 
    const { userData } = useContext(userDataContext); 

    const { 
        feedback , setFeedback , 
        rating , setRating , 
        isAddingReview , 
        HandleAddReview ,
        showReviewPopUp ,
        setShowReviewPopUp
    } = useContext(reviewDataContext); 

    const {
        CancelBooking , 
        isCancelling , 
    } = useContext(bookingDataContext); 

    // filter booking 
    const booking = userData?.booking?.find(itr => itr._id === id);

    if(!booking){
        return (
            <div>
                Unable to Fetch ... 
            </div>
        )
    }

    const [imagePath , setImagePath] = useState(booking?.listing?.image1); 

    const SetImage = (path) => {
        setImagePath(path); 
    }

    // ----------- Handle Whatsapp Connect ------------
    const HandleWhatsappConnect = (phone , title) => {
        const phoneno = Number(phone); 
        // create message , embeded url , redirect 
        toast.success("Redirecting to whatsapp"); 
        const msg = `Hi! I'have booked a listing: ${title} ` ; 
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}` ; 
        window.open(url , "_blank") ; 
    }

    // --------- Handle Cancel Booking ---------
    const HandleCancelBooking = (id) => {
        if(booking.status && booking.status === 'cancelled'){
            toast.error("Booking Has Already Cancelled!"); 
            return ; 
        }
        else{
            CancelBooking(id); 
        }
    }


  return (

    <div className='relative w-full h-auto md:h-screen flex flex-col items-center justify-start'>

        <div className='w-[90%] h-auto md:h-[12%] mt-4 relative px-3 flex justify-center items-center rounded-lg shadow-md shadow-gray-600 py-6 md:py-0'>
            <div className='hidden md:flex bg-red-500 cursor-pointer h-[50px] text-[24px] w-[50px] rounded-full absolute top-3 left-3 justify-center items-center'>
                <IoMdArrowBack />
            </div>

            <div className='h-full w-full md:w-[60%] flex justify-center items-center flex-col'>
                <div className='text-[22px] md:text-[35px] font-semibold font-mono flex gap-2 flex-row items-center justify-center text-center'> Booking Confirmed <GiConfirmed /> </div>
                <p className='text-[14px] md:text-[18px] text-center'> Your stay has been approved by host</p>
            </div>

            <div className='hidden md:flex bg-[#f4f4f4] h-[50px] w-[180px] absolute top-4 right-3 rounded-lg justify-center items-center border border-gray-600'>
                <div className='flex flex-row gap-1 items-center justify-center text-[18px]'>
                    Status: <GiConfirmed className='text-green-500'/> <span className='text-green-500 font-semibold'> {booking.status} </span>
                </div>
            </div>
        </div>

        <div className='w-[90%] h-auto md:h-[82%] mt-4 rounded-lg flex flex-col md:flex-row gap-1 overflow-hidden mb-10 md:mb-0'>
            <div className='h-auto md:h-full w-full md:w-[50%] flex flex-col justify-start items-center gap-1 pb-4 md:pb-0'>
                <div className='w-[95%] h-[250px] md:h-[60%] flex items-center justify-center mt-2 rounded-2xl shadow-sm shadow-gray-600'>
                    <img src={imagePath} alt=""
                        className='w-[95%] h-[92%] object-cover rounded-lg'
                    />
                </div>

                <div className='w-[95%] h-auto md:h-[18%] flex flex-wrap md:flex-row items-center justify-center md:justify-start px-4 gap-2 py-2 md:py-0 shadow-sm shadow-gray-600 rounded-lg overflow-y-auto'>
                    <div onClick={() => SetImage(booking?.listing?.image1)} className='flex justify-center items-center w-20 h-20 md:w-[150px] md:h-[95%] rounded-lg shadow-sm shadow-gray-400 border-2 border-gray-600 cursor-pointer hover:border-[red]'>
                        <img src={booking?.listing?.image1} alt="" className='w-[95%] h-[94%] object-cover rounded-lg' />
                    </div>

                    <div onClick={() => SetImage(booking?.listing?.image2)} className='flex justify-center items-center w-20 h-20 md:w-[150px] md:h-[95%] rounded-lg shadow-sm shadow-gray-400 border-2 border-gray-600 cursor-pointer hover:border-[red]'>
                        <img src={booking?.listing?.image2} alt="" className='w-[95%] h-[94%] object-cover rounded-lg' />
                    </div>

                    <div onClick={() => SetImage(booking?.listing?.image3)} className='flex justify-center items-center w-20 h-20 md:w-[150px] md:h-[95%] rounded-lg shadow-sm shadow-gray-400 border-2 border-gray-600 cursor-pointer hover:border-[red]'>
                        <img src={booking?.listing?.image3} alt="" className='w-[95%] h-[94%] object-cover rounded-lg' />
                    </div>
                </div>

                <div className='w-[95%] h-auto py-2 md:h-[22%] flex flex-col items-center justify-center'>
                    <div className='w-[95%] h-auto md:h-[60%] flex items-center justify-center flex-col py-1 md:py-0'>
                        <div className='text-[14px] md:text-[18px] w-full flex items-center justify-between px-2'>
                            <p className='flex flex-row items-center gap-2'> <CiUser className='text-[red]'/> Host Name: </p>
                            <p className='font-semibold'> {booking?.host?.name} </p>
                        </div>

                        <div className='text-[14px] md:text-[18px] w-full flex items-center justify-between px-2'>
                            <p className='flex flex-row items-center gap-2'> <FiPhone className='text-[red]'/> Contact Number: </p>
                            <p className='font-semibold'> +91 {booking?.host?.phone}</p>
                        </div>
                    </div>

                    <div className='w-[95%] h-auto md:h-[25%] mt-1 text-center md:text-left px-2'>
                        <p className='text-[12px] md:text-[16px]'>
                            <span className='font-semibold'>Security Note: </span> 
                            <span> Show passcode at time of checkin </span>
                        </p>
                    </div>
                </div>


            </div>

            <div className='h-auto md:h-full w-full md:w-[50%] flex justify-start items-center flex-col pb-4 md:pb-0'>
                
                <div className='w-[95%] mt-2 py-2 border-b border-gray-500 flex justify-center items-center gap-1 flex-col'>
                    <div className='w-full text-[14px] md:text-[18px] flex justify-between items-center px-2'>
                        <div className='flex flex-row gap-1 items-center justify-center'>
                            <PiBuildingOfficeLight className='text-[red]'/> Listing Title 
                        </div>
                        <p className='font-semibold'> {booking?.listing?.title} </p>
                    </div>
                    <div className='w-full text-[14px] md:text-[18px] flex justify-between items-center px-2'>
                        <div className='flex flex-row gap-1 items-center justify-center'>
                            <IoLocationOutline className='text-[red]'/> City / Landmark 
                        </div>
                        <p className='font-semibold'> {`${booking?.listing?.landmark} - ${booking?.listing?.city}`} </p>
                    </div>
                </div>

                <div className='w-[95%] py-2 border-b border-gray-500 flex justify-center items-center gap-1 flex-col'>
                    <div className='w-full text-[14px] md:text-[18px] flex justify-between items-center px-2'>
                        <div className='flex flex-row gap-1 items-center justify-center'>
                            <FaRegUser className='text-[red]'/> Guest Name 
                        </div>
                        <p className='font-semibold'> {userData?.name} </p>
                    </div>
                    <div className='w-full text-[14px] md:text-[18px] flex justify-between items-center px-2'>
                        <div className='flex flex-row gap-1 items-center justify-center'>
                            <MdOutlineMail className='text-[red]'/> Guest Email
                        </div>
                        <p className='font-semibold'> {userData?.email} </p>
                    </div>
                </div>

                <div className='w-[95%] py-2 border-b-2 border-gray-500 flex justify-center items-center gap-1 flex-col'>
                    <div className='w-full text-[14px] md:text-[18px] flex justify-between items-center px-2'>
                        <div className='flex flex-row gap-1 items-center justify-center'>
                            <LuBuilding className='text-[red]'/> Booking Id 
                        </div>
                        <p className='font-semibold'> {`BD-${booking._id?.slice(-8).toUpperCase()}`} </p>
                    </div>
                    <div className='w-full text-[14px] md:text-[18px] flex justify-between items-center px-2'>
                        <div className='flex flex-row gap-1 items-center justify-center'>
                            <CiCalendarDate className='text-[red]'/> Check-in Date
                        </div>
                        <p className='font-semibold'>  {booking?.checkIn?.split('T')[0]} </p>
                    </div>
                    <div className='w-full text-[14px] md:text-[18px] flex justify-between items-center px-2'>
                        <div className='flex flex-row gap-1 items-center justify-center'>
                            <CiCalendarDate className='text-[red]'/> Check-out Date
                        </div>
                        <p className='font-semibold'>  {booking?.checkOut?.split('T')[0]} </p>
                    </div>
                    <div className='w-full text-[14px] md:text-[18px] flex justify-between items-center px-2'>
                        <div className='flex flex-row gap-1 items-center justify-center'>
                            <FiUsers className='text-[red]'/> Guest Allowed
                        </div>
                        <p className='font-semibold'>  {booking.listing?.maxGuestAllowed} Adult </p>
                    </div>
                    <div className='w-full text-[14px] md:text-[18px] flex justify-between items-center px-2'>
                        <div className='flex flex-row gap-1 items-center justify-center'>
                            <FaIndianRupeeSign className='text-[red]'/> Rent per day
                        </div>
                        <p className='font-semibold'>  {`${booking?.listing?.rent}/-`} </p>
                    </div>
                </div>

                <div className='w-[95%] mt-2 py-2 text-[20px] md:text-[28px] flex items-center px-2 gap-2'>
                    <div className='flex flex-row gap-1 items-center justify-center'>
                        <IoWalletOutline className='text-[red] font-semibold'/>
                        <span className='font-semibold'> 
                            Total Rent: 
                        </span> 
                    </div>
                    <p className='text-[18px] md:text-[22px] font-semibold flex flex-row items-center text-red-500'><FaIndianRupeeSign/> {booking?.totalRent} </p>
                </div>

                <div className='bg-red-100 w-[95%] h-[60px] md:h-[70px] gap-2 font-semibold text-[18px] md:text-[26px] mt-2 rounded-2xl border-2 border-red-500 flex justify-center md:justify-start items-center px-4 md:px-10 flex-row'>
                    <div className='flex flex-row items-center gap-2'> <IoKeyOutline /> Passcode: </div> 
                    <p> <span className='text-[red]'> {booking?.passCode} </span> </p>
                </div>

                <div className='w-[95%] flex items-center justify-between mt-2'>
                    <button onClick={() => HandleWhatsappConnect( booking.host?.phone , booking.listing?.title)} className='bg-red-600 text-white flex justify-center items-center font-semibold w-[32%] py-3 rounded-lg cursor-pointer hover:bg-red-500 text-[14px] md:text-[18px] transition-all active:scale-95'>
                        <FaWhatsapp className='font-semibold'/> Whatsapp
                    </button>

                    <button onClick={() => setShowReviewPopUp(true)}
                     className='bg-red-600 text-white flex justify-center items-center font-semibold w-[32%] py-3 rounded-lg cursor-pointer hover:bg-red-500 text-[14px] md:text-[18px] transition-all active:scale-95'>
                        <VscFeedback className='font-semibold'/> Review
                    </button>

                    <button onClick={() => HandleCancelBooking(booking._id)}  className='bg-red-600 text-white flex justify-center items-center font-semibold w-[32%] py-3 rounded-lg cursor-pointer hover:bg-red-500 text-[14px] md:text-[18px] transition-all active:scale-95'>
                        <ImCancelCircle className='font-semibold'/> { isCancelling ? <Loader /> : 'Cancel' }
                    </button>
                </div>


            </div>
        </div>

        {/* ------------ Review PopUp ----------- */}
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

                <button onClick={() => HandleAddReview(booking?.listing._id)} disabled={isAddingReview}  className='bg-teal-600 w-[95%] h-[50px] rounded-lg text-[white] text-[18px] font-semibold cursor-pointer hover:bg-teal-700 flex text-center justify-center items-center'>
                    { isAddingReview ? <Loader /> : 'Submit Review' }
                </button>

            </div>
        }

    </div>
  )

}

export default BookingConfirm
