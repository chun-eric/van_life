import React from 'react'

import HeroImage2 from '../assets/hero4.svg'
import ButtonSet from './ButtonSet'

const Hero = () => {
  return (
    <div className='min-h-screen text-black bg-white'>
      <div className='px-8 pt-24 pb-12 mx-auto border-gray-100 md:py-20 max-w-7xl lg:px-8'>
        {/* Added background wrapper */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-14 items-center min-h-[80vh] xs:items-left '>
          {/* Text Container   */}
          <div className='order-1 text-center md:order-1 md:text-left '>
            <h1 className='mb-6 font-bold leading-relaxed xs:text-4xl md:text-6xl sm:text-5xl'>
              <div className='flex flex-col gap-0 md:gap-2'>
                <p className='flex-wrap '>You got the plans,</p>
                <p className='mt-1 md:mt-2'>We got the vans.</p>
              </div>
            </h1>

            <p className='my-1 leading-relaxed  text-slate-700 text-md sm:text-lg w-[70%]  md:text-left text-center mx-auto md:mx-0'>
              Discover the freedom of the open road with our premium van
              rentals. We have the perfect van for your next adventure.
            </p>
            <div className='flex justify-center w-full mt-8 md:justify-start'>
              <ButtonSet
                button1Text='See More'
                button2Text='Book Now'
                button1Link='/vans'
                button2Link='/book'
              />
            </div>
          </div>

          {/* Van Image right   */}
          <div className='flex items-center justify-center order-2 w-full mb-10 md:order-2 sm:mb-0'>
            <div className='flex items-center w-full h-full '>
              <img
                src={HeroImage2}
                alt='Van life Hero'
                className='object-cover w-full sm:h-[100%] h-full '
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
