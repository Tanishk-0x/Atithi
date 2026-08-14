import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { userDataContext } from '../Context/UserContext';
import Card from '../Components/Card';
import Footer from '../Components/Footer';

const MyListing = () => {

    const navigate  = useNavigate(); 

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
                    MY LISTINGS
                </p>
                <span className='text-[12px] md:text-[13px] text-gray-400 font-medium'>
                    {userData.listing.length} {userData.listing.length === 1 ? 'property' : 'properties'} listed
                </span>
            </div>

            <div className='h-11 w-11 shrink-0'></div>

        </div>

        {
            userData.listing.length > 0 ? (
                <div className='w-full h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-2 md:mt-[18px]'>
                    {
                    userData.listing.map((list) => (
                        <Card key={list._id}
                            title={list.title} 
                            landmark={list.landmark}
                            city={list.city}
                            image1={list.image1}
                            image2={list.image2}
                            image3={list.image3}
                            rent={list.rent}
                            id={list._id}
                            host={list.host}
                            ratings={list.ratings}
                            viewCount={list.viewCount}
                            createdAt={list.createdAt}
                        />
                    )) 
                    }
                </div>
            ) : (
                <div className='w-[90%] md:h-[420px] text-center text-gray-400 text-xl font-medium flex flex-col justify-center items-center gap-2'>
                    You haven't list anything yet.
                    <button onClick={() => navigate('/listingpage1')} className='bg-red-500 text-[16px] text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600'>
                        List Your Property
                    </button>
                </div>
            )
        }
        

        <Footer />

    </div>

    
  )
}

export default MyListing
