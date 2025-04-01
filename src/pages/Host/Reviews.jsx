// import { reviewsData } from "../../data";
import { getUserReviews } from '../../api'
import { BsStarFill } from 'react-icons/bs'
import { useState, useEffect } from 'react'

const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchReviews () {
      try {
        setLoading(true)
        const data = await getUserReviews()
        setReviews(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  // calculate average reviews
  const averageRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(1)

  // calculate rating distribution
  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  }

  reviews.forEach(review => {
    ratingCounts[review.rating] += 1
  })

  // total reviews
  const totalReviews = reviews.length

  // rating percentages
  // Object.entries turns an object into an array or array
  const ratingPercentages = Object.entries(ratingCounts).reduce(
    (acc, [rating, count]) => {
      acc[rating] = Math.round((count / totalReviews) * 100).toFixed(0)
      return acc
    },
    {}
  )

  // function to render stars
  function renderStars (rating) {
    return [...Array(5)].map((_, index) => (
      <BsStarFill
        key={index}
        color='#ff8c38'
        size={16}
        className={index < rating ? '' : 'opacity-30'}
      />
    ))
  }

  if (loading) return <div className='py-10 mt-6'>Loading reviews...</div>

  if (error)
    return (
      <div className='py-10 mt-6 text-red-600'>
        Error loading reviews: {error.message}
      </div>
    )

  return (
    <div className='flex flex-col px-0 py-10 mt-6 rounded-lg xs:px-2 '>
      <div className='flex items-center gap-4 mb-6 align-center'>
        <h2 className='text-2xl font-bold'>Your reviews</h2>
        <p className='mt-2 text-sm'>
          Last <span className='font-normal underline '>30 days</span>
        </p>
      </div>

      {/* Overall Rating */}
      <div className='flex items-center mt-4'>
        <div className='flex flex-row items-center gap-2'>
          <span className='text-2xl font-bold'>{averageRating}</span>
          <BsStarFill className='' color='#ff8c38' size={20} />
          <p className='text-base text-black '>overall rating</p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className=''>
        {Object.entries(ratingPercentages)
          .reverse()
          .map(([rating, percentage]) => (
            <div
              className='flex items-center gap-2 mt-5 text-gray-800'
              key={rating}
            >
              <span className='flex w-14 sm:w-20'>
                {rating} {rating === '1' ? 'star' : 'stars'}
              </span>
              <div className='flex-1 h-3 bg-[#b9b9b9] rounded sm:mr-3'>
                <div
                  className='h-full bg-orange-400 rounded'
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className='text-center sm:w-20 w-14'>{percentage}%</span>
            </div>
          ))}
      </div>

      {/* Individual Reviews */}
      <div className='mt-10'>
        <h3 className='text-lg font-bold text-black'>
          Reviews ({totalReviews})
        </h3>
        <div className='mt-6 space-y-8'>
          {reviews.map(review => (
            <div key={review.id} className='pb-6 border-b'>
              {/* Stars*/}
              <div className='flex gap-1 mb-2'>
                {renderStars(review.rating)}
              </div>

              {/* Name and Date */}
              <div className='flex items-center gap-2 mb-3 text-gray-700 align-center'>
                <span className='text-black'>{review.name}</span>
                <span className='text-gray-500'>{review.date}</span>
              </div>
              <p className='leading-relaxed text-black '>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews
