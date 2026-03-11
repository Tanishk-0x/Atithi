import { useContext, useState } from 'react'
import { GiConfirmed } from "react-icons/gi";
import { bookingDataContext } from '../Context/BookingContext';
import { useNavigate } from 'react-router-dom';
import Star from '../Components/Star';
import axios from 'axios' ; 
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import { listingDataContext } from '../Context/ListingContext';
import toast from 'react-hot-toast'; 

const Booked = () => {

    const navigate = useNavigate(); 

    const { serverUrl } = useContext(authDataContext); 
    const { getUserDetails } = useContext(userDataContext); 
    const { getListings , cardDetails } = useContext(listingDataContext); 
    const { bookingData } = useContext(bookingDataContext); 
    const [star , setStar] = useState(null); 

    // Handle Star 
    const handleStar = async (value) => {
        setStar(value); 
        console.log("Rated :" , value); 
    }

    // Handle Rating 
    const HandleRating = async (id) => {
        try {
            const res = await axios.post( serverUrl + `/listing/ratings/${id}` , 
                {ratings : star} , 
                {withCredentials : true}
            ); 
            await getListings(); 
            await getUserDetails(); 
            toast.success(res.data.message); 
            console.log(res.data); 
            navigate('/'); 
        }
        
        catch (error) {
            console.log(error);   
            toast.error('Error While Rating');   
        }
    }

    return (

        <div className='w-screen min-h-screen flex items-center justify-center gap-2.5 bg-slate-200 flex-col'>
            
            <div className='w-[95%] max-w-[500px] h-[400px] bg-[white] flex items-center justify-center border border-[#b5b5b5] flex-col gap-5 p-5 md:w-[80%] rounded-lg'>
                <div onClick={() => console.log("DATA : " , bookingData)} className='w-full h-[50%] text-[20px] flex items-center justify-center flex-col gap-5 font-semibold'>
                    <GiConfirmed className='w-[100px] h-[100px] text-[green]'/>
                    Booking Confirmed
                </div>

                <div className='w-full flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span>Booking Id : </span>
                    <span> {bookingData._id} </span>
                </div>

                <div className='w-full flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span>Owner Detail: </span>
                    <span> {bookingData.host?.email} </span>
                </div> 

                <div className='w-full flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span>Total Rent : </span>
                    <span> {bookingData.totalRent} </span>
                </div>

            </div>

            {/* // Rating Section  */}
            <div className='w-[95%] max-w-[500px] h-[200px] bg-[white] flex items-center justify-center border border-[#b5b5b5] flex-col gap-5 p-5 md:w-[80%] rounded-lg'>
                <h1 className='text-[18px]'>
                    {star} Out Of 5 Rating
                </h1>
                <Star onRate={handleStar}/>
                <button onClick={() => { HandleRating(cardDetails._id) }} className='px-[30px] py-2.5 bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg text-nowrap'>
                    Submit
                </button>
            </div>

            <button onClick={() => navigate('/')} className='px-[30px] py-2.5 bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg text-nowrap absolute top-2.5 right-5'>
                Back to Home
            </button>

        </div>
        
    )
}

export default Booked
