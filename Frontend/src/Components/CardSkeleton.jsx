import React from 'react'

const CardSkeleton = () => {
  return (
    <div className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg relative z-10'>

      <div className='w-full h-[67%] rounded-lg overflow-hidden bg-[#F3F1EC] relative'>
        <div className='w-full h-full bg-linear-to-r from-[#F3F1EC] via-gray-200 to-[#F3F1EC] bg-size-[200%_100%] animate-[shimmer_1.6s_ease-in-out_infinite]'></div>
      </div>

      <div className='w-full h-[33%] py-5 flex flex-col gap-2'>
        <div className='flex justify-between items-center gap-3'>
          <div className='h-[18px] w-[65%] rounded-full bg-[#F3F1EC] overflow-hidden relative'>
            <div className='w-full h-full bg-linear-to-r from-[#F3F1EC] via-gray-200 to-[#F3F1EC] bg-size-[200%_100%] animate-[shimmer_1.6s_ease-in-out_infinite]'></div>
          </div>
          <div className='h-[18px] w-[15%] rounded-full bg-[#F3F1EC] overflow-hidden relative'>
            <div className='w-full h-full bg-linear-to-r from-[#F3F1EC] via-gray-200 to-[#F3F1EC] bg-size-[200%_100%] animate-[shimmer_1.6s_ease-in-out_infinite]'></div>
          </div>
        </div>

        <div className='h-4 w-[50%] rounded-full bg-[#F3F1EC] overflow-hidden relative'>
          <div className='w-full h-full bg-linear-to-r from-[#F3F1EC] via-gray-200 to-[#F3F1EC] bg-size-[200%_100%] animate-[shimmer_1.6s_ease-in-out_infinite]'></div>
        </div>

        <div className='h-[18px] w-[35%] rounded-full bg-[#F3F1EC] overflow-hidden relative'>
          <div className='w-full h-full bg-linear-to-r from-[#F3F1EC] via-gray-200 to-[#F3F1EC] bg-size-[200%_100%] animate-[shimmer_1.6s_ease-in-out_infinite]'></div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

    </div>
  )
}

export default CardSkeleton