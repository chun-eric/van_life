import { reviewsData } from "../../data";
import { BsStarFill } from "react-icons/bs";

const Reviews = () => {
  // calculate average reviews
  const averageRating = (
    reviewsData.reduce((acc, review) => acc + review.rating, 0) /
    reviewsData.length
  ).toFixed(1);

  console.log(averageRating);

  // calculate rating distribution
  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviewsData.forEach((review) => {
    ratingCounts[review.rating] += 1;
  });

  // total reviews
  const totalReviews = reviewsData.length;

  // rating percentages
  // Object.entries turns an object into an array or array
  const ratingPercentages = Object.entries(ratingCounts).reduce(
    (acc, [rating, count]) => {
      acc[rating] = Math.round((count / totalReviews) * 100).toFixed(0);
      return acc;
    },
    {}
  );

  // function to render stars
  function renderStars(rating) {
    return [...Array(5)].map((_, index) => (
      <BsStarFill
        key={index}
        color='#ff8c38'
        size={16}
        className={index < rating ? "" : "opacity-30"}
      />
    ));
  }

  return (
    <div className='px-4 py-10 mt-6  rounded-lg flex flex-col '>
      <div className='flex gap-4 align-center items-center mb-6'>
        <h2 className='font-bold text-2xl'>Your reviews</h2>
        <p className='text-sm mt-2'>
          Last <span className='underline font-normal '>30 days</span>
        </p>
      </div>

      {/* Overall Rating */}
      <div className='flex items-center mt-4'>
        <div className='flex gap-2  flex-row items-center'>
          <span className='text-2xl font-bold'>{averageRating}</span>
          <BsStarFill className='' color='#ff8c38' size={20} />
          <p className='text-black text-base '>overall rating</p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className=''>
        {Object.entries(ratingPercentages)
          .reverse()
          .map(([rating, percentage]) => (
            <div
              className='flex items-center gap-2  text-gray-800 mt-5'
              key={rating}
            >
              <span className='w-14 sm:w-20 flex'>
                {rating} {rating === "1" ? "star" : "stars"}
              </span>
              <div className='flex-1 h-3 bg-[#b9b9b9] rounded sm:mr-3'>
                <div
                  className='h-full bg-orange-400 rounded'
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className='sm:w-20 w-14 text-center'>{percentage}%</span>
            </div>
          ))}
      </div>

      {/* Individual Reviews */}
      <div className='mt-10'>
        <h3 className='font-bold text-black text-lg'>
          Reviews ({totalReviews})
        </h3>
        <div className='space-y-8 mt-6'>
          {reviewsData.map((review) => (
            <div key={review.id} className='border-b pb-6'>
              {/* Stars*/}
              <div className='flex gap-1 mb-2'>
                {renderStars(review.rating)}
              </div>

              {/* Name and Date */}
              <div className='flex gap-2 text-gray-700 mb-3 items-center align-center'>
                <span className='text-black'>{review.name}</span>
                <span className='text-gray-500'>{review.date}</span>
              </div>
              <p className='text-black leading-relaxed '>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
