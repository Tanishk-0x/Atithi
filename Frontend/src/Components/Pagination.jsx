import React, { useContext } from 'react'
import { listingDataContext } from '../Context/ListingContext'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const Pagination = () => {

    const {
        page , setPage ,
        totalPages , 
    } = useContext(listingDataContext); 

  return (

    <div className='w-[90%] h-11   flex justify-center items-center'>
      <div className='flex flex-row gap-3 items-center bg-white px-3 py-1.5 rounded-full border-2 border-gray-200 shadow-sm'>
        
        <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1} className='bg-linear-to-r from-red-600 to-red-500 disabled:from-gray-200 disabled:to-gray-200 disabled:shadow-none px-1.5 py-1.5 rounded-full cursor-pointer disabled:cursor-not-allowed text-[white] disabled:text-gray-400 font-semibold text-[20px] shadow-md shadow-red-500/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 active:scale-90 flex justify-center items-center'>
            <MdOutlineKeyboardDoubleArrowLeft />
        </button>

        <div className='px-2 py-1 text-[15px] font-mono font-semibold text-gray-700'>
            <p> Page <span className='text-red-500'>{page}</span> of {totalPages} </p>
        </div>

        <button onClick={() => setPage(prev => prev + 1)} disabled={page === totalPages} className='bg-linear-to-r from-red-600 to-red-500 disabled:from-gray-200 disabled:to-gray-200 disabled:shadow-none px-1.5 py-1.5 rounded-full  cursor-pointer disabled:cursor-not-allowed text-[white] disabled:text-gray-400 font-semibold text-[20px] shadow-md shadow-red-500/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 active:scale-90 flex justify-center items-center'>
            <MdOutlineKeyboardDoubleArrowRight />
        </button>

      </div>
    </div>

  )
}

export default Pagination
