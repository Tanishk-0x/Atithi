import React, { useContext, useState } from 'react'
import { userDataContext } from '../Context/UserContext'
import { listingDataContext } from '../Context/ListingContext';
import { useNavigate } from 'react-router-dom';
import { IoStar } from "react-icons/io5";
import { MdNewReleases } from "react-icons/md";
import { IoDiamond } from "react-icons/io5";
import { HiBadgeCheck } from "react-icons/hi";


const Card = ({title, landmark, city, image1, image2, image3, rent, id, ratings, viewCount , createdAt}) => {

  const navigate = useNavigate(); 

  const {userData} = useContext(userDataContext);
  const {HandleViewCard} = useContext(listingDataContext);

  const HandleClick = () => {
    if(userData){
      HandleViewCard(id);
    }
    else{
      navigate('/login');
    }
  }

  // ---------- Calculate for tags ----------
  const isNew = ( new Date() - new Date(createdAt) ) / (1000*60*60*24) < 2 ; 
  const isRare = ratings >= 4.5 && viewCount >= 20 ; 
  const isTopRated = ratings >= 4.2 && !isRare ; 
  const isPopular = viewCount > 20 && !isRare ; 

  return (

    <div onClick={HandleClick} className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg curson-pointer no-scrollBar relative z-10'>
      
      {/* --- Tags --- */}
      {
        isNew && (
          <div className='text-indigo-500 bg-[white] rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px] border-2 border-indigo-400'>
            <MdNewReleases className='w-5 h-5'/> Recently Listed
          </div>
        )
      }
      {
        isRare && (
          <div className='text-amber-500 bg-[white] rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px] border-2 border-amber-400'>
            <IoDiamond className='w-5 h-5'/> Rare Find
          </div>
        )
      }
      {
        isTopRated && (
          <div className='text-rose-500 bg-[white] rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px] border-2 border-rose-400'>
            <HiBadgeCheck className='w-5 h-5'/> Top Rated 
          </div>
        )
      }
      {
        isPopular && (
          <div className='text-green-500 bg-[white] rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px] border-2 border-green-400'>
            <HiBadgeCheck className='w-5 h-5'/> Popular 
          </div>
        )
      }


      <div className='w-full h-[67%] bg-[#2e2d2d] rounded-lg overflow-auto flex'>
        <img src={image1} alt="" className='w-full shrink-0' /> 
        <img src={image2} alt="" className='w-full shrink-0' />
        <img src={image3} alt="" className='w-full shrink-0' />
      </div>

      <div className='w-full h-[33%] py-5 flex flex-col gap-0.5'>
        <div className='flex justify-between items-center text-[18px]'>
          <span className='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>In {landmark.toUpperCase()},{city.toUpperCase()} </span>
          
          <span className='flex items-center justify-center gap-1'><IoStar className='text-[#eb6262]'/>{ratings}</span>
        </div>
        <span className='text-[15px] w-[80%] text-ellipsis overflow-hidden text-nowrap'> {title.toUpperCase()} </span>
        <span className='text-[16px] font-semibold text-[#986b6b]'> ₹{rent}/day</span>
      </div>

    </div>

  )
}

export default Card
