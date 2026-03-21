import React, { useContext, useState } from 'react'
import Navbar from '../Components/Navbar'
import Card from '../Components/Card'
import { listingDataContext } from '../Context/ListingContext'
import { RxCross2 } from "react-icons/rx";
import { GrSearchAdvanced } from "react-icons/gr";
import { TbMessage2Search } from "react-icons/tb";
import toast from 'react-hot-toast';
import {SearchDataContext} from '../Context/NaturalSearchContext';
import Pagination from '../Components/Pagination';
import Footer from '../Components/Footer';
import { PiSparkleLight } from "react-icons/pi";
import { MdErrorOutline } from "react-icons/md";


const Home = () => {

  const { newListingData } = useContext(listingDataContext);
  
  // PopUp 
  const [showPopUp , setShowPopUp] = useState(false); 
   

  const {
      HandleNaturalSearch ,
      searchListing , 
      isSearching , 
      searched ,
      matchedListings , 
      searchQuery , 
      setSearchQuery , 
  } = useContext(SearchDataContext); 

  const { HandleViewCard } = useContext(listingDataContext); 

  // ------ Key Down For Search ------
  const HandleKeyDown = (e) => {
    if(e.key == "Enter"){
      e.preventDefault(); 
      HandleNaturalSearch(searchQuery); 
    }
  }

  return (
    <div>
      <Navbar/>

      <div className='w-full min-h-screen flex items-start justify-center gap-[25px] flex-wrap pt-[250px] md:pt-[180px] pb-0 relative'>
        {
          newListingData.map((list) => (
            <Card key={list._id}
              title={list.title} 
              landmark={list.landmark}
              city={list.city}
              image1={list.image1}
              image2={list.image2}
              image3={list.image3}
              rent={list.rent}
              id={list._id}
              ratings={list.ratings}
              createdAt={list.createdAt}
              viewCount={list.viewCount}
            />
          ))
        }

        <div className='w-full flex justify-center mt-0 mb-0'>
           <Pagination />
        </div>

          <Footer />

      </div>


      {/* ------ Natural Search Button ------ */}
      <div className='z-100 fixed bottom-4 right-4 flex items-center justify-center'>
        <button onClick={() => setShowPopUp(true)} className='rounded-full px-3 py-3 bg-[red] text-2xl text-white cursor-pointer hover:border'>
          <TbMessage2Search/>
        </button>
      </div>

      {/* ----- Natural Search PopUp ----- */}
      { 
        showPopUp && 
        <div className='shadow-sm shadow-gray-400 fixed flex justify-between items-center flex-col bg-[#FAF9F6] min-h-[400px] max-h-[500px] w-[91%] md:w-[500px] bottom-4 right-4 z-100 rounded-lg border-2 border-gray-500'>
          
          <div className='flex justify-between w-full p-2 items-center border-b-2 border-gray-300 h-[10%]'>
            <p className='font-mono text-gray-900 font-semibold text-[22px] flex flex-row gap-1 justify-center items-center'>
              <PiSparkleLight className='font-semibold'/> Smart Search
            </p>

            { searched && searchListing.length > 0 && (
              <p className='bg-gray-100 rounded-lg border border-gray-300 px-2 py-1 text-[12px] text-nowrap md:text-[16px]'>
                {matchedListings} Matches Found
              </p>
            ) }

            <button onClick={() => setShowPopUp(false)} className='text-[24px] px-1 py-1 rounded-full cursor-pointer'>
              <RxCross2 />
            </button>
          </div>

          {/* // ------ Listing Result ------ */}
          <div className='w-full h-full flex items-center justify-center flex-wrap overflow-y-auto gap-2 mt-2 mb-2'>
            
            {
              searched && searchListing.length > 0 &&  
              (
                searchListing.map((item) => (
                  <div key={item._id} onClick={() => HandleViewCard(item._id)} className='flex flex-row  w-[95%] h-[110px] rounded-lg border-2 border-gray-700 cursor-pointer hover:border'>

                    <div className='w-[35%] h-full flex justify-center items-center'>
                      <img draggable={false} src={item.image1} alt={item.title} className='w-full h-full object-cover'/>
                    </div>

                    <div className='w-[65%] p-2 flex flex-col justify-between overflow-y-auto'>
                      <div>
                        <div className='flex justify-between items-start'>
                          <h4 className='font-bold text-sm truncate w-[70%]'> {item.title} </h4>
                          <p className='font-bold text-red-500 text-xs'>₹{item.rent}/day</p>
                        </div>
                        <p className='text-[11px] line-clamp-2 text-gray-500'> {(item.description?.split(" ").slice(0,20).join(" "))+(item.description?.split(" ").length > 20 ? '...' : "") }  </p>
                      </div>

                      <div className='flex items-center flex-wrap gap-1'>
                        {
                          item.amenities?.map((itr , index) => (
                            <div key={index} className='p-1 text-xs bg-gray-300 text-gray-600 rounded'>
                              {itr}
                            </div>
                          ))
                        }
                      </div>

                      <div className='flex items-center justify-between text-[10px] text-gray-400'>
                        <p className='truncate'> {item.landmark}, {item.city} </p>
                        <span className='bg-green-100 text-green-700 px-1 rounded'> {item.category} </span>
                      </div>
                    </div>

                  </div>
                ))
              )
            }

            { !searched && !isSearching && 
              (
                <div className='h-full flex items-center justify-center flex-col'>
                  <div>
                    <img src='./key.png' alt="" />
                  </div>

                  <div className='text-[18px] text-gray-800'>
                    Describe your perfect stay ..
                  </div>

                  <div className='font-semibold font-mono text-gray-700'>
                    Tell us what you want to feel
                  </div>
                </div>
              )
            }

            {
              isSearching && (
                <div className='flex flex-col gap-1 justify-center items-center text-center'>
                  <div class="spinner"></div>
                  <p> We are finding top matched listings for you</p>
                </div>
              )
            }

            {
              searched && searchListing.length === 0 && (
                <div className='flex justify-center items-center flex-col gap-1 w-[80%] md:w-[70%] '>
                  <MdErrorOutline  className='text-[62px] md:text-[88px] font-semibold text-gray-400'/>
                  <p className='text-[14px] md:text-[18px] font-semibold text-gray-400 text-center'> Sorry To concern that there may be an issue in our side !</p>
                </div>
              )
            }
            
          </div>

          <div className='mb-1 w-full h-auto p-1 flex items-center justify-center border-t-2 border-gray-300'>
            <textarea className='bg-gray-200 mt-1 py-1 min-h-20 max-h-[150px] relative w-[98%] h-[45px] px-3 border-2 border-gray-500 outline-none rounded-lg text-[16px]'
            type="text" placeholder='Search you vibe here ..' value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => HandleKeyDown(e)}
            />
            <button onClick={() => HandleNaturalSearch(searchQuery)} className='absolute right-5 bg-[red] px-3 py-3 rounded-full cursor-pointer'>
              <GrSearchAdvanced />
            </button>
          </div>

        </div>
      }


    </div>
  )
}

export default Home
