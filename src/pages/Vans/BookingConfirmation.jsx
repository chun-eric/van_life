import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// replace with Stripe test

const BookingConfirmation = () => {
  const location = useLocation()
  const bookingData = location.state?.bookingData

  if (!bookingData) {
    return <Navigate to='/vans' replace={true} />
  }

  const options = {
    mode: 'payment',
    amount: Math.round(bookingData.totalPrice * 100),
    currency: 'usd'
  }

  return (
    <div className='max-w-4xl p-6 mx-auto'>
      <h1 className='mb-6 text-2xl font-bold'>Booking Confirmation</h1>

      {/* Booking Details */}
      <div className='p-6 mb-6 bg-white rounded-lg shadow'>
        <h2 className=''>Booking Details</h2>
        <div className='space-y-3'>
          <p>
            <span className='font-medium'>Van:</span>{' '}
            {bookingData.vanDetails.name}
          </p>
          <p>
            <span className='font-medium'>Pickup Date:</span>{' '}
            {bookingData.pickupDate}
          </p>
          <p>
            <span className='font-medium'>Pickup Time:</span>{' '}
            {bookingData.pickupTime}
          </p>
          <p>
            <span className='font-medium'>Drop-off Date:</span>{' '}
            {bookingData.dropoffDate}
          </p>
          <p>
            <span className='font-medium'>Drop-off Time:</span>{' '}
            {bookingData.dropoffTime}
          </p>
          <p>
            <span className='font-medium'>Total Days:</span>{' '}
            {bookingData.numDays}
          </p>
        </div>
      </div>

      {/* Price Summary */}
      <div className='p-6 mb-6 bg-white rounded-lg shadow'>
        <h2 className='mb-4 text-xl font-semibold'>Price Summary</h2>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span>Base Price:</span>
            <span>${bookingData.basePrice}</span>
          </div>
          <div className='flex justify-between'>
            <span>Tax (10%):</span>
            <span>${bookingData.taxAmount}</span>
          </div>
          <div className='flex justify-between pt-2 font-bold border-t'>
            <span>Total:</span>
            <span>${bookingData.totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Stripe Payment Form */}
      <div className='p-6 bg-white rounded-lg shadow'>
        <h2 className='mb-4 text-xl font-semibold'>Payment Details</h2>
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm bookingData={bookingData} />
        </Elements>
      </div>

      {/* Test Card Info */}
      <div className='p-4 mt-4 text-sm text-gray-600 rounded-lg bg-gray-50'>
        <p className='mb-2 font-medium'>Test Card Details:</p>
        <ul className='space-y-1'>
          <li>💳 Card Number: 4242 4242 4242 4242</li>
          <li>📅 Expiry: Any future date</li>
          <li>🔒 CVC: Any 3 digits</li>
          <li>📫 ZIP: Any 5 digits</li>
        </ul>
      </div>
    </div>
  )
}

export default BookingConfirmation
