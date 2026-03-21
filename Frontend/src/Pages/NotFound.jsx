import { useNavigate } from 'react-router-dom';


const NotFound = () => {

    const navigate = useNavigate(); 

    return (

        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='flex items-center justify-center flex-col gap-1 '>
                <img src='/nf.png' alt="Page Not Found" draggable={false} className='w-[440px]'/>
                <h1 className='text-[34px] text-nowrap font-semibold text-gray-800 font-mono'> Page Not Found </h1>
                <p className='text-[16px] text-gray-500'> The page you are looking for does not exist</p>
                <button onClick={() => navigate('/')} className='bg-[red] text-[white] px-22 text-[18px] font-semibold py-3 rounded-lg cursor-pointer hover:bg-red-600'>Back to Home</button>
            </div> 
        </div>

    )
}

export default NotFound
