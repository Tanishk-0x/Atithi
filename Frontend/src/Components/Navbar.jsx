import React, { useState , useContext } from 'react'
import logo from '/logo.png'
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";
import { BsShop } from "react-icons/bs";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { FaTreeCity } from "react-icons/fa6";
import { GiWoodCabin } from "react-icons/gi";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import toast from 'react-hot-toast';
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import { listingDataContext } from '../Context/ListingContext';
import { FiMapPin } from 'react-icons/fi';
import { GiCampingTent } from 'react-icons/gi' ;
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {

    const navigate = useNavigate() ; 
    const {serverUrl} = useContext(authDataContext); 
    const {userData , setUserData} = useContext(userDataContext);
    
    const {
        listingData ,  
        setNewListingData , 
        searchData ,
        HandleSearch ,  
        HandleViewCard , 
        filterCategory, 
        setFilterCategory ,
    } = useContext(listingDataContext); 

    const [cate , setCate] = useState(''); 

    const [showPopUp , setShowPopUp] = useState(false) ; 
    const [loading , setLoading] = useState(false) ; 

    // ---------- LogOut Handler ----------
    const LogoutHandler = async () => {
        if(loading){
            return ; 
        }
        try {
            setLoading(true); 
            const res = await axios.post(  serverUrl + "/auth/logout" , 
             {} , {withCredentials : true}); 
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/login');
                setLoading(false); 
            }
        }
        catch (error) {
            console.log(error) ;
            setLoading(false); 
        }
        finally{
            setLoading(false); 
        }
    }


    // ---------- Debouncing for search ----------
    function Debounce( fn , delay ){
        let timerId ; 
        return function(...args){
            // cancel last call 
            clearTimeout(timerId);
            // create new timer
            timerId = setTimeout(() => {
                fn(...args); 
            }, delay);
        }
    }
    const SearchWithDebounce = Debounce(HandleSearch , 500);


    // To open the card based on search 
      const HandleClick = (id) => {
        if(userData){
            HandleViewCard(id);
        }
        else{
            navigate('/login');
        }
    }

    // ---- To Handle HostDashboard Access ----
    const HandleDashboard = () => {
        if(userData?.listing?.length > 0){
            navigate('/hostdashboard'); 
        }
        else{
            toast.error("You Must Have Atleast One Listing!"); 
            return ; 
        }
    }

    return (
        
        <div className='fixed top-0 bg-[white] z-20 animate-[navDrop_0.5s_ease-out]'>

            <style>{`
                @keyframes navDrop {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes dropdownPop {
                    from { transform: translateY(-10px) scale(0.94); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
                @keyframes slideDown {
                    from { transform: translateY(-15px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>

            <div className='w-screen min-h-20 border-b border-[#dcdcdc] px-5 flex items-center justify-between md:px-10 relative'>
                
                <div >
                    <img src={logo} draggable={false} className='w-[110px] md:w-[130px] transition-transform duration-300 hover:scale-105'/>
                </div>

                <div className='w-[35%] absolute left-1/2 -translate-x-1/2 hidden md:block '>
                    <input onChange={(e) => SearchWithDebounce(e.target.value)}
                     type="text" placeholder='Any Where  |  Any Location  |  Any City' 
                    className='w-full px-[30px] py-2.5 border-2 border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px] transition-all duration-300 focus:border-red-500 focus:shadow-[0_4px_18px_-6px_rgba(255,0,0,0.25)] focus:scale-[1.015]' />
                    <button className='absolute p-2.5 rounded-[50px] bg-[red] right-[2%] top-[5px] transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-90'> <FiSearch className='w-5 h-5 text-[white]' /> </button>
                </div>

                <div className='relative flex items-center justify-center gap-2.5 '>

                    <button onClick={() => navigate('/itinerary')}
                    className="cursor-pointer relative flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 rounded-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 active:scale-95">
                        <FiMapPin className="w-4 h-4" />
                        Itinerary
                    </button>

                    <span className='text[20px] cursor-pointer px-2 py-[5px] hover:bg-[#ded9d9] hover: rounded-2xl hidden md:block transition-all duration-300 hover:scale-105' onClick={() => navigate('/listingpage1')}> List your home </span>
                    <button className='px-5 py-2.5 flex items-center justify-center gap-[5px] border border-[#8d8c8c] rounded-[50px] hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95'>
                        <span className='relative w-5 h-5 flex items-center justify-center'>
                            <GiHamburgerMenu onClick={() => setShowPopUp(prev => !prev)} className={`absolute w-5 h-5 cursor-pointer transition-all duration-300 ease-in-out ${showPopUp ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}/>
                            <RxCross2 onClick={() => setShowPopUp(prev => !prev)} className={`absolute w-5 h-5 cursor-pointer transition-all duration-300 ease-in-out ${showPopUp ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}/>
                        </span> 

                        {
                            userData == null ? 
                            <span><FaRegUserCircle className='w-[23px] h-[23px] cursor-pointer transition-transform duration-300 hover:scale-110'/></span> 
                            : 
                            <span className='h-[30px] w-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110'> {userData?.name.slice(0,1).toUpperCase()} </span>
                        }

                    </button>

                    { showPopUp && 
                    <div className='w-[220px] h-[250px] absolute bg-slate-50 top-[110%] right-[5%] border border-[#aaa9a9] z-10 rounded-lg md:right-[10%] origin-top-right animate-[dropdownPop_0.25s_ease-out]'>
                        <ul className='w-full h-full text-[17px] items-start flex justify-around flex-col'>
                            {
                                !userData ? <li className='w-full px-[15px] py-2.5 hover:bg-[#f4f3f3] cursor-pointer transition-all duration-200 hover:pl-5' onClick={() => {navigate('/login') ; setShowPopUp(false)}}>Login</li>
                                :  <li className='w-full px-[15px] py-2.5 hover:bg-[#f4f3f3] cursor-pointer transition-all duration-200 hover:pl-5' onClick={() => { LogoutHandler() ; setShowPopUp(false)}}> {loading ? 'loading' : 'Logout'} </li>
                            }
                            
                            <div className='w-full h-px bg-[#c1c0c0]'></div>
                            <li className='w-full px-[15px] py-2.5 hover:bg-[#f4f3f3] cursor-pointer transition-all duration-200 hover:pl-5' onClick={() => {HandleDashboard() ; setShowPopUp(false)}}>Host Dashboard</li>
                            <li className='w-full px-[15px] py-2.5 hover:bg-[#f4f3f3] cursor-pointer transition-all duration-200 hover:pl-5' onClick={() => {navigate('/listingpage1') ; setShowPopUp(false)}}>List your home</li>
                            <li className='w-full px-[15px] py-2.5 hover:bg-[#f4f3f3] cursor-pointer transition-all duration-200 hover:pl-5' onClick={() => {navigate('/mylisting') ; setShowPopUp(false)}}>My Listing</li>
                            <li className='w-full px-[15px] py-2.5 hover:bg-[#f4f3f3] cursor-pointer transition-all duration-200 hover:pl-5' onClick={() => {navigate('/mybooking') ; setShowPopUp(false)}}>My Booking</li>
                        </ul>
                    </div>
                    } 

                </div>

                {/* Search Section  */}
                { searchData?.length > 0 && 
                    <div className='w-screen h-[450px] flex flex-col gap-5 absolute top-[50%] overflow-auto left-0 justify-start items-center'>
                        <div className='max-w-[700px] w-screen h-[300px] overflow-hidden flex flex-col bg-[#fefdfd] p-5 rounded-lg border border-[#a2a1a1] cursor-pointer animate-[slideDown_0.3s_ease-out]'>
                            {
                                searchData.map((search) => (
                                    <div onClick={() => HandleClick(search._id)} 
                                     className='border-b border-[black] p-2.5 transition-all duration-200 hover:bg-[#f4f3f3] hover:pl-4'>
                                        {search.title} in {search.landmark}, {search.city}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }

            </div>
            
            <div className='w-full flex items-center justify-center mt-2 md:hidden'>
                <div className='w-[80%] relative'>
                    <input onChange={(e) => SearchWithDebounce(e.target.value)} 
                     type="text" placeholder='Any Where  |  Any Location  |  Any City' 
                        className='w-full px-[30px] py-2.5 border-2 border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px] transition-all duration-300 focus:border-red-500 focus:shadow-[0_4px_18px_-6px_rgba(255,0,0,0.25)] focus:scale-[1.02]' />
                    <button className='absolute p-2.5 rounded-[50px] bg-[red] right-[2%] top-[5px] transition-all duration-300 hover:scale-110 active:scale-90'> <FiSearch className='w-5 h-5 text-[white]' /> </button>
                </div>
            </div>

            <div className='w-screen h-[85px] flex items-center justify-start gap-10 overflow-auto md:justify-center px-[15px]'>
                
                <div onClick={() => setFilterCategory('') } className={`flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px] transition-all duration-300 ${cate=='trending' ? 'border-b border-[#a6a5a5]' : '' }`}>
                    <MdWhatshot className='w-[30px] h-[30px] text-[black] transition-transform duration-300 hover:-translate-y-1' />
                    <h3>Trending</h3>
                </div>
                
                <div onClick={() => setFilterCategory('villa')} className={`flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px] transition-all duration-300 ${cate=='villa' ? 'border-b border-[#a6a5a5]' : '' }`}>
                    <GiFamilyHouse className='w-[30px] h-[30px] text-[black] transition-transform duration-300 hover:-translate-y-1' />
                    <h3>Villa</h3>
                </div>

                <div onClick={() => setFilterCategory('farm house')} className={`flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px] transition-all duration-300 ${cate=='farm house' ? 'border-b border-[#a6a5a5]' : '' }`}>
                    <FaTreeCity className='w-[30px] h-[30px] text-[black] transition-transform duration-300 hover:-translate-y-1' />
                    <h3>Farm House</h3>
                </div>

                <div onClick={() => setFilterCategory('pool house')} className={`flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px] transition-all duration-300 ${cate=='pool house' ? 'border-b border-[#a6a5a5]' : '' }`}>
                    <MdOutlinePool className='w-[30px] h-[30px] text-[black] transition-transform duration-300 hover:-translate-y-1' />
                    <h3>Pool House</h3>
                </div>

                <div onClick={() => setFilterCategory('rooms')} className={`flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px] transition-all duration-300 ${cate=='rooms' ? 'border-b border-[#a6a5a5]' : '' }`}>
                    <MdBedroomParent className='w-[30px] h-[30px] text-[black] transition-transform duration-300 hover:-translate-y-1' />
                    <h3>Room</h3>
                </div>

                <div onClick={() => setFilterCategory('flat')} className={`flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px] transition-all duration-300 ${cate=='flat' ? 'border-b border-[#a6a5a5]' : '' }`}>
                    <MdOutlineMapsHomeWork className='w-[30px] h-[30px] text-[black] transition-transform duration-300 hover:-translate-y-1' />
                    <h3>Flat</h3>
                </div>

                <div onClick={() => setFilterCategory('hostel')} className={`flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px] transition-all duration-300 ${cate=='pg' ? 'border-b border-[#a6a5a5]' : '' }`}>
                    <IoBedOutline className='w-[30px] h-[30px] text-[black] transition-transform duration-300 hover:-translate-y-1' />
                    <h3>Hostel</h3>
                </div>
                
                <div onClick={() => setFilterCategory('campsite')} className={`flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px] transition-all duration-300 ${cate=='shops' ? 'border-b border-[#a6a5a5]' : '' }`}>
                    <GiCampingTent className='w-[30px] h-[30px] text-[black] transition-transform duration-300 hover:-translate-y-1' />
                    <h3>Campsite</h3>
                </div>

                <div onClick={() => setFilterCategory('cabin')} className={`flex justify-center items-center flex-col  cursor-pointer hover:border-b border-[#a6a5a5] text-[13px] transition-all duration-300 ${cate=='cabin' ? 'border-b border-[#a6a5a5]' : '' }`}>
                    <GiWoodCabin className='w-[30px] h-[30px] text-[black] transition-transform duration-300 hover:-translate-y-1' />
                    <h3>Cabin</h3>
                </div>


            </div>

        </div>
    )
}

export default Navbar
