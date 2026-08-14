import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { GiFamilyHouse } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";
import { BsShop } from "react-icons/bs";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { FaTreeCity } from "react-icons/fa6";
import { GiWoodCabin } from "react-icons/gi";
import { listingDataContext } from '../Context/ListingContext';
import { GiCampingTent } from 'react-icons/gi' ;


const ListingPage2 = () => {

    const navigate = useNavigate() ; 

    // Destructuring the values
    const {
        category , 
        setCategory
    } = useContext(listingDataContext); 

    return (

        <div className='w-full h-screen bg-white flex items-center justify-center relative overflow-auto'>

        <div className='h-11 w-11 bg-linear-to-r from-red-600 to-red-500 shadow-md shadow-red-500/40 rounded-full flex justify-center items-center top-[5%] left-5 absolute'>
            <button className='cursor-pointer text-white' onClick={() => navigate('/listingpage1')}><FaArrowLeftLong /></button>
        </div>

        <div className='px-5 py-2.5 text-[14px] md:text-[16px] bg-linear-to-r from-red-600 to-red-500 text-white flex items-center justify-center rounded-full fixed top-5 right-5 shadow-md shadow-red-500/40 cursor-pointer font-semibold z-10'>
        Select Category
        </div>

        <div className='max-w-[900px] w-full h-[550px] overflow-auto  flex items-center justify-start flex-col gap-4 md:gap-10 mt-[30px]'>
            <h1 className='text-[18px] px-2.5 text-[black] mt-5 md:mt-0 md:text-[30px] font-semibold text-center'>
                Which of these best describes your place?
            </h1>


            <div className='max-w-[900px] w-[95%] h-[420px] md:h-full flex items-center justify-center flex-wrap gap-[15px] md:w-[70%] '>

                <div onClick={() => setCategory("villa")} 
                className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col gap-1.5 cursor-pointer border-2 border-[#e2e2e2] hover:border-red-400 hover:shadow-md hover:shadow-red-500/10 hover:-translate-y-0.5 text-[16px] rounded-xl transition-all duration-200 ${ category == "villa" ? 'border-2 border-red-500 bg-red-50 shadow-md shadow-red-500/10' : '' } `}>
                    <GiFamilyHouse className={`w-[30px] h-[30px] ${ category == "villa" ? 'text-red-500' : 'text-[black]' }`}/> 
                    <h3>Villa</h3>
                </div>

                <div onClick={() => setCategory("farm house")} 
                className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col gap-1.5 cursor-pointer border-2 border-[#e2e2e2] hover:border-red-400 hover:shadow-md hover:shadow-red-500/10 hover:-translate-y-0.5 text-[16px] rounded-xl transition-all duration-200 ${ category == "farm house" ? 'border-2 border-red-500 bg-red-50 shadow-md shadow-red-500/10' : '' } `}>
                    <FaTreeCity className={`w-[30px] h-[30px] ${ category == "farm house" ? 'text-red-500' : 'text-[black]' }`}/> 
                    <h3>Farm House</h3>
                </div>

                <div onClick={() => setCategory("pool house")} 
                className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col gap-1.5 cursor-pointer border-2 border-[#e2e2e2] hover:border-red-400 hover:shadow-md hover:shadow-red-500/10 hover:-translate-y-0.5 text-[16px] rounded-xl transition-all duration-200 ${ category == "pool house" ? 'border-2 border-red-500 bg-red-50 shadow-md shadow-red-500/10' : '' } `}>
                    <MdOutlinePool className={`w-[30px] h-[30px] ${ category == "pool house" ? 'text-red-500' : 'text-[black]' }`}/> 
                    <h3>Pool House</h3>
                </div>

                <div onClick={() => setCategory("rooms")} 
                className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col gap-1.5 cursor-pointer border-2 border-[#e2e2e2] hover:border-red-400 hover:shadow-md hover:shadow-red-500/10 hover:-translate-y-0.5 text-[16px] rounded-xl transition-all duration-200 ${ category == "rooms" ? 'border-2 border-red-500 bg-red-50 shadow-md shadow-red-500/10' : '' } `}>
                    <MdBedroomParent className={`w-[30px] h-[30px] ${ category == "rooms" ? 'text-red-500' : 'text-[black]' }`}/> 
                    <h3>Rooms</h3>
                </div>

                <div onClick={() => setCategory("flat")} 
                className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col gap-1.5 cursor-pointer border-2 border-[#e2e2e2] hover:border-red-400 hover:shadow-md hover:shadow-red-500/10 hover:-translate-y-0.5 text-[16px] rounded-xl transition-all duration-200 ${ category == "flat" ? 'border-2 border-red-500 bg-red-50 shadow-md shadow-red-500/10' : '' } `}>
                    <MdOutlineMapsHomeWork className={`w-[30px] h-[30px] ${ category == "flat" ? 'text-red-500' : 'text-[black]' }`}/> 
                    <h3>Flat</h3>
                </div>

                <div onClick={() => setCategory("hostel")} 
                className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col gap-1.5 cursor-pointer border-2 border-[#e2e2e2] hover:border-red-400 hover:shadow-md hover:shadow-red-500/10 hover:-translate-y-0.5 text-[16px] rounded-xl transition-all duration-200 ${ category == "pg" ? 'border-2 border-red-500 bg-red-50 shadow-md shadow-red-500/10' : '' } `}>
                    <IoBedOutline className={`w-[30px] h-[30px] ${ category == "pg" ? 'text-red-500' : 'text-[black]' }`}/> 
                    <h3>Hostel</h3>
                </div>

                <div onClick={() => setCategory("campsite")} 
                className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col gap-1.5 cursor-pointer border-2 border-[#e2e2e2] hover:border-red-400 hover:shadow-md hover:shadow-red-500/10 hover:-translate-y-0.5 text-[16px] rounded-xl transition-all duration-200 ${ category == "shops" ? 'border-2 border-red-500 bg-red-50 shadow-md shadow-red-500/10' : '' } `}>                        
                <GiCampingTent className={`w-[30px] h-[30px] ${ category == "shops" ? 'text-red-500' : 'text-[black]' }`}/> 
                    <h3>Campsite</h3>
                </div>

                <div onClick={() => setCategory("cabin")} 
                className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col gap-1.5 cursor-pointer border-2 border-[#e2e2e2] hover:border-red-400 hover:shadow-md hover:shadow-red-500/10 hover:-translate-y-0.5 text-[16px] rounded-xl transition-all duration-200 ${ category == "cabin" ? 'border-2 border-red-500 bg-red-50 shadow-md shadow-red-500/10' : '' } `}>
                    <GiWoodCabin className={`w-[30px] h-[30px] ${ category == "cabin" ? 'text-red-500' : 'text-[black]' }`}/> 
                    <h3>Cabin</h3>
                </div>

            </div>

        </div>

        <button disabled={!category} onClick={() => navigate('/listingpage3')} className='px-[50px] py-2.5 bg-linear-to-r from-red-600 to-red-500 text-[white] text-[18px] md:px-[100px] rounded-lg cursor-pointer absolute right-[5%] bottom-[5%] shadow-md shadow-red-500/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200'> Next </button>

    </div>

    )
}

export default ListingPage2
