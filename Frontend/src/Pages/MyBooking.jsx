import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { userDataContext } from '../Context/UserContext';
import BookingCard from '../Components/BookingCard';

const MyBooking = () => {

    const navigate = useNavigate(); 

    const {userData} = useContext(userDataContext);
    

    return (

        <div className='w-screen min-h-screen flex items-center justify-start flex-col gap-[50px] relative'>
        
            <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[1%] left-5 absolute md:top-[3%]'>
                <button onClick={() => navigate('/')} className='cursor-pointer'><FaArrowLeftLong /></button>
            </div>

            <div onClick={() => console.log("DATA->>" , userData)} className='w-[50%] h-[10%] border-2 border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-5 md:w-[600px]'>
                MY BOOKING
            </div>

            <div className='w-full h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]'>
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
                        <div className="flex flex-col items-center gap-4 mt-20">
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

        </div>

    )
}

export default MyBooking
