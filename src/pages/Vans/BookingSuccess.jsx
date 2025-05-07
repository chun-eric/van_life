import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { updateBookingStatus, getBooking } from '../../api'

const BookingSuccess = () => {
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)
  const [isUpdating, setIsUpdating] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // update booking status in Firebase
    const confirmBooking = async () => {
      try {
        // First get the booking details
        const bookingDetails = await getBooking(bookingId)
        setBooking(bookingDetails) // stores all the booking data here

        // Then update its status to confirmed
        await updateBookingStatus(bookingId, 'confirmed')
        setIsUpdating(false)
      } catch (error) {
        console.error('Error updating booking status:', error)
        setError('Failed to update booking status')
        setIsUpdating(false)
      }
    }

    if (bookingId) {
      confirmBooking()
    }
  }, [bookingId])

  if (isUpdating) {
    return (
      <div className='max-w-4xl p-6 mx-auto text-center'>
        <div className='p-8 bg-white rounded-lg shadow'>
          <p>Confirming your booking...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='max-w-4xl p-6 mx-auto text-center'>
        <div className='p-8 bg-white rounded-lg shadow'>
          <h1 className='mb-4 text-3xl font-bold text-red-600'>❌ Error</h1>
          <p className='mb-6 text-gray-600'>{error}</p>
          <Link
            to='/vans'
            className='inline-block bg-[#FDBA74] hover:bg-orange-50 text-black font-bold py-3 px-6 rounded-lg transition-colors'
          >
            Return to Vans
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-4xl p-6 mx-auto text-center'>
      <div className='p-8 bg-white rounded-lg shadow'>
        <h1 className='mb-4 text-3xl font-bold text-slate-600'>
          🎉 Booking Confirmed!
        </h1>
        <p className='mb-6 text-gray-600'>
          Thank you for your booking. You will receive a confirmation email
          shortly.
        </p>
        <Link
          to='/dashboard'
          className='inline-block bg-[#FDBA74] hover:bg-orange-50 text-black font-bold py-3 px-6 rounded-lg transition-colors'
        >
          View My Bookings
        </Link>
      </div>
    </div>
  )
}

export default BookingSuccess
