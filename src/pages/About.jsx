import { Link } from "react-router-dom";
import HeroImage from "../assets/image-55.png";

const About = () => {
  return (
    <div className='min-h-screen bg-[#FFF7ED] flex flex-col gap-4 '>
      {/* Hero Image Section */}
      <div className='relative max-w-[1280px] mx-auto w-full h-full md:h-96 '>
        <img
          src={HeroImage}
          alt='Van with pop-up roof at night'
          className='w-full h-full object-cover rounded-lg'
        />
      </div>

      {/* Content Section */}
      <div className='max-w-[1280px] mx-auto px-8 md:py-8 my-4 '>
        <h1 className='text-2xl md:text-4xl font-bold mb-6 text-slate-950'>
          Don’t squeeze in a sedan when you could relax in a van.
        </h1>
        <p className='text-slate-950 mb-6 text-lg'>
          Our mission is to enliven your road trip with the perfect travel van
          rental. Our vans are recertified before each trip to ensure your
          travel plans can go off without a hitch. (Hitch costs extra 😉)
        </p>
        <p className='text-slate-950 text-lg'>
          Our team is full of vanlife enthusiasts who know firsthand the magic
          of touring the world on 4 wheels.
        </p>
      </div>

      {/* Call to Action Section */}
      <div className='bg-[#FFCC8D] rounded-lg p-6 md:p-8 text-left py-16 my-6  max-w-[1280px] mx-auto w-full mb-20 md:py-16  '>
        <h2 className='text-2xl md:text-3xl mb-6 text-black font-bold'>
          Your destination is waiting.
          <br />
          Your van is ready.
        </h2>
        <Link
          className='inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200'
          to='/vans'
        >
          Explore our vans
        </Link>
      </div>
    </div>
  );
};

export default About;
