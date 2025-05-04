import React from 'react'

const Hero = () => {
  return (
    <>
        <div className='bg-[url(https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg)] bg-cover bg-center w-full h-[calc(100vh-64px)] flex items-end'>
            <div className='p-36'>
                <p className='text-gray-300 font-light text-sm'>About us</p>
                <h1 className='text-white text-4xl'>Great Food,</h1>
                <h1 className='text-white text-4xl'>Great Taste,</h1>
            </div>
        </div>
    </>
  )
}

export default Hero