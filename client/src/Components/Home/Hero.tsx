import React from 'react'

const Hero = () => {
  return (
    <div className='max-w-[1640px] mx-auto h-[100vh]'>
        <div className='h-full relative'>
            <div className='absolute w-full h-full text-gray-200 bg-black/40 flex flex-col justify-center p-8'>
                <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>The <span className='text-orange-500'>Best</span></h1>
                <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'><span className='text-orange-500'>Foods</span> Delivered</h1>
            </div>
            <img src="https://images.pexels.com/photos/958546/pexels-photo-958546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="image" className='w-full h-full object-cover'/>
        </div>
    </div>
  )
}

export default Hero