import React from 'react'

const Offers = () => {
  return (
    <>
        <div className="w-full bg-[#FBF2F2] flex flex-col justify-center items-center px-[10vw]">
            <h1 className='font-bold text-4xl'>
                Today&apos;s Offers
            </h1>
            <div className='grid grid-cols-3 gap-6 my-4'>
                <a href=""><img src="https://cdn.grabon.in/gograbon/images/web-images/uploads/1618575517942/food-coupons.jpg" alt="" className='rounded-xl hover:scale-104 transition-all duration-100 ease-in'/></a>
                <a href=""><img src="https://cdn.grabon.in/gograbon/images/web-images/uploads/1618575517942/food-coupons.jpg" alt="" className='rounded-xl hover:scale-104 transition-all duration-100 ease-in'/></a>
                <a href=""><img src="https://cdn.grabon.in/gograbon/images/web-images/uploads/1618575517942/food-coupons.jpg" alt="" className='rounded-xl hover:scale-104 transition-all duration-100 ease-in'/></a>
            </div>
        </div>
    </>
  )
}

export default Offers