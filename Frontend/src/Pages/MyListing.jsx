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
    
    <div className='w-screen min-h-screen flex items-center justify-start flex-col gap-[50px] relative'>
      
        <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[1%] left-5 absolute md:top-[3%]'>
            <button onClick={() => navigate('/')} className='cursor-pointer'><FaArrowLeftLong /></button>
        </div>

        <div className='bg-[#FAF9F6] mt-5 w-[90%] h-[70px] rounded-lg shadow-md shadow-gray-500 flex justify-center items-center text-[34px] font-mono font-semibold'>
            MY LISTINGS
        </div>

        {
            userData.listing.length > 0 ? (
                <div className='w-full h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-2 md:mt-[18px]'>
                    {
                    userData.listing.map((list) => (
                        <Card 
                            title={list.title} 
                            landmark={list.landmark}
                            city={list.city}
                            image1={list.image1}
                            image2={list.image2}
                            image3={list.image3}
                            rent={list.rent}
                            id={list._id}
                            isBooked={list.isBooked}
                            host={list.host}
                            ratings={list.ratings}
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
