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

const ListingPage2 = () => {

    const navigate = useNavigate() ; 

    // Destructuring the values
    const {
        category , 
        setCategory
    } = useContext(listingDataContext); 

    return (

        <div className='w-full h-screen bg-white flex items-center justify-center relative overflow-auto'>
        
            <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[5%] left-5 absolute'>
                <button className='cursor-pointer' onClick={() => navigate('/listingpage1')}><FaArrowLeftLong /></button>
            </div>
            <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute top-[5%] right-2.5 shadow-lg cursor-pointer'>
                SetUp Your Category
            </div>

            <div className='max-w-[900px] w-full h-[550px] overflow-auto  flex items-center justify-start flex-col gap-4 md:gap-10 mt-[30px]'>
                <h1 className='text-[18px] px-2.5 text-[black] mt-5 md:mt-0 md:text-[30px]'>
                    Which of these best describes your place?
                </h1>


                <div className='max-w-[900px] w-[95%] h-[420px] md:h-full flex items-center justify-center flex-wrap gap-[15px] md:w-[70%] '>

                    <div onClick={() => setCategory("villa")} 
                    className={` w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg ${ category == "villa" ? 'border-3 border-[#8b8b8b]' : '' } `}>
                        <GiFamilyHouse className='w-[30px] h-[30px] text-[black]'/> 
                        <h3>Villa</h3>
                    </div>

                    <div onClick={() => setCategory("farm house")} 
                    className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg ${ category == "farm house" ? 'border-3 border-[#8b8b8b]' : '' } `}>
                        <FaTreeCity className='w-[30px] h-[30px] text-[black]'/> 
                        <h3>Farm House</h3>
                    </div>

                    <div onClick={() => setCategory("pool house")} 
                    className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg ${ category == "pool house" ? 'border-3 border-[#8b8b8b]' : '' } `}>
                        <MdOutlinePool className='w-[30px] h-[30px] text-[black]'/> 
                        <h3>Pool House</h3>
                    </div>

                    <div onClick={() => setCategory("rooms")} 
                    className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg ${ category == "rooms" ? 'border-3 border-[#8b8b8b]' : '' } `}>
                        <MdBedroomParent className='w-[30px] h-[30px] text-[black]'/> 
                        <h3>Rooms</h3>
                    </div>

                    <div onClick={() => setCategory("flat")} 
                    className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg ${ category == "flat" ? 'border-3 border-[#8b8b8b]' : '' } `}>
                        <MdOutlineMapsHomeWork className='w-[30px] h-[30px] text-[black]'/> 
                        <h3>Flat</h3>
                    </div>

                    <div onClick={() => setCategory("pg")} 
                    className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg ${ category == "pg" ? 'border-3 border-[#8b8b8b]' : '' } `}>
                        <IoBedOutline className='w-[30px] h-[30px] text-[black]'/> 
                        <h3>PG</h3>
                    </div>

                    <div onClick={() => setCategory("cabin")} 
                    className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg ${ category == "cabin" ? 'border-3 border-[#8b8b8b]' : '' } `}>
                        <GiWoodCabin className='w-[30px] h-[30px] text-[black]'/> 
                        <h3>Cabin</h3>
                    </div>

                    <div onClick={() => setCategory("shops")} 
                    className={`w-[120px] h-20 md:w-[180px] md:h-[100px] flex justify-center items-center flex-col cursor-pointer border-2 border-[#c7c7c7] hover:border-[#a6a5a5] text-[16px] rounded-lg ${ category == "shops" ? 'border-3 border-[#8b8b8b]' : '' } `}>                        <BsShop className='w-[30px] h-[30px] text-[black]'/> 
                        <h3>Shops</h3>
                    </div>

                </div>

            </div>

            <button disabled={!category} onClick={() => navigate('/listingpage3')} className='px-[50px] py-2.5 bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg cursor-pointer absolute right-[5%] bottom-[5%]'> Next </button>


        </div>

    )
}

export default ListingPage2
