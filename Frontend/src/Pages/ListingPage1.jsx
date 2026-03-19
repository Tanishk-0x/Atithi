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
      { name: "PowerBackup" },
      { name: "RO Water" },
      { name: "Parking" },
      { name: "CCTV" },
      { name: "Lift" },
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
      
      <div className='w-full h-screen bg-white flex items-center justify-center relative overflow-auto'>

          <form action="" onSubmit={SubmitHandler}
          className='max-w-[900px] w-[90%] h-[550px] flex items-center justify-start flex-col md:items-start gap-2.5 overflow-auto mt-[50px]'>

              <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[5%] left-5 absolute'>
                <button className='cursor-pointer' onClick={() => navigate('/')}><FaArrowLeftLong /></button>
              </div>

              <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute top-[5%] right-2.5 shadow-lg cursor-pointer'>
                  SetUp Your Home
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="title" className='text-[20px]'>Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}  placeholder='title' id='title' required className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <div className='w-[90%] flex items-center justify-between'>
                  <label htmlFor="description" className='text-[20px]'>Description</label>
                  <button onClick={(e) => { 
                    e.preventDefault() ; 
                    GenerateDescription() ; 
                  }}
                    className='bg-red-100 px-2 py-1 rounded-lg border-2 border-red-700 flex flex-row items-center justify-center cursor-pointer gap-1'
                  >
                    { generating ? <Loader /> : <p className='flex flex-row items-center justify-center gap-1'>Generate with Ai <span><IoMdColorWand/></span></p> }
                  </button>
                </div>

                {/* ---------- Description PopUp ---------- */}
                {
                  showPopUp && 
                  <div className='w-[90%] flex items-center justify-center flex-col gap-2'>
                    <div onClick={() => {
                      setDescription(descriptions.desc1) ; 
                      setShowPopUp(false); 
                    }} className='bg-red-100 border-2 border-red-300 rounded-lg px-2 py-1 cursor-pointer hover:border-red-500'>
                      { descriptions.desc1 }
                    </div>

                    <div onClick={() => {
                      setDescription(descriptions.desc2) ; 
                      setShowPopUp(false); 
                    }} className='bg-red-100 border-2 border-red-300 rounded-lg px-2 py-1 cursor-pointer hover:border-red-500'>
                      { descriptions.desc2 }
                    </div>

                    <div onClick={() => {
                      setDescription(descriptions.desc3) ; 
                      setShowPopUp(false); 
                    }} className='bg-red-100 border-2 border-red-300 rounded-lg px-2 py-1 cursor-pointer hover:border-red-500'>
                      { descriptions.desc3 }
                    </div>
                  </div>
                }
                
                <textarea placeholder='description' onChange={(e) => setDescription(e.target.value)} value={description} id='description' required className='w-[90%] h-20 border-2 border-[#555656] rounded-lg text-[18px] px-4 pt-1' />
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="img1" className='text-[20px]'>Image1</label>
                <div className='flex items-center justify-center w-[90%] h-10 border-[#555656] border-2 rounded-[10px]'>
                  <input type="file" onChange={HandleImage1} id='img1'  className='w-full rounded-lg text-[15px] px-2.5' />
                </div>
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="img2" className='text-[20px]'>Image2</label>
                <div className='flex items-center justify-center w-[90%] h-10 border-[#555656] border-2 rounded-[10px]'>
                  <input type="file" onChange={HandleImage2} id='img2'  className='w-full rounded-lg text-[15px] px-2.5' />
                </div>
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="img3" className='text-[20px]'>Image3</label>
                <div className='flex items-center justify-center w-[90%] h-10 border-[#555656] border-2 rounded-[10px]'>
                  <input type="file" onChange={HandleImage3} id='img3'  className='w-full rounded-lg text-[15px] px-2.5' />
                </div>
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="rent" className='text-[20px]'>Rent</label>
                <input type="number" onChange={(e) => setRent(e.target.value)} value={rent} placeholder='rent' id='rent' required className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="city" className='text-[20px]'>City</label>
                <input type="text" onChange={(e) => setCity(e.target.value)} value={city} placeholder='city' id='city' required className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
              </div>

              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="landmark" className='text-[20px]'>Landmark</label>
                <input type="text" onChange={(e) => setLandmark(e.target.value)} value={landmark} placeholder='landmark' id='landmark' required className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
              </div>

              {/* ----------- Amenities ------------ */}
              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="amenities" className='text-[20px]'>Amenities</label>

                {/* ---------- Toggle Amenities ---------- */}
                <div className='w-[90%] min-h-[120px] max-h-[150px] flex flex-wrap gap-2 overflow-y-auto'>
                  {
                    AmenitiesData.map((item) => (
                      <div key={item.name}
                        onClick={() => HandleAmenitiesToggle(item.name)}
                        className={`h-10 px-2 rounded-lg bg-gray-400 text-gray-800 cursor-pointer flex items-center justify-center ${(amenities.includes(item.name)) ? 'border-2 border-gray-800' : ''}`}
                      >
                        { item.name }
                      </div>
                    ))
                  }
                </div>

                <input type="text" onChange={(e) => HandleAmenitiesChange(e)} 
                placeholder='amenities : press space to make seprated' id='amenities' value={amenities} required className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
              </div> 

              {/* // -------- Points --------------  */}
              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="points" className='text-[20px]'>Points to note</label>
                
                <div className='flex flex-col gap-1 w-full'>
                  {
                  points.map((itr) => (
                    <div className='px-3 w-[90%] py-1 bg-gray-200 border border-gray-600 rounded-lg'>
                      {itr}
                    </div>
                  ))
                }
                </div>

                <input
                  onChange={(e) => setPoint(e.target.value)}
                  onKeyDown={HandleKeyDown}
                  type="text" value={point} placeholder='Add rules, hit enter to add ' id='points' className='w-[90%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' 
                />

              </div>

              {/* ---------- Max Guest Allowed ------------ */}
              <div className='w-[90%] flex items-start justify-start flex-col gap-2.5' >
                <label htmlFor="landmark" className='text-[20px]'>Max Guest Allowed</label>
                
                <div className='w-[140px] h-[50px] flex flex-row justify-center items-center gap-1'>
                  <button onClick={(e) => {
                    e.preventDefault(); 
                    setMaxGuestAllowed((prev) => prev+1); 
                  }} className='bg-gray-300 text-[24px] font-semibold h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer border border-gray-800 hover:border-2'>
                    +
                  </button>
                  <div className='h-10 w-10 flex items-center justify-center text-[18px] rounded-lg border border-gray-800 font-semibold'>
                    {maxGuestAllowed}
                  </div>
                  <button onClick={(e) => {
                    e.preventDefault(); 
                    setMaxGuestAllowed((prev) => prev-1); 
                  }} className='bg-gray-300 text-[24px] font-semibold h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer border border-gray-800 hover:border-2'>
                    -
                  </button>
                </div>
              </div>
       
              <button className='py-2.5 bg-[red] text-[white] text-[18px] md: px-[100px] rounded-lg cursor-pointer mt-2' > Next </button>

          </form>

      </div>

    )
  }

export default ListingPage1
