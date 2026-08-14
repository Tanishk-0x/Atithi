import React, { useContext, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { IoMdColorWand } from "react-icons/io";
import toast from 'react-hot-toast';
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import Loader from '../Components/Loader'; 

const ListingPage1 = () => {

    const navigate = useNavigate(); 

    const {serverUrl} = useContext(authDataContext); 

    // Destructuring the values
    const {
      title,setTitle , 
      description,setDescription , 
      rent,setRent , 
      city,setCity , 
      landmark,setLandmark , 
      setFrontEndImage1 , 
      setFrontEndImage2 , 
      setFrontEndImage3 , 
      setBackEndImage1 , 
      setBackEndImage2 , 
      setBackEndImage3 ,
      amenities , setAmenities ,
      points , setPoints , 
      maxGuestAllowed , setMaxGuestAllowed ,
    } = useContext(listingDataContext); 

    // Amenities Data 
    const AmenitiesData = [
      { name: "WiFi" },
      { name: "AC" },
      { name: "Geyser" },
      { name: "RO Water" },
      { name: "Parking" },
      { name: "CCTV" },
      { name: "Lift" },
      { name: "PowerBackup" },
      { name: "Induction" },
      { name: "Microwave" },
      { name: "Washing Machine" },
      { name: "Iron" },
      { name: "FirstAidKit" },
      { name: "EvCharger" },
      { name: "Balcony" },
      { name: "Electric Kettle" },
      { name: "Dedicated Workspace" },
      { name: "Fridge" },
      { name: "Full-Length Mirror" },
      { name: "Wardrobe" },
      { name: "Kitchen Utensils" },
    ];
    

    // Image Set Functions 
    const HandleImage1 = (e) => {
      let file = e.target.files[0] ; 
      setBackEndImage1(file) ; 
      setFrontEndImage1(URL.createObjectURL(file));
    }

    // Image Set Functions 
    const HandleImage2 = (e) => {
      let file = e.target.files[0] ; 
      setBackEndImage2(file) ; 
      setFrontEndImage2(URL.createObjectURL(file));
    }

    // Image Set Functions 
    const HandleImage3 = (e) => {
      let file = e.target.files[0] ; 
      setBackEndImage3(file) ; 
      setFrontEndImage3(URL.createObjectURL(file));
    }

    // --------- Submit Handler ----------
    const SubmitHandler = (e) => {
      e.preventDefault() ; 
      navigate('/listingpage2')
    }

    // ---------- Amenities Handler ----------
    const HandleAmenitiesChange = (e) => {
      const value = e.target.value ; 

      const amenitiesArray = value.split(/[ ,]+/).filter(item => item.trim() !== " ") ; 
      setAmenities(amenitiesArray); 
    }

    // ---------- Toggle Amenities ----------
    const HandleAmenitiesToggle = (val) => {
      // amenities already includes then remove it
      if(amenities.includes(val)){
        setAmenities(amenities.filter(item => item !== val)); 
      }
      // if amenities not includes then add it 
      else {
        setAmenities([...amenities , val]);
      } 
    }

    const [descriptions , setDescriptions] = useState({}); 
    const [generating , setGenerating] = useState(false); 
    const [showPopUp , setShowPopUp] = useState(false); 
    const [point , setPoint] = useState(''); 


    // ---------- Generate Description ----------
    const GenerateDescription = async () => {
      try {

        if(!title || !rent || !city || !landmark || !amenities.length > 0 ){
          toast.error("Fill Out The Details"); 
          return ; 
        }

        setGenerating(true); 
        const data = title + "," + description + "," + rent + "," + city + "," + landmark + "," + amenities + "," + points + "," + maxGuestAllowed ; 
        const res = await axios.post(serverUrl + '/listing/generatedesc' , 
          { searchquery : data } , {withCredentials : true} 
        ); 

        setDescriptions(res.data.desc); 
        toast.success("Description Generated"); 
        setShowPopUp(true); 
        setGenerating(false); 
      }
      
      catch (error) {
        console.log(`Error In Generating Description : ${error}`); 
        toast.error("Error While Generating Description");
        setGenerating(false); 
      }
    }

    // ----------- Points ------------- 
    const HandleKeyDown = (event) => {
      if( event.key === 'Enter' ){
        event.preventDefault(); 
        if( point.trim() !== "" ){
          setPoints(prev => [...prev , point] ); 
          setPoint("");
        }  
      }
    }

    return (
      
      <div className='w-full min-h-screen bg-[#f5f5f4] flex items-center justify-center relative overflow-auto p-5'>

          <style>{`
            @keyframes fadeInDown {
              from { transform: translateY(-8px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes modalRise {
              from { transform: translateY(30px) scale(0.96); opacity: 0; }
              to { transform: translateY(0) scale(1); opacity: 1; }
            }
          `}</style>

          <div onClick={() => navigate('/')} className='h-10 w-10 bg-linear-to-r from-red-600 to-red-500 rounded-full flex justify-center items-center top-5 left-5 fixed text-white shadow-md shadow-red-500/40 cursor-pointer transition-all duration-300 hover:-translate-x-1 hover:scale-110 active:scale-90 z-10'>
            <button className='cursor-pointer'><FaArrowLeftLong /></button>
          </div>

          <div className='px-5 py-2.5 text-[14px] md:text-[16px] bg-linear-to-r from-red-600 to-red-500 text-white flex items-center justify-center rounded-full fixed top-5 right-5 shadow-md shadow-red-500/40 cursor-pointer font-semibold z-10'>
              SetUp Your Home
          </div>

          <form action="" onSubmit={SubmitHandler}
          className='shadow-2xl shadow-gray-500/30 max-w-[900px] w-full bg-[#FAF9F6] p-6 md:p-8 rounded-2xl flex items-start justify-start flex-col gap-5 border-2 border-gray-300 mt-[70px] mb-5 animate-[modalRise_0.35s_ease-out]'>

              <h1 className='font-bold w-full flex items-center py-1 text-[22px] md:text-[25px] text-gray-900 gap-2'>
                <span className='w-1.5 h-6 bg-red-600 rounded-full'></span>
                List Your Property
              </h1>

              <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>

                <div className='w-full flex items-start justify-start flex-col gap-2' >
                  <label htmlFor="title" className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'>Title</label>
                  <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}  placeholder='title' id='title' required className='w-full h-11 md:h-12 border-gray-300 border-2 rounded-lg px-3 bg-white outline-none transition-all duration-300 focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)]' />
                </div>

                <div className='w-full flex items-start justify-start flex-col gap-2' >
                  <label htmlFor="rent" className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'>Rent</label>
                  <input type="number" onChange={(e) => setRent(e.target.value)} value={rent} placeholder='rent' id='rent' required className='w-full h-11 md:h-12 border-gray-300 border-2 rounded-lg px-3 bg-white outline-none transition-all duration-300 focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)]' />
                </div>

              </div>

              <div className='w-full flex items-start justify-start flex-col gap-2 relative' >
                <div className='w-full flex items-center justify-between'>
                  <label htmlFor="description" className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'>Description</label>
                  <button onClick={(e) => { 
                    e.preventDefault() ; 
                    GenerateDescription() ; 
                  }}
                    className='bg-red-50 px-3 py-1.5 rounded-full border-2 border-red-300 text-red-600 text-[12px] font-semibold flex flex-row items-center justify-center cursor-pointer gap-1.5 transition-all duration-300 hover:border-red-500 hover:bg-red-100 disabled:opacity-60 disabled:cursor-not-allowed'
                  >
                    { generating ? <Loader /> : <p className='flex flex-row items-center justify-center gap-1.5'>Generate with AI <span><IoMdColorWand/></span></p> }
                  </button>
                </div>

                {/* ---------- Description PopUp ---------- */}
                {
                  showPopUp && 
                  <div className='w-full mt-1 bg-white border-2 border-red-200 rounded-xl shadow-lg shadow-red-500/10 flex items-center justify-center flex-col gap-2 p-3 animate-[fadeInDown_0.25s_ease-out]'>

                    <p className='w-full text-[11px] font-bold text-red-500 uppercase tracking-wide flex items-center gap-1.5'>
                      <IoMdColorWand/> Pick a Generated Description
                    </p>

                    <div onClick={() => {
                      setDescription(descriptions.desc1) ; 
                      setShowPopUp(false); 
                    }} className='w-full bg-red-50/60 border-2 border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-700 leading-snug cursor-pointer transition-all duration-300 hover:border-red-400 hover:bg-red-50 hover:-translate-y-0.5'>
                      { descriptions.desc1 }
                    </div>

                    <div onClick={() => {
                      setDescription(descriptions.desc2) ; 
                      setShowPopUp(false); 
                    }} className='w-full bg-red-50/60 border-2 border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-700 leading-snug cursor-pointer transition-all duration-300 hover:border-red-400 hover:bg-red-50 hover:-translate-y-0.5'>
                      { descriptions.desc2 }
                    </div>

                    <div onClick={() => {
                      setDescription(descriptions.desc3) ; 
                      setShowPopUp(false); 
                    }} className='w-full bg-red-50/60 border-2 border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-700 leading-snug cursor-pointer transition-all duration-300 hover:border-red-400 hover:bg-red-50 hover:-translate-y-0.5'>
                      { descriptions.desc3 }
                    </div>
                  </div>
                }
                
                <textarea placeholder='description' onChange={(e) => setDescription(e.target.value)} value={description} id='description' required className='w-full h-24 border-gray-300 border-2 rounded-lg px-3 pt-2.5 bg-white outline-none transition-all duration-300 focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)] resize-none' />
              </div>

              <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>

                <div className='w-full flex items-start justify-start flex-col gap-2' >
                  <label htmlFor="img1" className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'>Image1</label>
                  <div className='flex items-center justify-center w-full h-11 md:h-12 border-gray-300 border-2 rounded-lg bg-white overflow-hidden transition-all duration-300 focus-within:border-red-400'>
                    <input type="file" onChange={HandleImage1} id='img1'  className='w-full text-[13px] px-2.5 file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-red-50 file:text-red-600 file:text-[12px] file:font-semibold file:cursor-pointer' />
                  </div>
                </div>

                <div className='w-full flex items-start justify-start flex-col gap-2' >
                  <label htmlFor="img2" className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'>Image2</label>
                  <div className='flex items-center justify-center w-full h-11 md:h-12 border-gray-300 border-2 rounded-lg bg-white overflow-hidden transition-all duration-300 focus-within:border-red-400'>
                    <input type="file" onChange={HandleImage2} id='img2'  className='w-full text-[13px] px-2.5 file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-red-50 file:text-red-600 file:text-[12px] file:font-semibold file:cursor-pointer' />
                  </div>
                </div>

                <div className='w-full flex items-start justify-start flex-col gap-2' >
                  <label htmlFor="img3" className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'>Image3</label>
                  <div className='flex items-center justify-center w-full h-11 md:h-12 border-gray-300 border-2 rounded-lg bg-white overflow-hidden transition-all duration-300 focus-within:border-red-400'>
                    <input type="file" onChange={HandleImage3} id='img3'  className='w-full text-[13px] px-2.5 file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-red-50 file:text-red-600 file:text-[12px] file:font-semibold file:cursor-pointer' />
                  </div>
                </div>

              </div>

              <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>

                <div className='w-full flex items-start justify-start flex-col gap-2' >
                  <label htmlFor="city" className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'>City</label>
                  <input type="text" onChange={(e) => setCity(e.target.value)} value={city} placeholder='city' id='city' required className='w-full h-11 md:h-12 border-gray-300 border-2 rounded-lg px-3 bg-white outline-none transition-all duration-300 focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)]' />
                </div>

                <div className='w-full flex items-start justify-start flex-col gap-2' >
                  <label htmlFor="landmark" className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'>Landmark</label>
                  <input type="text" onChange={(e) => setLandmark(e.target.value)} value={landmark} placeholder='landmark' id='landmark' required className='w-full h-11 md:h-12 border-gray-300 border-2 rounded-lg px-3 bg-white outline-none transition-all duration-300 focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)]' />
                </div>

              </div>

              {/* ----------- Amenities ------------ */}
              <div className='w-full flex items-start justify-start flex-col gap-2' >
                <label htmlFor="amenities" className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'>Amenities</label>

                {/* ---------- Toggle Amenities ---------- */}
                <div className='w-full min-h-[120px] max-h-[150px] flex flex-wrap gap-2 overflow-y-auto p-1'>
                  {
                    AmenitiesData.map((item) => (
                      <div key={item.name}
                        onClick={() => HandleAmenitiesToggle(item.name)}
                        className={`h-10 px-3 rounded-full text-[13px] font-semibold cursor-pointer flex items-center justify-center transition-all duration-300 border-2 ${(amenities.includes(item.name)) ? 'bg-red-600 border-red-600 text-white shadow-sm shadow-red-500/30' : 'bg-white border-gray-200 text-gray-600 hover:border-red-300'}`}
                      >
                        { item.name }
                      </div>
                    ))
                  }
                </div>

                <input type="text" onChange={(e) => HandleAmenitiesChange(e)} 
                placeholder='amenities : press space to make seprated' id='amenities' value={amenities} required className='w-full h-11 md:h-12 border-gray-300 border-2 rounded-lg px-3 bg-white outline-none transition-all duration-300 focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)]' />
              </div> 

              {/* // -------- Points --------------  */}
              <div className='w-full flex items-start justify-start flex-col gap-2' >
                <label htmlFor="points" className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'>Points to note</label>
                
                <div className='flex flex-col gap-2 w-full'>
                  {
                  points.map((itr) => (
                    <div className='px-4 w-full py-2 bg-white border-2 border-gray-200 rounded-lg text-[13px] text-gray-700'>
                      {itr}
                    </div>
                  ))
                }
                </div>

                <input
                  onChange={(e) => setPoint(e.target.value)}
                  onKeyDown={HandleKeyDown}
                  type="text" value={point} placeholder='Add rules, hit enter to add ' id='points' className='w-full h-11 md:h-12 border-gray-300 border-2 rounded-lg px-3 bg-white outline-none transition-all duration-300 focus:border-red-400 focus:shadow-[0_4px_14px_-6px_rgba(255,0,0,0.25)]' 
                />

              </div>

              {/* ---------- Max Guest Allowed ------------ */}
              <div className='w-full flex items-start justify-start flex-col gap-2' >
                <label htmlFor="landmark" className='text-[13px] font-bold text-gray-500 uppercase tracking-wide'>Max Guest Allowed</label>
                
                <div className='w-[140px] h-[50px] flex flex-row justify-center items-center gap-2'>
                  <button onClick={(e) => {
                    e.preventDefault(); 
                    setMaxGuestAllowed((prev) => prev-1); 
                  }} className='bg-white text-[20px] font-bold text-red-600 h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer border-2 border-gray-200 transition-all duration-300 hover:border-red-400'>
                    -
                  </button>
                  <div className='h-10 w-10 flex items-center justify-center text-[16px] rounded-lg border-2 border-gray-200 bg-white font-bold text-gray-800'>
                    {maxGuestAllowed}
                  </div>
                  <button onClick={(e) => {
                    e.preventDefault(); 
                    setMaxGuestAllowed((prev) => prev+1); 
                  }} className='bg-white text-[20px] font-bold text-red-600 h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer border-2 border-gray-200 transition-all duration-300 hover:border-red-400'>
                    +
                  </button>
                </div>
              </div>
       
              <button className='w-full md:w-auto md:self-end py-3.5 px-10 bg-linear-to-r from-red-600 to-red-500 text-white text-[15px] rounded-full cursor-pointer font-semibold shadow-md shadow-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 active:scale-95' > Next </button>

          </form>

      </div>
    )
  }

export default ListingPage1
