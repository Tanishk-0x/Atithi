import { useNavigate } from 'react-router-dom';
import { IoStar } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";

const BookingCard = ({ id , listing , status }) => {

  const navigate = useNavigate(); 

  return (

    <div onClick={() => navigate(`/confirm/${id}`)} className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg curson-pointer no-scrollBar relative z-10'>
      
      {/* Status - Tag */}
      { 
        status !== 'rejected' && status !== 'cancelled' ? (
        <div className='text-[green] bg-[white] rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px] '>
          <GiConfirmed className='w-5 h-5'/> {status}
        </div>
        ) : (
          <div className='text-[red] bg-[white] rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px] '>
            <FcCancel className='w-5 h-5'/> {status}
          </div>
        )
      }


      <div className='w-full h-[67%] bg-[#2e2d2d] rounded-lg overflow-auto flex'>
        <img src={listing?.image1} alt="" className='w-full shrink-0' /> 
      </div>

      <div className='w-full h-[33%] py-5 flex flex-col gap-0.5'>
        <div className='flex justify-between items-center text-[18px]'>
          <span className='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>In {listing?.landmark.toUpperCase()},{listing?.city.toUpperCase()} </span>
          
          <span className='flex items-center justify-center gap-1'><IoStar className='text-[#eb6262]'/>{listing?.ratings}</span>
        </div>

        <span className='text-[15px] w-[80%] text-ellipsis overflow-hidden text-nowrap'> {listing?.title.toUpperCase()} </span>
        <span className='text-[16px] font-semibold text-[#986b6b]'> ₹{listing?.rent}/day</span>
      </div>

    </div>

  )
}

export default BookingCard
