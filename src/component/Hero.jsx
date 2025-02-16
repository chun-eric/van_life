import React from "react";
import HeroBackground from "../assets/image-54.png";
import { Link } from "react-router-dom";
import HeroImage from "../assets/hero.png";
import HeroImage2 from "../assets/hero4.svg";
import ButtonSet from "./ButtonSet";

const Hero = () => {
  return (
    <div className='min-h-screen text-black bg-white'>
      <div className='px-8 pt-24 pb-12 mx-auto border-b border-gray-100 md:py-20 max-w-7xl sm:px-6 lg:px-8'>
        {/* Added background wrapper */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14 items-center min-h-[80vh] '>
          {/* Text Container   */}
          <div className='order-1 md:order-1 '>
            <h1 className='mb-6 text-4xl font-bold leading-relaxed md:text-5xl'>
              <div className='flex flex-col gap-0 md:gap-2'>
                <p className=''>You got the travel plans,</p>
                <p className='-mt-2 md:mt-2'>we got the vans</p>
              </div>
            </h1>

            <p className='my-1 leading-relaxed text-left text-slate-700 text-md sm:text-lg sm:text-left w-[90%] '>
              Discover the freedom of the open road with our premium van
              rentals. We have the perfect van for your next adventure.
            </p>
            <div className='flex flex-col gap-3 mt-8 xs:flex-row'>
              <ButtonSet
                button1Text='See More'
                button2Text='Book'
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
                className='object-cover w-full sm:h-[80%] h-full '
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
