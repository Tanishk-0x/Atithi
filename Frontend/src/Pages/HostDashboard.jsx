import { IoHomeOutline } from "react-icons/io5";
import { CiDollar } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { PiChartLineUp } from "react-icons/pi";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useContext, useEffect, useState } from "react";
import { userDataContext } from "../Context/UserContext";
import { useNavigate } from 'react-router-dom';
import { hostDataContext } from "../Context/HostContext";
import { reviewDataContext } from "../Context/reviewContext";
import { IoIosStar } from "react-icons/io";

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
        approveBooking , 
        isApproving , 
        CheckInBooking , 
        isCheckIn ,
    } = useContext(hostDataContext); 

    // ---- Dummy Data For Chart ----
    const data = [
        { month: 'Jan' , value: 12000} ,
        { month: 'Feb' , value: 6000} ,
        { month: 'Mar' , value: 8000} , 
        { month: 'Apr' , value: 13000} , 
        { month: 'May' , value: 15000} , 
        { month: 'Jun' , value: 18000} , 
        { month: 'Jul' , value: 4000} , 
        { month: 'Aug' , value: 5000} , 
        { month: 'Sep' , value: 6000} , 
        { month: 'Oct' , value: 8000} , 
        { month: 'Nov' , value: 8000} , 
        { month: 'Dec' , value: 4000} , 
    ]; 

    const listingsDummyData = [
        {
                "ratings": 0,
                "_id": "69207d59d3b4846cf7865412",
                "title": "Yellow Bedroom ",
                "description": "A Yellow Themed Bedroom With Beautiful Ambiance Glossy ",
                "host": "69184463b266357dfd2b0046",
                "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764685551/nuzcgurwnbt4scpqpciy.jpg",
                "image2": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764685554/qfhi1nhpjnvuh13igqdk.jpg",
                "image3": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764685556/bdjqkbg2m28n7mvclcbm.jpg",
                "rent": 9999,
                "city": "Indore",
                "landmark": "Marimata Square",
                "category": "pool house",
                "isBooked": false
            },
            {
                "ratings": 0,
                "_id": "6925a1c7e604d130c586d227",
                "title": "Simple House",
                "description": "simple fully furnished house for 2 people",
                "host": "69184463b266357dfd2b0046",
                "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764073926/dceees6w6mt9kk5s9hoq.jpg",
                "image2": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764073930/byok7u78x0utrqfmlvhh.jpg",
                "image3": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764073932/pgxxvj1mio1jecmis13l.jpg",
                "rent": 5100,
                "city": "Indore",
                "landmark": "Marimata Square",
                "category": "flat",
                "isBooked": false
            },
            {
                "ratings": 0,
                "_id": "69270fb8ccf09fd83e087c47",
                "title": "Blue Bedrooom ",
                "description": "Fully Centralised Blue Themed Bedroom With Beautiful Ambinace",
                "host": "69184463b266357dfd2b0046",
                "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764684841/olxx6wypoeyy8s0ahvec.jpg",
                "image2": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764684842/uycldhpqguxlgztl7scw.jpg",
                "image3": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764684845/bg1mjdc5asxpgeuwiskz.jpg",
                "rent": 5121,
                "city": "Indore",
                "landmark": "Khajrana Ganesh",
                "category": "farm house",
                "isBooked": false
            },
            {
                "_id": "69271079ccf09fd83e087c90",
                "title": "Pool House",
                "description": "Pool House With Multiple Stage Pools",
                "host": "69184463b266357dfd2b0046",
                "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764167799/evyaolgonbo60yksoo0i.jpg",
                "image2": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764167803/pop2bne1eqzv3gr05pk8.jpg",
                "image3": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764167806/m9ijaahgpxn5deqyhswy.jpg",
                "rent": 1151,
                "city": "Indore",
                "landmark": "PitraParvat",
                "category": "pool house",
                "isBooked": false,
                "ratings": 0
            },
            {
                "_id": "692713b4ccf09fd83e087cd0",
                "title": "Fantastic Shop",
                "description": "A Shop With  Beautiful Embianced ",
                "host": "69184463b266357dfd2b0046",
                "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764168628/ukmvxxx2iximhrbxuw1n.jpg",
                "image2": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764168631/mytafibrmobjx8b4ivn8.jpg",
                "image3": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764168633/lfhkxntzkxgq73blk0v1.jpg",
                "rent": 9900,
                "city": "Banaras",
                "landmark": "PostOffice",
                "category": "shops",
                "isBooked": false,
                "ratings": 4
            },
            {
                "_id": "69271639ccf09fd83e087cf7",
                "title": "2Bhk Blue House",
                "description": "Fully Furnished Blue Themed House With Beautiful Ambiance",
                "host": "69184463b266357dfd2b0046",
                "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764685080/wnkmoso2kaunmqlnlcbp.jpg",
                "image2": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764685081/l0jgdppir39jphwfyhmq.jpg",
                "image3": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764685084/nnoilkxshgr5accj0fei.jpg",
                "rent": 1151,
                "city": "Katra/Jammu",
                "landmark": "15, Railway Station",
                "category": "farm house",
                "isBooked": false,
                "ratings": 0
            },
            {
                "_id": "69285c8cfaa8ef4a3ba2c808",
                "title": "3.5 BHK House",
                "description": "Beautiful House With Various Facility , Beautiful Bedroom Green Themed ",
                "host": "69184463b266357dfd2b0046",
                "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764683827/tygb4sps5xgenmow92jp.jpg",
                "image2": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764683830/jpqxauxsawpfbyyqmibz.jpg",
                "image3": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764683833/lgrisgczq3pustj7kuce.jpg",
                "rent": 5151,
                "city": "Jabalpur",
                "landmark": "Bijasan MataMandir",
                "category": "villa",
                "isBooked": false,
                "ratings": 2
            },
            {
                "_id": "6950c3a8c21a3d0939874e52",
                "title": "3bhk room ",
                "description": "beautiful room available with various facilities",
                "host": "69184463b266357dfd2b0046",
                "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1766900642/pcyzlpqoudwzliiriist.jpg",
                "image2": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1766900645/enujmcl1ibf8azz2moqy.jpg",
                "image3": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1766900647/ec39ss1by5ejj4m05tyg.jpg",
                "rent": 2100,
                "city": "Rajkot",
                "landmark": "73, Clerk Colony",
                "category": "rooms",
                "ratings": 5,
                "isBooked": false
            }
    ];

    const requestsDummyData = [
        {
            "listing" : "Yellow House" , 
            "checkIn" : "2026-02-03" ,
            "checkOut": "2026-02-07" , 
            "guest" : "Tanmay Verma" , 
        }, 
        {
            "listing" : "Green House" , 
            "checkIn" : "2026-02-03" ,
            "checkOut": "2026-02-07" , 
            "guest" : "Satyam Nayak" , 
        },
        {
            "listing" : "Blue House" , 
            "checkIn" : "2026-02-03" ,
            "checkOut": "2026-02-07" , 
            "guest" : "Keshav Solanki" , 
        },
        {
            "listing" : "Orange House" , 
            "checkIn" : "2026-02-03" ,
            "checkOut": "2026-02-07" , 
            "guest" : "Mohit Nayak" , 
        },
        {
            "listing" : "Purple House" , 
            "checkIn" : "2026-02-03" ,
            "checkOut": "2026-02-07" , 
            "guest" : "Adarsh Verma" , 
        },
    ]; 

    const timelineDummyData = [
        {
            "guest" : "Mohan Verma" ,
            "CheckIn" : "2-02-2026" , 
            "CheckOut" : "6-02-2026" , 
            "landmark" : "dadarEast" , 
            "city" : "mumbai" , 
            "rent" : "1500" , 
            "title" : "Yellow Bedroom" ,
            "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764685551/nuzcgurwnbt4scpqpciy.jpg",
        },
        {
            "guest" : "Mohan Verma" ,
            "CheckIn" : "2-02-2026" , 
            "CheckOut" : "6-02-2026" , 
            "landmark" : "dadarEast" , 
            "city" : "mumbai" , 
            "rent" : "1500" , 
            "title" : "Yellow Bedroom" ,
            "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764685551/nuzcgurwnbt4scpqpciy.jpg",
        },
        {
            "guest" : "Mohan Verma" ,
            "CheckIn" : "2-02-2026" , 
            "CheckOut" : "6-02-2026" , 
            "landmark" : "dadarEast" , 
            "city" : "mumbai" , 
            "rent" : "1500" , 
            "title" : "Yellow Bedroom" ,
            "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764685551/nuzcgurwnbt4scpqpciy.jpg",
        },
        {
            "guest" : "Mohan Verma" ,
            "CheckIn" : "2-02-2026" , 
            "CheckOut" : "6-02-2026" , 
            "landmark" : "dadarEast" , 
            "city" : "mumbai" , 
            "rent" : "1500" , 
            "title" : "Yellow Bedroom" ,
            "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764685551/nuzcgurwnbt4scpqpciy.jpg",
        },
        {
            "guest" : "Mohan Verma" ,
            "CheckIn" : "2-02-2026" , 
            "CheckOut" : "6-02-2026" , 
            "landmark" : "dadarEast" , 
            "city" : "mumbai" , 
            "rent" : "1500" , 
            "title" : "Yellow Bedroom" ,
            "image1": "https://res.cloudinary.com/dhwwgg0u9/image/upload/v1764685551/nuzcgurwnbt4scpqpciy.jpg",
        },
    ];

    const [showPopUp , setShowPopUp] = useState(false); 

    // ------ CheckIn ---------
    const [ bookingId , setBookingId ] = useState(''); 
    const [ passCode , setPassCode ] = useState(''); 

    useEffect(() => {
        getHostData(); 
        FetchReviews(); 
    }, []); 


  return (

    <div className="md:h-screen h-auto w-full flex flex-col items-center gap-1 relative overflow-x-hidden">
      
      <div className="bg-[#eeeeee] h-18 md:h-[8%] w-[95%] md:w-[90%] mt-4 md:mt-2 rounded-lg flex justify-between items-center px-3">
        <div onClick={() => approveBooking('699087c5bb6b0e785d8411dc')} className="h-full flex items-center justify-center">
            <img src="./Airbnb-Logo.png" alt="" className="w-[100px] md:w-[130px]"/>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
            <div className="flex flex-row gap-2 md:gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gray-400 text-[white] font-semibold text-[18px] md:text-[24px] flex items-center justify-center">
                    T
                </div>
                <div className="hidden sm:block">
                    <p className="text-red-500 font-semibold text-[12px] md:text-[16px]">Welcome, <span className="text-black"> {userData?.name} </span></p>
                    <p className="text-[gray] text-[10px] md:text-[14px]"> {userData?.email} </p>
                </div>
            </div>
            <button onClick={() => navigate('/')} className="bg-[red] h-10 md:h-10 w-18 md:w-20 rounded-lg cursor-pointer font-semibold text-[white] hover:bg-red-600 text-[14px] md:text-[16px]">
                Logout
            </button>
        </div>
      </div>

      <div className="h-auto md:h-[14%] w-[95%] md:w-[90%] flex flex-wrap items-center justify-center gap-2 md:gap-4 py-2 md:py-0">
        <div className="bg-red-600 w-[46%] md:w-[20%] h-20 md:h-[80%] rounded-lg flex items-center justify-start px-3 md:px-5 gap-2 md:gap-4">
            <div className="h-10 w-10 md:h-15 md:w-15 bg-red-700 text-[white] text-[20px] md:text-[28px] rounded-lg flex items-center justify-center shrink-0">
                <IoHomeOutline />
            </div>
            <div className="h-auto text-[white] text-nowrap">
                <p className="text-[12px] md:text-[16px]">Total Listings:</p>
                <p className="text-[18px] md:text-[28px] font-semibold"> {userData?.listing?.length} </p>
            </div>
        </div>
        <div className="bg-red-600 w-[46%] md:w-[20%] h-20 md:h-[80%] rounded-lg flex items-center justify-start px-3 md:px-5 gap-2 md:gap-4">
            <div className="h-10 w-10 md:h-15 md:w-15 bg-red-700 text-[white] text-[20px] md:text-[28px] rounded-lg flex items-center justify-center shrink-0">
                <CiDollar />
            </div>
            <div className="h-auto text-[white] text-nowrap">
                <p className="text-[12px] md:text-[16px]">Total Revenue:</p>
                <p className="text-[18px] md:text-[28px] font-semibold">00</p>
            </div>
        </div>
        <div className="bg-red-600 w-[46%] md:w-[20%] h-20 md:h-[80%] rounded-lg flex items-center justify-start px-3 md:px-5 gap-2 md:gap-4">
            <div className="h-10 w-10 md:h-15 md:w-15 bg-red-700 text-[white] text-[20px] md:text-[28px] rounded-lg flex items-center justify-center shrink-0">
                <GoClock />
            </div>
            <div className="h-auto text-[white] text-nowrap">
                <p className="text-[12px] md:text-[16px]">Pending Requests</p>
                <p className="text-[18px] md:text-[28px] font-semibold"> {pending?.length} </p>
            </div>
        </div>
        <div className="bg-red-600 w-[46%] md:w-[20%] h-20 md:h-[80%] rounded-lg flex items-center justify-start px-3 md:px-5 gap-2 md:gap-4">
            <div className="h-10 w-10 md:h-15 md:w-15 bg-red-700 text-[white] text-[20px] md:text-[28px] rounded-lg flex items-center justify-center shrink-0">
                <PiChartLineUp />
            </div>
            <div className="h-auto text-[white] text-nowrap">
                <p className="text-[12px] md:text-[16px]">Occupancy Rate:</p>
                <p className="text-[18px] md:text-[28px] font-semibold">00</p>
            </div>
        </div>
        <div className="bg-[#f0f0f0] rounded-lg w-[95%] md:w-[15%] h-auto md:h-[98%] flex flex-col justify-center items-center gap-1 p-2 md:p-0">
            <div className="w-full flex items-start px-4 font-semibold text-[14px] md:text-[16px]">
                Quick Actions:
            </div>
            <button onClick={() => navigate('/listingpage1') } className="bg-red-500 w-[90%] py-1 md:py-1 rounded-lg cursor-pointer text-[white] hover:bg-red-600 text-[14px]">
                Add New Listing
            </button>
            <button onClick={() => navigate('/') } className="bg-red-500 w-[90%] py-1 md:py-1 rounded-lg cursor-pointer text-[white] hover:bg-red-600 mb-1 text-[14px]">
                Back To Home
            </button>
        </div>
      </div>

      <div className="w-[95%] md:w-[90%] h-auto md:h-[88%] mb-2 flex flex-col md:flex-row gap-2 items-center justify-center">
        <div className="h-full w-full md:w-[65%] flex items-center justify-center flex-col gap-2">
            
            {/* --------- Chart!----------- */}
            <div className="w-full md:w-[98%] h-[300px] md:h-[50%] pt-4 rounded-lg  bg-[white]">
                <ResponsiveContainer width="98%" height="98%">
                    <BarChart data={data}>
                        <XAxis dataKey="month" />
                        <YAxis style={{ fontSize: '14px' }} />
                        <Bar dataKey="value" fill="#D22B2B" activeBar={{ fill:"red" }}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* --------- Listings ----------- */}
            <div className="w-full md:w-[98%] h-auto md:h-[50%] flex items-center justify-center flex-col md:flex-row gap-2">
                <div className="bg-[#F9F6EE] w-full md:w-[60%] h-[400px] md:h-[98%] rounded-lg flex flex-col justify-center items-center p-2">
                    <div className="w-full flex items-start px-4 font-semibold text-[18px]"> Listings: </div>
                    
                    <div className="bg-[white] py-2 w-[98%] h-[90%] mb-2 flex items-center overflow-y-auto flex-col gap-3">
                        
                        {
                            userData?.listing.map((item,key) => (
                                <div key={key} className="bg-[#edede3] min-h-[110px] w-[95%] flex flex-row rounded-lg shrink-0">
                                    <div className="h-full w-[30%] flex items-center justify-center p-1">
                                        <img src={item.image1} alt="" className="rounded-lg w-full h-[90px] object-cover" />
                                    </div>
                                    <div className="h-full w-[70%] flex justify-between flex-col py-1">
                                        <div className="w-full flex flex-col">
                                            <div className="flex justify-between items-center px-2">
                                                <p className="font-semibold text-[14px] md:text-[16px]"> {item.title} </p>
                                                <p className="font-semibold text-[14px] md:text-[16px] text-[red]"> ₹{item.rent} </p>
                                            </div>
                                            <div className="px-2 w-full text-[10px] md:text-[12px] text-[gray] line-clamp-2">
                                                {item.description}
                                            </div>
                                        </div>

                                        <div className="px-2 w-full flex justify-between items-center">
                                            <p className="text-[12px] md:text-[14px] text-gray-700"> {`${item.landmark} , ${item.city}`} </p>
                                            <p className="bg-green-300 text-[10px] md:text-[12px] text-green-600 rounded-lg px-1 py-0 text-nowrap"> {item.category} </p>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>

                {/* -------- Reviews --------- */}
                <div className="bg-[#F9F6EE] w-full md:w-[40%] h-[400px] md:h-[98%] rounded-lg flex items-center justify-center flex-col gap-2 p-2">
                    <div className="w-full flex items-start text-[18px] font-semibold px-4"> Reviews: </div>
                    <div className="bg-[white] py-1 w-[95%] h-[90%] mb-2 flex items-center flex-col gap-2 overflow-y-auto">
                    {
                        reviewsHost.length > 0 && 
                        reviewsHost.map((itr, key) => (
                            <div key={key} className="w-[95%] bg-[#edede3] shrink-0 h-auto flex items-center justify-center flex-col gap-1 py-1 rounded-lg shadow-sm shadow-gray-400 border border-gray-500">
                                <div className=" w-[98%] h-auto flex justify-between items-center px-1">
                                    <div className="flex flex-row gap-2 justify-center items-center">
                                        <div className="h-6 w-6 md:h-8 md:w-8 bg-gray-300 flex justify-center items-center rounded-full font-semibold text-[12px]">
                                            {itr.guest?.name?.slice(0,1).toUpperCase()}
                                        </div>
                                        <div className="text-[12px] md:text-[14px]">
                                            <p>{itr.guest.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-1 md:gap-2 justify-center items-center text-[10px] md:text-[12px]">
                                        <div>
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
            
            {/* ------- Requests ---------- */}
            <div className="bg-[#F9F6EE] h-[400px] md:h-[48%] w-full md:w-[98%] rounded-lg flex flex-col items-center justify-center gap-1 p-2">
                <div className="w-full px-4 items-start font-semibold text-[18px]"> Pending Requests: </div>
                <div className="bg-white w-[95%] h-[85%] px-2 md:px-4 flex items-center overflow-y-auto rounded-lg mb-2 flex-col gap-2 py-2">
                    
                    {
                        pending.map((item,key) => (
                            <div key={key} className="bg-[#edede3] w-[98%] min-h-20 md:h-[70px] flex flex-col md:flex-row justify-between items-center gap-2 rounded-lg border-b-2 border-[gray] px-2 py-2 md:py-0 shrink-0">
                                <div className="flex items-center justify-start md:justify-between gap-2 w-full md:w-[60%] h-full">
                                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-red-500 flex items-center justify-center text-[white] font-bold text-[20px] md:text-[28px] shrink-0">
                                        <GoClock />
                                    </div>
                                    <div className="flex flex-col py-1 h-full w-full overflow-hidden">
                                        <div className="text-[14px] md:text-[16px] font-semibold truncate"> {item.listing.title} </div>
                                        <div className="text-[10px] md:text-[12px] text-[gray] truncate"> {item.guest.name} </div>
                                        <div className="text-[12px] md:text-[14px] text-[red] truncate"> {`${item.checkIn.split('T')[0]} - ${item.checkOut.split('T')[0]}`} </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto justify-end">
                                    <button className="px-2 md:px-3 py-1 md:py-3 font-semibold md:text-[14px] bg-red-500 rounded-lg cursor-pointer text-[white] hover:bg-red-600 text-[12px]">
                                        Reject
                                    </button>
                                    <button onClick={() => approveBooking(item._id)}
                                    className="px-2 md:px-2 py-2 md:py-3 font-semibold md:text-[14px] bg-red-500 rounded-lg cursor-pointer text-[white] hover:bg-red-600 text-[12px]">
                                        { isApproving ? 'Approving' : 'Approve'}
                                    </button>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>

            {/* -------- Timelines --------- */}
            <div className="bg-[#F9F6EE] h-[400px] md:h-[48%] w-full md:w-[98%] rounded-lg flex flex-col items-center justify-center gap-1 p-2">
                <div className="w-full px-4 items-start font-semibold text-[18px]"> CheckIn/CheckOut Timeline: </div>
                
                <div className="bg-white w-[95%] h-[85%] py-2 flex items-center flex-col overflow-y-auto gap-2 px-2 rounded-lg mb-2">
                    
                    {
                        approved.map((item,key) => (
                            <div key={key} className="bg-[#edede3] w-[98%] min-h-[90px] md:h-20 rounded-lg border-b-2 border-[gray] flex justify-between items-center gap-2 p-1 shrink-0">
                                <div className=" h-full w-[24%]">
                                    <img src={item.listing.image1} alt="" className="h-full w-full object-cover rounded-lg" />
                                </div>
                                <div className="px-1 w-[52%] h-full flex flex-col items-start justify-center overflow-hidden">
                                    <div className="w-full flex items-center justify-between">
                                        <p className="text-[12px] md:text-[14px] font-semibold truncate"> {item.listing.title} </p>
                                        <p className="text-[12px] md:text-[14px] font-semibold text-[green]"> {`₹${item.totalRent}`} </p>
                                    </div>
                                    <p className="text-[12px] truncate"> {item.guest.name} </p>
                                    <p className="text-[12px] font-semibold text-[red] truncate"> {`${item.checkIn.split('T')[0]} - ${item.checkOut.split('T')[0]}`} </p>
                                    <p className="text-[gray] text-[10px] truncate"> {`${item.listing.landmark}/${item.listing.city}`} </p>
                                </div>
                                <div className="px-1 w-[22%]">
                                    <button onClick={() => {
                                        setShowPopUp(true) ; 
                                        setBookingId(item._id);
                                        console.log("ID: " , bookingId); 
                                    }} className="bg-red-500 px-2 md:px-3 py-2 md:py-3 font-semibold md:text-[14px] rounded-lg cursor-pointer text-[white] hover:bg-red-600 text-[12px]">
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
        
        { showPopUp && 
            <div className="bg-[#eeeeee] border-2 border-[gray] fixed h-[220px] w-[90%] max-w-[400px] flex flex-col gap-4 justify-center items-center rounded-lg top-[34%] z-50"> 
                <button onClick={() => setShowPopUp(false)}
                 className="bg-red-500 absolute top-2 right-2 rounded-full text-white border border-red-600 cursor-pointer h-8 w-8 text-lg hover:bg-red-600">
                    X
                </button>
                <h1 className="text-[24px] md:text-[28px] font-semibold">Enter Pass Code : </h1>
                <div>
                    <input onChange={(e) => setPassCode(e.target.value)}
                    className="w-[200px] md:w-[250px] h-[50px] bg-white outline-none px-2 text-[24px] md:text-[28px] border-2 border-[gray] rounded-lg text-[black]"
                    type="number" name="" id="" />
                </div>
                <button onClick={() => 
                    CheckInBooking(bookingId , passCode)
                } className="px-4 py-2 bg-red-500 cursor-pointer rounded-lg text-[white] hover:bg-red-600 text-[18px] md:text-[22px]">
                    { isCheckIn ? 'loading..' : 'CheckIn' }
                </button>
            </div>
        }
      

    </div>

  )
}

export default HostDashboard