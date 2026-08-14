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
import CardSkeleton from '../Components/CardSkeleton';

const Home = () => {

  const { newListingData , loading } = useContext(listingDataContext);
  
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
          loading ? 
          (
            Array.from({ length: 8 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          )
          : 
          (
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
          )
        }

        <div className='w-full flex justify-center mt-0 mb-0'>
           <Pagination />
        </div>

          <Footer />

      </div>


      {/* ------ Natural Search Button ------ */}
      <div className='z-100 fixed bottom-4 right-4 flex items-center justify-center'>
        <button onClick={() => setShowPopUp(true)} className='rounded-full px-4 py-4 bg-linear-to-r from-red-600 to-red-500 text-2xl text-white cursor-pointer shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-red-500/50 active:scale-90 animate-[floatBtn_2.8s_ease-in-out_infinite]'>
          <TbMessage2Search/>
        </button>
      </div>

      <style>{`
        @keyframes floatBtn {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes popupRise {
          from { transform: translateY(24px) scale(0.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes cardIn {
          from { transform: translateY(12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInSoft {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseKey {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>

      {/* ----- Natural Search PopUp ----- */}
      { 
        showPopUp && 
        <div className='shadow-2xl shadow-gray-400/50 fixed flex justify-between items-center flex-col bg-[#FAF9F6] min-h-[400px] max-h-[500px] w-[91%] md:w-[500px] bottom-4 right-4 z-100 rounded-2xl border-2 border-gray-300 ring-1 ring-gray-100 origin-bottom-right animate-[popupRise_0.3s_ease-out]'>
          
          <div className='flex justify-between w-full px-4 py-3.5 items-center border-b-2 border-gray-200 h-[10%] shrink-0 bg-white rounded-t-[14px]'>
            <p className='font-mono text-gray-900 font-semibold text-[20px] flex flex-row gap-1.5 justify-center items-center'>
              <PiSparkleLight className='font-semibold text-red-500 animate-[pulseKey_2s_ease-in-out_infinite]'/> Smart Search
            </p>

            { searched && searchListing.length > 0 && (
              <p className='bg-red-50 rounded-full border border-red-200 px-2.5 py-1 text-[11px] font-medium text-red-600 text-nowrap md:text-[13px] animate-[fadeInSoft_0.4s_ease-out]'>
                {matchedListings} Matches Found
              </p>
            ) }

            <button onClick={() => setShowPopUp(false)} className='text-[22px] p-1.5 rounded-full cursor-pointer text-gray-600 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:text-black hover:rotate-90 active:scale-90'>
              <RxCross2 />
            </button>
          </div>

          {/* // ------ Listing Result ------ */}
          <div className='w-full h-full flex flex-col items-center justify-start overflow-y-auto gap-3 px-3 py-3 bg-[#FAF9F6]'>
            
            {
              searched && searchListing.length > 0 &&  
              (
                searchListing.map((item , index) => (
                  <div key={item._id} onClick={() => HandleViewCard(item._id)} style={{ animationDelay: `${index * 80}ms` }} className='group flex flex-row w-full h-[125px] shrink-0 rounded-2xl bg-white border-2 border-gray-200 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/15 hover:border-red-300 hover:-translate-y-0.5 animate-[cardIn_0.4s_ease-out_both]'>

                    <div className='w-[36%] h-full shrink-0 overflow-hidden border-r-2 border-gray-200'>
                      <img draggable={false} src={item.image1} alt={item.title} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'/>
                    </div>

                    <div className='w-[64%] p-3 flex flex-col justify-between gap-1.5 overflow-hidden'>
                      <div className='flex flex-col gap-1 pb-1.5 border-b border-gray-100'>
                        <div className='flex justify-between items-start gap-2'>
                          <h4 className='font-bold text-[13.5px] text-gray-900 truncate'> {item.title} </h4>
                          <p className='font-bold text-red-500 text-[12px] shrink-0'>₹{item.rent}/day</p>
                        </div>
                        <p className='text-[11px] leading-snug line-clamp-2 text-gray-500'> {(item.description?.split(" ").slice(0,20).join(" "))+(item.description?.split(" ").length > 20 ? '...' : "") }  </p>
                      </div>

                      <div className='flex items-center flex-wrap gap-1'>
                        {
                          item.amenities?.slice(0,3).map((itr , index) => (
                            <div key={index} className='px-1.5 py-0.5 text-[10px] bg-gray-100 border border-gray-200 text-gray-600 rounded-full transition-all duration-300 group-hover:bg-red-50 group-hover:border-red-200 group-hover:text-red-600'>
                              {itr}
                            </div>
                          ))
                        }
                      </div>

                      <div className='flex items-center justify-between text-[10px] text-gray-400 pt-1.5 border-t border-gray-100'>
                        <p className='truncate'> {item.landmark}, {item.city} </p>
                        <span className='bg-green-50 border border-green-200 text-green-600 font-medium px-1.5 py-0.5 rounded-full shrink-0'> {item.category} </span>
                      </div>
                    </div>

                  </div>
                ))
              )
            }

            { !searched && !isSearching && 
              (
                <div className='h-full w-full flex items-center justify-center flex-col bg-[#FAF9F6] animate-[fadeInSoft_0.5s_ease-out]'>
                  <div>
                    <img src='./key.png' alt="" className='animate-[pulseKey_2.5s_ease-in-out_infinite]'/>
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
                <div className='h-full w-full flex flex-col gap-2 justify-center items-center text-center bg-[#FAF9F6] animate-[fadeInSoft_0.3s_ease-out]'>
                  <div class="spinner"></div>
                  <p className='text-gray-500 text-sm'> We are finding top matched listings for you</p>
                </div>
              )
            }

            {
              searched && searchListing.length === 0 && (
                <div className='h-full w-full flex justify-center items-center flex-col gap-1 bg-[#FAF9F6] animate-[fadeInSoft_0.4s_ease-out]'>
                  <MdErrorOutline  className='text-[62px] md:text-[88px] font-semibold text-gray-300'/>
                  <p className='text-[14px] md:text-[18px] font-semibold text-gray-400 text-center w-[80%] md:w-[70%]'> Sorry To concern that there may be an issue in our side !</p>
                </div>
              )
            }
            
          </div>

          <div className='mb-0 w-full h-auto px-3 py-3 flex items-center justify-center border-t-2 border-gray-200 shrink-0 bg-white rounded-b-[14px]'>
            <textarea className='bg-gray-100 py-2.5 min-h-20 max-h-[150px] relative w-[98%] h-[45px] px-4 border-2 border-gray-200 outline-none rounded-2xl text-[15px] transition-all duration-300 focus:border-red-400 focus:bg-white focus:shadow-[0_4px_16px_-6px_rgba(255,0,0,0.3)]'
            type="text" placeholder='Search you vibe here ..' value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => HandleKeyDown(e)}
            />
            <button onClick={() => HandleNaturalSearch(searchQuery)} className='absolute right-6 bg-linear-to-r from-red-600 to-red-500 px-3 py-3 rounded-full cursor-pointer shadow-md shadow-red-500/30 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-red-500/50 active:scale-90'>
              <GrSearchAdvanced className='text-white'/>
            </button>
          </div>

        </div>
      }

      
    </div>
  )
}

export default Home
