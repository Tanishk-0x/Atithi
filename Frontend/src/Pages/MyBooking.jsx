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

        <div className='bg-[#F3F1EC] w-screen min-h-screen flex items-center justify-start flex-col gap-[50px] relative'>

            <style>{`
            @keyframes fadeUp {
                from { transform: translateY(24px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .fade-up { animation: fadeUp 0.5s ease-out both; }
            `}</style>

            {/* ----------- Header ------------ */}
            <div className='w-full mt-4 md:mt-6 px-5 md:px-10 flex items-center justify-between fade-up'>

                <button onClick={() => navigate('/')} className='h-11 w-11 shrink-0 bg-white border border-gray-200 rounded-full flex justify-center items-center shadow-sm shadow-gray-300 cursor-pointer text-gray-700 transition-all duration-300 hover:bg-linear-to-r hover:from-red-600 hover:to-red-500 hover:text-white hover:border-transparent hover:shadow-md hover:shadow-red-500/30 hover:-translate-x-0.5'>
                    <FaArrowLeftLong />
                </button>

                <div className='flex flex-col items-center gap-1'>
                    <p className='text-[24px] md:text-[34px] font-mono font-semibold text-gray-900 flex items-center gap-3 tracking-tight'>
                        <span className='w-1.5 h-7 bg-red-600 rounded-full hidden md:inline-block'></span>
                        MY BOOKINGS
                    </p>
                    <span className='text-[12px] md:text-[13px] text-gray-400 font-medium'>
                        {userData?.booking?.length || 0} {userData?.booking?.length === 1 ? 'booking' : 'bookings'} found
                    </span>
                </div>

                <div className='h-11 w-11 shrink-0'></div>

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
