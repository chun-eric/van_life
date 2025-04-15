import React, { useState, useEffect } from 'react'
import Shape1 from '../assets/shapes1.svg'
import SideArrow from '../assets/side_arrow.svg'
import DownArrow from '../assets/down_arrow.svg'
import HeroImage2 from '../assets/hero4.svg'
import ButtonSet from './ButtonSet'

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
      setWindowWidth(window.innerWidth)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])
  return (
    <div className='min-h-screen text-black bg-white'>
      <div className='px-8 pt-24 pb-12 mx-auto border-gray-100 md:py-20 max-w-7xl lg:px-8'>
        {/* Added background wrapper */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-14 md:items-center min-h-[80vh] xs:items-left '>
          {/* Text Container   */}
          <div className='order-1 text-center md:order-1 lg:text-left '>
            <h1 className='mb-2 text-4xl font-bold leading-relaxed xs:mb-3 sm:mb-4 md:mb-6 xs:text-4xl md:text-8xl sm:text-5xl'>
              <div className='relative flex flex-col gap-0 md:gap-2'>
                <p className='flex-wrap'>
                  <em className='font-[lora]'>You</em> got the plans,
                </p>
                <p className='mt-0 xs:mt-1 md:mt-2'>
                  <em className='font-[lora]'>We</em> got the vans.
                  {/* Side arrow on large screens, positioned after "vans." */}
                  {!isMobile && (
                    <img
                      src={SideArrow}
                      alt='Side arrow'
                      className='absolute inline-block w-44  h-auto transform translate-y-[10%] -right-16 bottom-[-5%]'
                      style={{
                        width:
                          window.innerWidth >= 1025 && window.innerWidth <= 1088
                            ? '8rem'
                            : ''
                      }}
                    />
                  )}
                  {isMobile && windowWidth >= 369 && (
                    <img
                      src={DownArrow}
                      alt='Side arrow'
                      className='absolute inline-block transform translate-y-[10%] -left-12 bottom-[-105%] w-16 h-auto xs:w-20 sm:w-32 md:w-80 '
                      style={{
                        width:
                          windowWidth < 400
                            ? '12rem'
                            : windowWidth < 500
                            ? '12rem'
                            : windowWidth < 640
                            ? '12rem'
                            : windowWidth < 768
                            ? '14rem'
                            : '14rem',
                        left:
                          windowWidth < 400
                            ? '-4rem'
                            : windowWidth < 640
                            ? '-4rem'
                            : '-4rem',
                        bottom: windowWidth <= 777 ? '-260%' : '-105%'
                      }}
                    />
                  )}
                </p>
              </div>
            </h1>

            <p className='my-1 leading-relaxed  text-slate-700 text-md sm:text-lg w-[70%]  lg:text-left text-center mx-auto lg:mx-0'>
              Discover the freedom of the open road with our premium van
              rentals. We have the perfect van for your next adventure.
            </p>
            <div className='flex justify-center w-full mt-8 lg:justify-start'>
              <ButtonSet
                button1Text='See More'
                button2Text='Book Now'
                button1Link='/vans'
                button2Link='/book'
              />
            </div>
          </div>

          {/* Van Image right   */}
          <div className='relative flex items-center justify-center order-2 w-full mb-10 md:order-2 sm:mb-0'>
            {/* Shape1 positioned behind and to the right of the van */}
            <div
              className='absolute z-0 opacity-80 top-0 right-0 
              translate-y-[-20%] translate-x-[10%]
              sm:translate-y-[-20%] sm:translate-x-[10%]
              md:translate-y-[-15%] md:translate-x-[15%]'
            >
              <img
                src={Shape1}
                alt='Background shape'
                className='w-full h-full'
              />
            </div>

            <div className='z-10 flex items-center w-full h-full'>
              <img
                src={HeroImage2}
                alt='Van life Hero'
                className='object-cover w-full sm:h-[110%] h-full lg:scale-105 transition-transform duration-300'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
