import { Link } from "react-router-dom";
import HeroImage from "../assets/about-2.png";
import ButtonSet from "../component/ButtonSet";

const About = () => {
  return (
    <div className='flex flex-col min-h-screen gap-6 my-36 text-center relative max-w-[1280px] mx-auto '>
      <div className='px-6 mb-10'>
        <h1 className='my-10 mb-0 text-6xl font-bold text-left text-black '>
          We Belive in
        </h1>
        <h1 className='mt-2 text-5xl font-bold text-left text-black '>
          <span className='mt-2'>Adventure First.</span>
        </h1>
        <div className='border-b-4 border-black w-[60%] mt-4 h-3'></div>
      </div>

      {/* Hero Image Section */}
      <div className='flex flex-col items-start gap-4 px-6 md:flex-row'>
        <div className='w-full md:h-[80vh]  mx-auto shadow-md sm:h-[80%]'>
          <img
            src={HeroImage}
            alt='Van with pop-up roof at night'
            className='object-cover w-full h-full rounded-lg'
          />
        </div>

        {/* Content Section */}
        <div className='max-w-[1280px] mx-auto md:px-8 flex flex-col items-start px-0'>
          {/* Call to Action Section */}
          <div className='bg-[#FFCC8D] rounded-lg p-6 md:p-8 text-left py-16 my-3  max-w-[1280px] mx-auto w-full mb-14 md:py-8 mt-0 md:mt-0 shadow-sm '>
            <h2 className='mb-6 text-2xl font-bold text-black sm:text-3xl'>
              Your adventure,
              <br />
              Is only a click away.
            </h2>
            <Link
              className='inline-block px-5 py-3 font-medium text-white transition-colors duration-200 bg-black rounded-lg md:px-8 hover:bg-gray-800'
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
