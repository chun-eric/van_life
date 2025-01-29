import React from "react";
import { Link } from "react-router-dom";
import HeroBackground from "../assets/image-54.png";

const Home = () => {
  return (
    <div className='bg-[#FFF7ED] relative'>
      {" "}
      {/* Added background wrapper */}
      <div className='max-w-[1280px] mx-auto px-6 '>
        <div className='min-h-[calc(100vh-200px)] flex flex-col items-center justify-center  text-left'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url(${HeroBackground})`,
            }}
          />
          {/* Dark Overlay */}
          <div className='absolute inset-0 bg-black opacity-60' />
          <div className='mb-3 z-10 text-center flex flex-col gap-1 max-w-[800px]'>
            <h1 className='font-bold text-left sm:text-center text-4xl sm:text-5xl md:text-6xl lg:text-6xl mb-3 text-white  leading-wide'>
              You got the travel plans,
              <br /> we got the vans.
            </h1>

            <p className='text-white text-md sm:text-lg lg:text-xl my-2 text-left sm:text-center leading-relaxed'>
              Add adventure to your life by joining the #vanlife movement.
              <br />
              Rent the perfect van to make your perfect road trip.
            </p>
          </div>
          <Link
            to='/vans'
            className='bg-[#FF8C38] text-white w-[100%] max-w-[400px] text-center px-12 py-3 rounded capitalize mt-10 font-semibold z-10 text-lg'
          >
            Find your van
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
