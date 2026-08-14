import { IoHomeOutline } from "react-icons/io5";
import { CiDollar } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { PiChartLineUp } from "react-icons/pi";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer , Tooltip} from 'recharts';
import { useContext, useEffect, useState } from "react";
import { userDataContext } from "../Context/UserContext";
import { useNavigate } from 'react-router-dom';
import { hostDataContext } from "../Context/HostContext";
import { reviewDataContext } from "../Context/ReviewContext";
import { IoIosStar } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TiInputChecked } from "react-icons/ti";
import { MdDoNotDisturb } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import Loader from '../Components/Loader';

const HostDashboard = () => {

    const navigate = useNavigate(); 

    const { userData } = useContext(userDataContext);

    const {
        FetchReviews , 
        reviewsHost 
    } = useContext(reviewDataContext); 

    const { 
        getHostData , 
        pending , 
        approved , 
        ongoing ,
        completed ,
        allBookings , 
        approveBooking , 
        isApproving , 
        CheckInBooking , 
        isCheckIn ,
        CompleteBooking , 
        isComplete , 
        RejectBooking , 
        isReject , 

        revenueStats , 
        totalRevenue , 
        totalBookings ,
        showPopUp ,
        setShowPopUp ,
    } = useContext(hostDataContext); 
    
    const [status , setStatus] = useState('all'); 

    const [showManagePopUp , setShowManagePopUp] = useState(false); 

    // ---------- CheckIn -----------
    const [ bookingId , setBookingId ] = useState(''); 
    const [ passCode , setPassCode ] = useState(''); 

    // ----- UseEffect ------
    useEffect(() => {
        getHostData(); 
        FetchReviews(); 
    }, []); 


  return (

    <div className="bg-[#F3F1EC] md:h-screen h-auto w-full flex flex-col items-center gap-1 relative overflow-x-hidden">

    <style>{`
      @keyframes fadeUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .fade-up { animation: fadeUp 0.5s ease-out both; }
      .fade-in { animation: fadeIn 0.6s ease-out both; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
      
    {/* ---------- Navbar ----------- */}
      <div className="bg-white h-18 md:h-[8%] w-[95%] md:w-[90%] mt-4 md:mt-2 rounded-2xl shadow-md shadow-gray-300 border border-gray-100 flex justify-between items-center px-3 fade-up">
        <div className="h-full flex items-center justify-center">
            <img src="./logo.png" draggable={false} alt="" className="w-[100px] md:w-[98px] py-0 md:py-1"/>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
            <div className="flex flex-row gap-2 md:gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-linear-to-r from-red-600 to-red-500 shadow-sm shadow-red-500/30 text-[white] font-semibold text-[18px] md:text-[24px] flex items-center justify-center">
                    T
                </div>
                <div className="hidden sm:block">
                    <p className="text-red-500 font-semibold text-[12px] md:text-[16px]">Welcome, <span className="text-black"> {userData?.name} </span></p>
                    <p className="text-[gray] text-[10px] md:text-[14px]"> {userData?.email} </p>
                </div>
            </div>
            <button onClick={() => navigate('/')} className="bg-linear-to-r from-red-600 to-red-500 h-10 md:h-10 w-18 md:w-20 rounded-lg cursor-pointer font-semibold text-[white] shadow-sm shadow-red-500/30 transition-all duration-300 hover:shadow-md hover:shadow-red-500/50 active:scale-95 text-[14px] md:text-[16px]">
                Logout
            </button>
        </div>
      </div>

    {/* ---------- Infos ---------- */}
      <div className="h-auto md:h-[14%] w-[95%] md:w-[90%] flex flex-wrap items-center justify-center gap-2 md:gap-4 py-2 md:py-0 fade-up">
        <div className="bg-linear-to-br from-red-600 to-red-500 w-[46%] md:w-[20%] h-20 md:h-[80%] rounded-2xl shadow-md shadow-red-500/20 flex items-center justify-start px-3 md:px-5 gap-2 md:gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30">
            <div className="h-10 w-10 md:h-15 md:w-15 bg-white/15 text-[white] text-[20px] md:text-[28px] rounded-xl flex items-center justify-center shrink-0">
                <IoHomeOutline />
            </div>
            <div className="h-auto text-[white] text-nowrap">
                <p className="text-[12px] md:text-[16px] text-red-100">Total Listings:</p>
                <p className="text-[18px] md:text-[28px] font-semibold"> {userData?.listing?.length} </p>
            </div>
        </div>
        <div className="bg-linear-to-br from-red-600 to-red-500 w-[46%] md:w-[20%] h-20 md:h-[80%] rounded-2xl shadow-md shadow-red-500/20 flex items-center justify-start px-3 md:px-5 gap-2 md:gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30">
            <div className="h-10 w-10 md:h-15 md:w-15 bg-white/15 text-[white] text-[20px] md:text-[28px] rounded-xl flex items-center justify-center shrink-0">
                <CiDollar />
            </div>
            <div className="h-auto text-[white] text-nowrap">
                <p className="text-[12px] md:text-[16px] text-red-100">Total Revenue:</p>
                <p className="text-[18px] md:text-[28px] font-semibold">{totalRevenue}</p>
            </div>
        </div>
        <div className="bg-linear-to-br from-red-600 to-red-500 w-[46%] md:w-[20%] h-20 md:h-[80%] rounded-2xl shadow-md shadow-red-500/20 flex items-center justify-start px-3 md:px-5 gap-2 md:gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30">
            <div className="h-10 w-10 md:h-15 md:w-15 bg-white/15 text-[white] text-[20px] md:text-[28px] rounded-xl flex items-center justify-center shrink-0">
                <GoClock />
            </div>
            <div className="h-auto text-[white] text-nowrap">
                <p className="text-[12px] md:text-[16px] text-red-100">Pending Requests</p>
                <p className="text-[18px] md:text-[28px] font-semibold"> {pending?.length} </p>
            </div>
        </div>
        <div className="bg-linear-to-br from-red-600 to-red-500 w-[46%] md:w-[20%] h-20 md:h-[80%] rounded-2xl shadow-md shadow-red-500/20 flex items-center justify-start px-3 md:px-5 gap-2 md:gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30">
            <div className="h-10 w-10 md:h-15 md:w-15 bg-white/15 text-[white] text-[20px] md:text-[28px] rounded-xl flex items-center justify-center shrink-0">
                <PiChartLineUp />
            </div>
            <div className="h-auto text-[white] text-nowrap">
                <p className="text-[12px] md:text-[16px] text-red-100">TotalBookings:</p>
                <p className="text-[18px] md:text-[28px] font-semibold">{totalBookings}</p>
            </div>
        </div>
        <div className="bg-white shadow-sm shadow-gray-300 border border-gray-100 rounded-2xl w-[95%] md:w-[15%] h-auto md:h-[98%] flex flex-col justify-center items-center gap-1 p-2 md:p-0">
            <div className="w-full flex items-start px-4 font-semibold text-[14px] md:text-[16px] text-gray-800">
                Quick Actions:
            </div>
            <button onClick={() => navigate('/listingpage1') } className="bg-linear-to-r from-red-600 to-red-500 w-[90%] py-1 md:py-1 rounded-lg cursor-pointer text-[white] shadow-sm shadow-red-500/30 transition-all duration-300 hover:shadow-md hover:shadow-red-500/50 active:scale-95 text-[14px]">
                Add New Listing
            </button>
            <button onClick={() => setShowManagePopUp(true)} className="bg-linear-to-r from-red-600 to-red-500 w-[90%] py-1 md:py-1 rounded-lg cursor-pointer text-[white] shadow-sm shadow-red-500/30 transition-all duration-300 hover:shadow-md hover:shadow-red-500/50 active:scale-95 mb-1 text-[14px]">
                Manage Bookings
            </button>
        </div>
      </div>

      <div className="w-[95%] md:w-[90%] h-auto md:h-[88%] mb-2 flex flex-col md:flex-row gap-2 items-center justify-center">
        <div className="h-full w-full md:w-[65%] flex items-center justify-center flex-col gap-2">

            {/* ----------- Chart! ------------- */}
            <div className="w-full md:w-[98%] h-[300px] md:h-[50%] pt-4 rounded-2xl shadow-sm shadow-gray-300 border border-gray-100 bg-[white] fade-up">
                <ResponsiveContainer width="98%" height="98%">
                    <BarChart data={revenueStats}>
                        <XAxis dataKey="month" />
                        <YAxis style={{ fontSize: '14px' }} />

                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            content={({active , payload }) => {
                                if (active && payload && payload.length > 0 && payload[0].value > 0 ) {
                                    return (
                                        <div className="bg-black text-white px-3 py-1 rounded-md shadow-xl text-[14px] font-bold border border-gray-600">
                                            ₹{payload[0].value}
                                        </div>
                                    );
                                }
                                return null ; 
                            }}
                        />

                        <Bar dataKey="revenue" fill="#D22B2B" activeBar={{ fill:"red" }} isAnimationActive={true} radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>


            {/* ---------- Listings ---------- */}
            <div className="w-full md:w-[98%] h-auto md:h-[50%] flex items-center justify-center flex-col md:flex-row gap-2">
                <div className="bg-white shadow-sm shadow-gray-300 border border-gray-100 w-full md:w-[60%] h-[400px] md:h-[98%] rounded-2xl flex flex-col justify-center items-center p-2 fade-up">
                    <div className="w-full flex items-center gap-2 px-4 font-semibold text-[18px] text-gray-900"> <span className='w-1.5 h-5 bg-red-600 rounded-full'></span> Listings: </div>
                    
                    <div className="bg-[#F3F1EC] py-2 w-[98%] h-[90%] mb-2 flex items-center overflow-y-auto no-scrollbar flex-col gap-3">
                        
                        {
                            userData?.listing.map((item,key) => (
                                <div key={key}  className="bg-white shadow-sm shadow-gray-300 border border-gray-100 min-h-[110px] w-[95%] flex flex-row rounded-xl shrink-0 transition-all duration-300 hover:shadow-md hover:border-red-200">
                                    <div className="h-full w-[30%] flex items-center justify-center p-1">
                                        <img src={item?.image1} alt="Image" className="rounded-lg w-full h-[90px] object-cover" />
                                    </div>
                                    <div className="h-full w-[70%] flex justify-between flex-col py-1">
                                        <div className="w-full flex flex-col">
                                            <div className="flex justify-between items-center px-2">
                                                <p className="font-semibold text-[14px] md:text-[16px] text-gray-900"> {item.title} </p>
                                                <p className="font-semibold text-[14px] md:text-[16px] text-red-500"> ₹{item.rent} </p>
                                            </div>
                                            <div className="px-2 w-full text-[10px] md:text-[12px] text-[gray] line-clamp-2">
                                                {item.description}
                                            </div>
                                        </div>

                                        <div className="px-2 w-full flex justify-between items-center">
                                            <p className="text-[12px] md:text-[14px] text-gray-700"> {`${item.landmark} , ${item.city}`} </p>
                                            <p className="bg-green-50 text-[10px] md:text-[12px] text-green-600 border border-green-100 rounded-full px-2 py-0 text-nowrap"> {item.category} </p>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>

                {/* -------- Reviews --------- */}
                <div className="bg-white shadow-sm shadow-gray-300 border border-gray-100 w-full md:w-[40%] h-[400px] md:h-[98%] rounded-2xl flex items-center justify-center flex-col gap-2 p-2 fade-up">
                    <div className="w-full flex items-center gap-2 text-[18px] font-semibold px-4 text-gray-900"> <span className='w-1.5 h-5 bg-red-600 rounded-full'></span> Reviews: </div>
                    <div className="bg-[#F3F1EC] py-1 w-[95%] h-[90%] mb-2 flex items-center flex-col gap-2 overflow-y-auto no-scrollbar">
                    {
                        reviewsHost.length > 0 && 
                        reviewsHost.map((itr, key) => (
                            <div key={key} className="w-[95%] bg-white shrink-0 h-auto flex items-center justify-center flex-col gap-1 py-1 rounded-xl shadow-sm shadow-gray-300 border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-red-200">
                                <div className=" w-[98%] h-auto flex justify-between items-center px-1">
                                    <div className="flex flex-row gap-2 justify-center items-center">
                                        <div className="h-6 w-6 md:h-8 md:w-8 bg-red-50 text-red-500 flex justify-center items-center rounded-full font-semibold text-[12px]">
                                            {itr.guest?.name?.slice(0,1).toUpperCase()}
                                        </div>
                                        <div className="text-[12px] md:text-[14px] text-gray-800">
                                            <p>{itr.guest?.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-1 md:gap-2 justify-center items-center text-[10px] md:text-[12px]">
                                        <div className="text-gray-400">
                                            {itr.createdAt.split('T')[0]}
                                        </div>
                                        <div className="text-[#ff0044] flex">
                                            {[...Array(itr.rating)].map((_, i) => <IoIosStar key={i} />)}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full px-2 text-[10px] md:text-[12px] pb-1">
                                    <div className="font-semibold text-red-500">
                                        {itr.listing?.title}
                                    </div>
                                    <div className="text-gray-800">
                                        {itr.feedback}
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    </div>
                </div>
            </div>
            
        </div>

        <div className="h-full w-full md:w-[35%] flex flex-col gap-2 items-center justify-center">
            
            {/* ---------- Requests ---------- */}
            <div className="bg-white shadow-sm shadow-gray-300 border border-gray-100 h-[400px] md:h-[48%] w-full md:w-[98%] rounded-2xl flex flex-col items-center justify-center gap-1 p-2 fade-up">
                <div className="w-full px-4 items-center flex gap-2 font-semibold text-[18px] text-gray-900"> <span className='w-1.5 h-5 bg-red-600 rounded-full'></span> Pending Requests: </div>
                <div className="bg-[#F3F1EC] w-[95%] h-[85%] px-2 md:px-4 flex items-center overflow-y-auto no-scrollbar rounded-xl mb-2 flex-col gap-2 py-2">
                    
                    {
                        pending.map((item,key) => (
                            <div key={key} className="bg-white w-[98%] min-h-20 md:h-[70px] flex flex-col md:flex-row justify-between items-center gap-2 rounded-xl shadow-sm shadow-gray-300 border border-gray-100 px-2 py-2 md:py-0 shrink-0 transition-all duration-300 hover:shadow-md hover:border-red-200">
                                <div className="flex items-center justify-start md:justify-between gap-2 w-full md:w-[60%] h-full">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-linear-to-br from-red-600 to-red-500 flex items-center justify-center text-[white] font-bold text-[20px] md:text-[28px] shrink-0 shadow-sm shadow-red-500/30">
                                        <GoClock />
                                    </div>
                                    <div className="flex flex-col py-1 h-full w-full overflow-hidden">
                                        <div className="text-[14px] md:text-[16px] font-semibold truncate text-gray-900"> {item.listing.title} </div>
                                        <div className="text-[10px] md:text-[12px] text-[gray] truncate"> {item.guest?.name} </div>
                                        <div className="text-[12px] md:text-[14px] text-[red] truncate"> {`${item.checkIn.split('T')[0]} - ${item.checkOut.split('T')[0]}`} </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto justify-end">
                                    <button onClick={() => RejectBooking(item._id)} className="px-2 md:px-3 py-1 md:py-3 font-semibold md:text-[14px] bg-white border border-red-300 rounded-lg cursor-pointer text-red-500 hover:bg-red-50 transition-all duration-300 text-[12px] flex text-center items-center justify-center">
                                        { isReject ? <Loader /> : 'Reject' }
                                    </button>

                                    <button onClick={() => approveBooking(item._id)}
                                    className="px-2 md:px-2 py-2 md:py-3 font-semibold md:text-[14px] bg-linear-to-r from-red-600 to-red-500 rounded-lg cursor-pointer text-[white] shadow-sm shadow-red-500/30 transition-all duration-300 hover:shadow-md hover:shadow-red-500/50 active:scale-95 text-[12px] flex text-center items-center justify-center">
                                        { isApproving ? <Loader /> : 'Approve'}
                                    </button>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>

            {/* ---------- CheckIn ---------- */}
            <div className="bg-white shadow-sm shadow-gray-300 border border-gray-100 h-[400px] md:h-[48%] w-full md:w-[98%] rounded-2xl flex flex-col items-center justify-center gap-1 p-2 fade-up">
                <div className="w-full px-4 items-center flex gap-2 font-semibold text-[18px] text-gray-900"> <span className='w-1.5 h-5 bg-red-600 rounded-full'></span> CheckIn/CheckOut Timeline: </div>
                
                <div className="bg-[#F3F1EC] w-[95%] h-[85%] py-2 flex items-center flex-col overflow-y-auto no-scrollbar gap-2 px-2 rounded-xl mb-2">
                    
                    {
                        approved.map((item,key) => (
                            <div key={key} className="bg-white w-[98%] min-h-[90px] md:h-20 rounded-xl shadow-sm shadow-gray-300 border border-gray-100 flex justify-between items-center gap-2 p-1 shrink-0 transition-all duration-300 hover:shadow-md hover:border-red-200">
                                <div className=" h-full w-[24%]">
                                    <img src={item.listing?.image1} alt="Image" className="h-full w-full object-cover rounded-lg" />
                                </div>
                                <div className="px-1 w-[52%] h-full flex flex-col items-start justify-center overflow-hidden">
                                    <div className="w-full flex items-center justify-between">
                                        <p className="text-[12px] md:text-[14px] font-semibold truncate text-gray-900"> {item.listing?.title} </p>
                                        <p className="text-[12px] md:text-[14px] font-semibold text-[green]"> {`₹${item?.totalRent}`} </p>
                                    </div>
                                    <p className="text-[12px] truncate text-gray-600"> {item?.guest?.name} </p>
                                    <p className="text-[12px] font-semibold text-[red] truncate"> {`${item?.checkIn?.split('T')[0]} - ${item?.checkOut?.split('T')[0]}`} </p>
                                    <p className="text-[gray] text-[10px] truncate"> {`${item?.listing?.landmark}/${item?.listing?.city}`} </p>
                                </div>
                                <div className="px-1 w-[22%]">
                                    <button onClick={() => {
                                        setShowPopUp(true) ; 
                                        setBookingId(item._id);
                                    }} className="bg-linear-to-r from-red-600 to-red-500 px-2 md:px-3 py-2 md:py-3 font-semibold md:text-[14px] rounded-lg cursor-pointer text-[white] shadow-sm shadow-red-500/30 transition-all duration-300 hover:shadow-md hover:shadow-red-500/50 active:scale-95 text-[12px]">
                                        CheckIn
                                    </button>
                                </div>
                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
      </div>

        
        {/* ---------- Check In PopUp ---------- */}
        { showPopUp && 
            <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-md fade-in">
                <div className="bg-white border border-gray-100 h-auto w-[90%] max-w-[400px] flex flex-col gap-4 justify-center items-center rounded-2xl shadow-2xl px-6 py-8 relative scale-in">
                    <button onClick={() => setShowPopUp(false)}
                     className="bg-linear-to-r from-red-600 to-red-500 absolute top-3 right-3 rounded-full text-white cursor-pointer h-8 w-8 text-lg shadow-sm shadow-red-500/30 transition-all duration-300 hover:shadow-md hover:shadow-red-500/50 hover:scale-105 active:scale-95 flex items-center justify-center">
                        <RxCross2 />
                    </button>

                    <h1 className="text-[22px] md:text-[26px] font-semibold text-gray-900 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
                        Enter Pass Code
                    </h1>

                    <div>
                        <input onChange={(e) => setPassCode(e.target.value)}
                        className="w-[200px] md:w-[250px] h-[55px] bg-white outline-none px-2 text-[24px] md:text-[28px] text-center tracking-widest border-2 border-gray-200 focus:border-red-400 rounded-xl text-[black] transition-all duration-300"
                        type="number" name="" id="" />
                    </div>

                    <button onClick={() => 
                        CheckInBooking(bookingId , passCode)
                    } className="px-6 py-2.5 bg-linear-to-r from-red-600 to-red-500 cursor-pointer rounded-xl text-[white] shadow-md shadow-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 active:scale-95 text-[18px] md:text-[22px] flex text-center items-center justify-center w-[200px] md:w-[250px]">
                        { isCheckIn ? <Loader /> : 'CheckIn' }
                    </button>
                </div>
            </div>
        }

        
        {/* ---------- Booking PopUp ------------ */}
        {
            showManagePopUp && 
            <div className="bg-[#F9F6EE] gap-2 flex justify-start items-center flex-col shdaow-sm shadow-gray-500 rounded-lg border-2 border-gray-800 w-[95%] h-[550px] md:w-[840px] md:h-[600px] fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-50">
            
                <div onClick={() => setShowManagePopUp(false)} className="absolute top-1 right-1 text-[22px] p-1.5 text-gray-800 rounded-full cursor-pointer flex justify-center items-center">
                    <RxCross2 />
                </div>

                <h1 className="font-mono  text-[32px] underline">
                    Manage Bookings
                </h1>

                <div className="w-[98%] md:w-[90%] h-20 md:h-[50px] flex flex-wrap justify-center items-center gap-3">
                    <div onClick={() => setStatus('all')} className={`border border-red-600 px-1 md:px-2 py-1 text-[12px] rounded-lg text-[black] hover:border-2 cursor-pointer font-semibold ${(status === 'all') && 'bg-red-500 text-white'}`}>
                        All Bookings
                    </div>
                    <div onClick={() => setStatus('completed')} className={`border border-red-600 px-1 md:px-2 py-1 text-[12px] rounded-lg text-[black] hover:border-2 cursor-pointer font-semibold ${(status === 'completed') && 'bg-red-500 text-white'}`}>
                        Previous Bookings
                    </div>
                    <div onClick={() => setStatus('ongoing')} className={`border border-red-600 px-1 md:px-2 py-1 text-[12px] rounded-lg text-[black] hover:border-2 cursor-pointer font-semibold ${(status === 'ongoing') && 'bg-red-500 text-white'}`}>
                        Ongoing Bookings
                    </div>
                    <div onClick={() => setStatus('approved')} className={`border border-red-600 px-1 md:px-2 py-1 text-[12px] rounded-lg text-[black] hover:border-2 cursor-pointer font-semibold ${(status === 'approved') && 'bg-red-500 text-white'}`}>
                        Approved Bookings
                    </div>
                </div>

                <div className="h-[450px] w-[98%] border-r-gray-200 overflow-auto">
                    <table className="w-full text-left border-collapse bg-white text-sm text-gray-500">

                        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-1 py-4 text-[white] bg-red-500 border-r-2 border-r-gray-500 text-center">Id</th>
                                <th className="px-6 py-4 text-[white] bg-red-500 border-r-2 text-center border-r-gray-500">title</th>
                                <th className="px-4 py-4 text-[white] bg-red-500 border-r-2 text-center border-r-gray-500">guest</th>
                                <th className="px-6 py-4 text-[white] bg-red-500 border-r-2 text-center border-r-gray-500">checkin</th>
                                <th className="px-6 py-4 text-[white] bg-red-500 border-r-2 text-center border-r-gray-500">checkout</th>
                                <th className="px-6 py-4 text-[white] bg-red-500 border-r-2 text-center border-r-gray-500">status</th>
                                <th className="px-6 py-4 text-[white] bg-red-500 border-r-2 text-center border-r-gray-500">pay</th>
                                <th className="px-4 py-4 text-[white] bg-red-500 border-r-2 text-center border-r-gray-500">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {
                                (
                                    status === 'all' ? allBookings : 
                                    status === 'completed' ? completed :
                                    status === 'ongoing' ? ongoing :
                                    status === 'approved' ? approved : []
                                ).map((itr , index) => (
                                    <tr className="hover:bg-gray-50 transition-colors outline-1 outline-gray-400">
                                        <td className="text-center py-3 border-r-2 border-r-gray-200"> BD-{itr._id.slice(-8).toUpperCase()} </td>
                                        <td className="text-center py-3 border-r-2 border-r-gray-200"> {itr.listing?.title || "Property Deleted"} </td>
                                        <td className="text-center py-3 border-r-2 border-r-gray-200"> {itr.guest?.name} </td>
                                        <td className="text-center py-3 border-r-2 border-r-gray-200"> {itr.checkIn.split('T')[0]} </td>
                                        <td className="text-center py-3 border-r-2 border-r-gray-200"> {itr.checkOut.split('T')[0]} </td>
                                        <td className="text-center py-3 border-r-2 border-r-gray-200"> {itr.status} </td>
                                        <td className="text-center py-3 border-r-2 border-r-gray-200"> {parseInt(itr.totalRent)} </td>
                                        <td className="text-center">
                                            {
                                               itr.status === 'approved' ? (
                                                <button onClick={() => {
                                                    setBookingId(itr._id); 
                                                    setShowPopUp(true);
                                                }} className="h-8 w-16 text-[white] font-semibold bg-[red] rounded-lg cursor-pointer hover:bg-red-600 flex text-center items-center justify-center">
                                                    { isCheckIn ? <Loader /> : 'CheckIn' }
                                                </button>
                                               ) : 
                                                itr.status === 'ongoing' ? (
                                                    <button onClick={() => CompleteBooking(itr._id)} className="h-8 w-16 text-[white] font-semibold bg-[red] rounded-lg cursor-pointer hover:bg-red-600 flex text-center items-center justify-center">
                                                        { isComplete ? <Loader /> : 'Complete' }
                                                    </button>
                                                ) : 
                                                itr.status === 'pending' ? (
                                                    <button onClick={() => approveBooking(itr._id)} className="h-8 w-16 text-[white] font-semibold bg-[red] rounded-lg cursor-pointer hover:bg-red-600 flex text-center items-center justify-center">
                                                        { isApproving ? <Loader /> : 'Approve' }
                                                    </button>
                                                ) : 
                                                itr.status === 'completed' ? (
                                                    <div className="text-[28px] text-[#00a100] flex justify-center items-center">
                                                        <TiInputChecked />
                                                    </div>
                                                ) : 
                                                itr.status === 'rejected' ? (
                                                    <div className="text-[22px] text-[#bd001f] flex justify-center items-center">
                                                        <MdDoNotDisturb />
                                                    </div>
                                                ) : 
                                                itr.status === 'cancelled' ? (
                                                    <div className="text-[22px] text-[#bd001f] flex justify-center items-center">
                                                        <ImCancelCircle />
                                                    </div>
                                                ) : ('')
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>

            </div>
        }

    </div>

  )
}

export default HostDashboard