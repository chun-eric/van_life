import TestimonialCard from './TestimonialCard'
import { getTestimonials } from '../api'
import { useState, useEffect } from 'react'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTestimonials () {
      try {
        setLoading(true)
        const data = await getTestimonials()
        setTestimonials(data)
      } catch (err) {
        console.log('Error fetching testimonials:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, []) // Fixed: dependency array placement

  function isMiddle (index) {
    // how many cards per row based on screen size
    const cardsPerRow =
      window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1

    // if only 1 card no offset needed
    if (cardsPerRow === 1) {
      return false
    }

    // For 2 columns: offset every even index (1, 3, 5, etc.)
    if (cardsPerRow === 2) {
      return index % 2 === 1
    }

    // For 3 columns: offset middle card in each row (indices 1, 4, 7, etc.)
    const positionInRow = index % 3
    return positionInRow === 1
  }

  function getCardClassName (index) {
    const cardsPerRow =
      window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1

    const isMiddleColumn = cardsPerRow === 3 && index % 3 === 1

    return `${isMiddleColumn ? 'lg:mb-8' : ''}`
  }

  // Loading state
  if (loading)
    return (
      <div className='w-full py-20 text-center'>Loading testimonials...</div>
    )

  // Error state
  if (error)
    return (
      <div className='w-full py-20 text-center text-red-600'>
        Error loading testimonials: {error.message}
      </div>
    )

  // Empty state
  if (!testimonials || testimonials.length === 0) {
    console.log('No testimonials found')
    return (
      <div className='w-full py-20 text-center '>No testimonials found</div>
    )
  }

  return (
    <div className='w-full bg-white'>
      <div className='flex flex-col items-center justify-center py-16 mx-auto text-center bg-orange-100 rounded-xl pb-36 min-w-[320px]'>
        <div className='px-4 py-12 mx-auto md:pb-6 md:py-24 max-w-7xl sm:px-6 lg:px-8'>
          <h1 className='mb-4 text-4xl font-semibold text-slate-900'>
            Our customers{' '}
            <span className='italic font-bold underline'>Love</span> us!
          </h1>
          <p className='text-base text-slate-600'>Hear what they have to say</p>
        </div>

        {/* Testimonial Grid */}
        {testimonials.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 md:gap-y-1'>
            {testimonials.map((review, index) => (
              <TestimonialCard
                key={review.id || index}
                review={review}
                isMiddle={isMiddle(index)}
                className={getCardClassName(index)}
              />
            ))}
          </div>
        ) : (
          <p>No testimonials available at the moment.</p>
        )}
      </div>
    </div>
  )
}

export default Testimonials
