import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { userDataContext } from '../Context/UserContext';
import BookingCard from '../Components/BookingCard';
import Footer from '../Components/Footer';

const MyBooking = () => {

    const navigate = useNavigate(); 

    const {userData} = useContext(userDataContext);
    

    return (

        <div className='w-screen min-h-screen flex items-center justify-start flex-col gap-[50px] relative'>
        
            <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[1%] left-5 absolute md:top-[3%]'>
                <button onClick={() => navigate('/')} className='cursor-pointer'><FaArrowLeftLong /></button>
            </div>

            <div className='mt-5 w-[90%] h-[70px] rounded-lg shadow-md shadow-gray-500 flex justify-center items-center text-[34px] font-mono font-semibold'>
                MY BOOKINGS
            </div>

            <div className='w-full h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-2 md:mt-[18px]'>
                { userData?.booking?.length > 0 ?
                    (
                        userData.booking.map((item) => (
                            <BookingCard 
                                key={item._id}
                                id={item._id}
                                status={item.status}
                                listing={item.listing}
                            />
                        ))
                    ) : 
                    (
                        <div className="flex flex-col items-center gap-4 md:h-[400px] w-full justify-center">
                            <p className="text-gray-400 text-xl font-medium">You haven't booked anything yet.</p>
                            <button 
                                onClick={() => navigate('/')}
                                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600"
                            >
                                Explore Properties
                            </button>
                        </div>
                    ) 
                }
            </div>

            <Footer /> 

        </div>

    )
}

export default MyBooking
