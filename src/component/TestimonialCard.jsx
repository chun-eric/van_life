import { Star } from "lucide-react";
import PropTypes from "prop-types";

const TestimonialCard = ({ review, isMiddle }) => {
  return (
    <div
      className={`p-6 py-8 space-y-4 rounded-lg bg-white border border-black w-[280px] h-[260px] ${
        isMiddle ? "md:mt-12" : ""
      }`}
    >
      {/* Star section */}
      <div className='flex'>
        {[
          ...Array(review.rating).map((_, index) => (
            <Star key={index} className='w-5 h-5 fill-current text-amber-400' />
          )),
        ]}
      </div>
      <p className='text-sm text-left'>
        {review.description}
        "This is our third time using the Modest Explorer for our travels and we
        love it! No complaints, absolutely perfect!"
      </p>

      <div className='flex items-center gap-4 pt-4'>
        <div className='flex items-center '>
          <img
            src={review.image}
            alt='Image of avatar'
            className='block object-cover w-10 h-10 mx-auto border border-black rounded-full'
            width={10}
            height={10}
          />
        </div>
        <div className='flex flex-col items-start'>
          <p className='text-sm font-bold text-gray-900'>{review.name}</p>
          <p className='text-xs text-gray-600'>{review.position}</p>
        </div>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  review: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired, // Add this line
  }).isRequired,
  isMiddle: PropTypes.bool,
};
export default TestimonialCard;
