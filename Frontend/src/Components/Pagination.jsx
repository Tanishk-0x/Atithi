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

    <div className='w-[90%] h-[72px] border-t border-gray-400 flex justify-center items-center'>
      <div className='flex flex-row gap-1'>
        
        <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1} className='bg-gray-300 px-1 py-1 rounded-lg cursor-pointer text-[white] font-semibold text-[24px] hover:bg-gray-400 flex justify-center items-center'>
            <MdOutlineKeyboardDoubleArrowLeft />
        </button>

        <div className='px-2 py-1 text-[18px]'>
            <p> Page {page} of {totalPages} </p>
        </div>

        <button onClick={() => setPage(prev => prev + 1)} disabled={page === totalPages} className='bg-gray-300 px-1 py-1 rounded-lg  cursor-pointer text-[white] font-semibold text-[24px] hover:bg-gray-400 flex justify-center items-center'>
            <MdOutlineKeyboardDoubleArrowRight />
        </button>

      </div>
    </div>

  )
}

export default Pagination
