import React from "react";
import HeroBackground from "../assets/image-54.png";
import { Link } from "react-router-dom";
import HeroImage from "../assets/hero.png";

const Hero = () => {
  return (
    <div className='min-h-screen text-black bg-white'>
      <div className='px-4 py-12 mx-auto md:py-24 max-w-7xl sm:px-6 lg:px-8'>
        {/* Added background wrapper */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14 items-center min-h-[80vh] '>
          {/* Text Container   */}
          <div className='order-1 md:order-1 '>
            <h1 className='mb-6 text-4xl font-bold leading-tight md:text-5xl'>
              You got the travel plans,
              <br />
              <span>we got the vans</span>
            </h1>

            <p className='my-1 leading-relaxed text-left text-slate-700 text-md sm:text-lg sm:text-left w-[90%] '>
              Discover the freedom of the open road with our premium van
              rentals. We have the perfect van for your next adventure.
            </p>
            <div className='flex flex-col gap-3 mt-6 xs:flex-row'>
              <Link to='/vans'>
                <button className='bg-[#FF8C38] text-white  text-center px-10 py-3 s capitalize  font-semibold z-10 text-base  border border-[#FF8C38] w-full '>
                  See More
                </button>
              </Link>
              <Link to='/vans'>
                <button className='z-10 w-full px-12 py-3 text-base font-semibold text-center text-black capitalize bg-white border border-black'>
                  Book
                </button>
              </Link>
            </div>
          </div>

          {/* Van Image right   */}
          <div className='flex items-center justify-center order-2 w-full mb-10 md:order-2 sm:mb-0'>
            <div className='flex items-center w-full h-full '>
              <img
                src={HeroImage}
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
