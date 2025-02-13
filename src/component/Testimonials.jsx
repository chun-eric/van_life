import TestimonialCard from "./TestimonialCard";
import { homePageTestimonials } from "../data.js";

const Testimonials = () => {
  return (
    <div className='w-full bg-white'>
      <div className='flex flex-col items-center justify-center px-4 py-16 mx-auto text-center bg-orange-100 pb-36'>
        <div className='px-4 py-12 mx-auto md:py-24 max-w-7xl sm:px-6 lg:px-8'>
          <h1 className='mb-4 text-4xl font-bold'>Our Customers Love Us!</h1>
          <p className=''>Hear what they have to say</p>
        </div>

        {/* Testimonial Grid */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {homePageTestimonials.map((review, index) => (
            <TestimonialCard
              key={index}
              review={review}
              isMiddle={index === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
