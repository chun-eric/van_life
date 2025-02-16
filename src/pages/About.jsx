import { Link } from "react-router-dom";
import HeroImage from "../assets/about-2.png";
import ButtonSet from "../component/ButtonSet";

const About = () => {
  return (
    <div className='flex flex-col min-h-screen gap-6 my-24 text-center relative max-w-[1280px] mx-auto'>
      <div className='mb-10'>
        <h1 className='my-10 mb-0 text-5xl font-bold text-left text-black '>
          We Belive in
        </h1>
        <h1 className='mt-2 text-5xl font-bold text-left text-black '>
          <span className='mt-2'>Adventure First.</span>
        </h1>
      </div>

      {/* Hero Image Section */}
      <div className='flex flex-row items-start gap-1'>
        <div className='w-full h-[80vh]  mx-auto'>
          <img
            src={HeroImage}
            alt='Van with pop-up roof at night'
            className='object-cover w-full h-full rounded-lg'
          />
        </div>

        {/* Content Section */}
        <div className='max-w-[1280px] mx-auto px-8 flex flex-col items-start'>
          {/* Call to Action Section */}
          <div className='bg-[#FFCC8D] rounded-lg p-6 md:p-8 text-left py-16 my-3  max-w-[1280px] mx-auto w-full mb-14 md:py-8 mt-0 md:mt-0 '>
            <h2 className='mb-6 text-xl font-bold text-black md:text-2xl'>
              Your destination is waiting.
              <br />
              Your van is ready.
            </h2>
            <Link
              className='inline-block px-8 py-3 font-medium text-white transition-colors duration-200 bg-black rounded-lg hover:bg-gray-800'
              to='/vans'
            >
              Explore our vans
            </Link>
          </div>
          <div className='mb-12 text-left'>
            <h1 className='mb-6 text-xl font-bold md:text-4xl text-slate-950'>
              Don’t squeeze in a sedan when you could relax in a van.
            </h1>
            <p className='mb-6 text-md text-slate-950'>
              Our mission is to enliven your road trip with the perfect travel
              van rental. Our vans are recertified before each trip to ensure
              your travel plans can go off without a hitch. (Hitch costs extra
              😉)
            </p>
            <p className='text-md text-slate-950'>
              Our team is full of vanlife enthusiasts who know firsthand the
              magic of touring the world on 4 wheels.
            </p>
          </div>
          <div className=''>
            <ButtonSet
              button1Text='Learn More'
              button1Link='/about'
              button2Text='Sign Up'
              button2Link='/Login'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
