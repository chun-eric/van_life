import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

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
    <div className='p-6 mx-auto my-6 max-w-7xl'>
      <h1 className='px-6 mb-6 text-2xl font-bold'>Booking Confirmation</h1>

      {/* Responsive Container */}
      <div className='flex flex-col gap-6 md:flex-row'>
        {/* Left column - Booking details and price summary */}
        <div className='flex-col space-y-2 bg-gray-10 md:w-1/2'>
          {/* Booking Details */}
          <div className='p-6 '>
            <h2 className='px-3 mb-4 text-xl font-semibold '>Rental Details</h2>
            <div className='grid w-full gap-6 rounded-lg bg-gray-50 xl:grid-cols-2'>
              <div className='flex flex-col justify-center p-6 space-y-3'>
                <p className='font-bold '>
                  <span className='text-base font-normal text-gray-700'>
                    Van:
                  </span>{' '}
                  {bookingData.vanDetails.name}
                </p>
                <p className='font-bold '>
                  <span className='text-base font-normal text-gray-700'>
                    Pickup Date:
                  </span>{' '}
                  {bookingData.pickupDate}
                </p>
                <p className='font-bold '>
                  <span className='text-base font-normal text-gray-700'>
                    Pickup Time:
                  </span>{' '}
                  {bookingData.pickupTime} pm
                </p>
                <p className='font-bold '>
                  <span className='text-base font-normal text-gray-700'>
                    Drop-off Date:
                  </span>{' '}
                  {bookingData.dropoffDate}
                </p>
                <p className='font-bold text-md'>
                  <span className='text-base font-normal text-gray-700'>
                    Drop-off Time:
                  </span>{' '}
                  {bookingData.dropoffTime} am
                </p>
                <p className='font-bold '>
                  <span className='text-base font-normal text-gray-700'>
                    Total Days:
                  </span>{' '}
                  {bookingData.numDays}
                </p>
              </div>
              <div className='flex items-center justify-center'>
                {bookingData.vanDetails.imageUrl && (
                  <img
                    className='object-contain w-full h-full rounded'
                    src={bookingData.vanDetails.imageUrl[0]}
                    alt={`${bookingData.vanDetails.name} van`}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className='p-6 mb-6 '>
            <div className='p-6 rounded-lg bg-[#FFEFD5]'>
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
                <div className='flex justify-between pt-2 font-bold border-t border-black'>
                  <span>Total:</span>
                  <span>${bookingData.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className='w-full md:w-1/2'>
          {/* Stripe Payment Form */}
          <div className='p-6 bg-white '>
            <h2 className='mb-4 text-xl font-semibold'>Payment Details</h2>
            <Elements stripe={stripePromise} options={options}>
              <PaymentForm bookingData={bookingData} />
            </Elements>
          </div>

          {/* Test Card Info */}
          <div className='p-6 '>
            <div className='p-6 text-sm text-gray-600 rounded bg-gray-50'>
              <p className='mb-2 font-medium'>Test Card Details:</p>
              <ul className='space-y-1'>
                <li>💳 Card Number: 4242 4242 4242 4242</li>
                <li>📅 Expiry: Any future date</li>
                <li>🔒 CVC: Any 3 digits</li>
                <li>📫 ZIP: Any 5 digits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation
