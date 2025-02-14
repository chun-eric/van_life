import TestimonialCard from "./TestimonialCard";
import { homePageTestimonials } from "../data.js";

const Testimonials = () => {
  console.log(homePageTestimonials);
  function isMiddle(index) {
    // how many cards per row based on screen size
    const cardsPerRow =
      window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

    // if only 1 card no offset needed
    if (cardsPerRow === 1) {
      return false;
    }

    // With 3 cards per row:
    // Index: 0  1  2  3  4  5  6  7  8
    // Row:   1  1  1  2  2  2  3  3  3
    // Pos:   0  1  2  0  1  2  0  1  2
    //        ▢  ▲  ▢  ▢  ▲  ▢  ▢  ▲  ▢
    // (▲ indicates offset cards)

    // calculate position in current row
    const positionInRow = index % cardsPerRow;

    return positionInRow === 1; // this is index 1 in whatever row
  }

  return (
    <div className='w-full bg-white'>
      <div className='flex flex-col items-center justify-center px-4 py-16 mx-auto text-center bg-orange-100 rounded-xl pb-36'>
        <div className='px-4 py-12 mx-auto md:pb-6 md:py-24 max-w-7xl sm:px-6 lg:px-8'>
          <h1 className='mb-4 text-4xl font-semibold text-slate-900'>
            Our customers{" "}
            <span className='italic font-bold underline'>Love</span> us!
          </h1>
          <p className='text-base text-slate-600'>Hear what they have to say</p>
        </div>

        {/* Testimonial Grid */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 gap-y-0.5'>
          {homePageTestimonials.map((review, index) => {
            console.log("Mapping review:", review);
            return (
              <TestimonialCard
                key={index}
                review={review}
                isMiddle={isMiddle(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
