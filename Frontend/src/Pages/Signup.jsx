import React, { useState , useContext } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { authDataContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import { userDataContext } from '../Context/UserContext';

const Signup = () => {

  // Consume the value 
  const {serverUrl} = useContext(authDataContext) ; 
  const {userData , setUserData} = useContext(userDataContext) ;

  const navigate = useNavigate() ; 

  const [show , setShow] = useState(false) ; 
  const [name , setName] = useState('') ; 
  const [email , setEmail] = useState('') ; 
  const [password , setPassword] = useState('') ; 
  const [confirmPassword , setConfirmPassword] = useState(''); 
  const [loading , setLoading] = useState(false) ; 
  const [sending , setSending] = useState(false); 
  const [otp , setOtp] = useState(null); 

  const [isVerifying , setIsVerifying] = useState(false); 
  const [isVerified , setIsVerified] = useState(false); 

  const SendOtp = async (e) => {
    if(sending){
      return ; 
    }

    if(!email){
      toast.error("Enter Email!"); 
      return ; 
    }

    try {
      e.preventDefault(); 
      setSending(true); 
      const res = await axios.post(serverUrl + '/auth/otp' , 
        { email } , { withCredentials: true }
      ); 

      if(res.data.success){
        toast.success("Otp has been send"); 
        setIsVerifying(true); 
        setIsVerified(true); 
        setSending(false);
      }

    }

    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setSending(false);
    }

    finally{
      setSending(false);;
    }
  }

  const SignupHandler = async (e) => {
    e.preventDefault(); 
    if(!isVerified){
      toast.error("Verify your email first!"); 
      return ; 
    }

    if(password !== confirmPassword){
      toast.error("Confirm password must be same"); 
      return ; 
    }

    try {
      setLoading(true) ; 
      const res = await axios.post( serverUrl + "/auth/signup" , 
        {name , email , password , otp} , {withCredentials : true}
      ); 
      toast.success(res.data.message) ; 
      setUserData(res.data.user) ; 
      setName("") ; 
      setEmail("") ;
      setPassword("") ; 
      navigate('/') ; 
    }

    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    finally{
      setLoading(false);
    }
  }

  return (

    <div className='w-screen h-screen flex items-center justify-center relative'>
        
        <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[10%] left-5 absolute'>
          <button onClick={() => navigate('/')} className='cursor-pointer'><FaArrowLeftLong /></button>
        </div>

        <form action="" onSubmit={SignupHandler}
        className='bg-[#fff8f8] border border-gray-300 h-[600px] w-[90%] md:w-[500px] rounded-lg shadow-md shadow-gray-600 flex justify-start items-center flex-col'>
          
          <div className=' h-[120px] w-[95%] mt-2'>
            <img src='./signup-banner.png' alt="" className='border border-gray-300 w-full h-full object-cover rounded-lg' />
          </div>

          <h1 className=' font-semibold text-[30px] font-serif'>
            Create An Account
          </h1>

          <div className='w-[90%] flex items-start justify-start flex-col gap-0 mt-0'>
            <label htmlFor="name" className='text-[18px]'>Name</label>
            <input type="text" placeholder='name' id='name' value={name} onChange={(e) => setName(e.target.value)} className='w-[98%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
          </div>

          <div className='w-[90%] flex items-start justify-start flex-col gap-0 mt-1'>
            <label htmlFor="email" className='text-[18px]'>Email</label>
            <input type="text" placeholder='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} className='w-[98%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
          </div>

          <button onClick={(e) => {
            SendOtp(e);  
          }} className='bg-[red] w-[90%] mt-2 h-10 rounded-lg text-white cursor-pointer text-[16px]'>
            { sending ? 'loading..' : 'Verify Email' }
          </button>

          {
            isVerifying && 
            <div className='w-[90%] flex items-start justify-start flex-col gap-0 mt-1 '>
              <label htmlFor="otp" className='text-[18px]'>Otp : <span className='text-gray-700 text-[16px]'>An otp is sent to your email</span></label>
              <input type="text" placeholder='enter otp' id='otp' required value={otp} onChange={(e) => setOtp(Number(e.target.value))} className='w-[98%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
            </div>
          }

          <div className='w-[90%] flex items-start justify-start flex-col gap-2.5 relative' >
              <label htmlFor="password" className='text-[20px]'>Password</label>
              
              <div className='flex flex-row gap-2 w-full'>

                <div className='w-[50%]'>
                  <input type={ show ? 'text' : 'password' } placeholder='Password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)} className='w-full h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4 ' />
                </div>

                <div className='w-[50%]'>
                  <input type={ show ? 'text' : 'password' } placeholder='Confirm password' id='confirmPassword' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='w-full h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4 relative' />
                    {
                      !show ? 
                      <IoMdEye onClick={() => setShow(true)} className='w-[22px] h-[22px] absolute right-[3%] bottom-2.5 cursor-pointer'/> 
                      : 
                        <IoMdEyeOff onClick={() => setShow(false)} className='w-[22px] h-[22px] absolute right-[3%] bottom-2.5 cursor-pointer'/>
                    }
                </div>

              </div>                                              

            </div>

          <button className='bg-[red] w-[90%] mt-2 h-12 rounded-lg text-white cursor-pointer text-[18px]'>
            { loading ? 'loading' : 'Signup' }
          </button>

          <p className='text-[18px]'>Already have an account? <span className='text-[19px] text-[red] cursor-pointer' onClick={() => navigate('/login')}> Login </span></p>

        </form>

    </div>
    

  )
}

export default Signup
