import React, { useState , useContext } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import { userDataContext } from '../Context/UserContext';


const Login = () => {

  // Consume the value
  const {serverUrl} = useContext(authDataContext);
  const { setUserData } = useContext(userDataContext);

  const navigate = useNavigate() ; 

  const [show , setShow] = useState(false) ; 
  const [email , setEmail] = useState('') ; 
  const [password , setPassword] = useState('') ; 
  const [loading , setLoading] = useState(false) ; 

  // ---------- Handle Login ----------
  const LoginHandler = async (e) => {
    try {
      e.preventDefault() ; 
      setLoading(true);
      const res = await axios.post( serverUrl + "/auth/login" , 
        {email , password} , {withCredentials : true}
      );
      toast.success(res.data.message); 
      setUserData(res.data.user);
      setEmail(""); 
      setPassword("");
      navigate('/');
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    finally{
      setLoading(false)
    }
  }
  

  return (

    <div className='w-screen h-screen flex items-center justify-center relative'>

        <div className='h-10 w-10 bg-[red] rounded-full flex justify-center items-center top-[10%] left-5 absolute'>
          <button onClick={() => navigate('/')} className='cursor-pointer'><FaArrowLeftLong /></button>
        </div>

          <form action="" onSubmit={LoginHandler}
           className='bg-[#fff8f8] border border-gray-300 h-auto gap-2 w-[90%] md:w-[500px] rounded-lg shadow-md shadow-gray-600 flex justify-start items-center flex-col'>
          
          <div className=' h-[120px] w-[95%] mt-2'>
            <img src='./signup-banner.png' alt="" className='border border-gray-300 w-full h-full object-cover rounded-lg' />
          </div>

          <h1 className=' font-semibold text-[30px] font-serif'>
            Welcome Back!
          </h1>

          <div className='w-[90%] flex items-start justify-start flex-col gap-0 mt-1'>
            <label htmlFor="email" className='text-[20px]'>Email</label>
            <input type="text" placeholder='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)} className='w-[98%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4' />
          </div>


          <div className='w-[90%] flex items-start justify-start flex-col gap-2.5 relative' >
              <label htmlFor="password" className='text-[20px]'>Password</label>
              <input type={ show ? 'text' : 'password' } placeholder='password' id='password'required value={password} onChange={(e) => setPassword(e.target.value)} className='w-[98%] h-10 border-2 border-[#555656] rounded-lg text-[18px] px-4 ' />
              {
                !show ? 
                <IoMdEye onClick={() => setShow(true)} className='w-[22px] h-[22px] absolute right-[4%] bottom-2.5 cursor-pointer'/> 
                : 
                <IoMdEyeOff onClick={() => setShow(false)} className='w-[22px] h-[22px] absolute right-[4%] bottom-2.5 cursor-pointer'/>
              }
          </div>

          <button className='bg-[red] w-[90%] mt-2 h-12 rounded-lg text-white cursor-pointer text-[18px]'>
            {loading ? 'loading' : 'Login'}
          </button>

          <p className='text-[18px] mb-6 mt-2'>Does not have account? <span className='text-[19px] text-[red] cursor-pointer' onClick={() => navigate('/signup')}> Signup </span></p>

        </form>

    </div>
    

  )
}

export default Login
