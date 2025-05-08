import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

const PaymentForm = ({ bookingData }) => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // handle form submit function
  const handleSubmit = async event => {
    event.preventDefault()

    // exit if no stripe or no elements
    if (!stripe | !elements) {
      return
    }

    setIsProcessing(true)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking/success/${bookingData.id}`
        }
      })

      if (error) {
        setErrorMessage(error.message)
        setIsProcessing(false)
      }
    } catch (error) {
      console.error('Payment failed to go through: ', error)
      setErrorMessage('Payment failed. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <PaymentElement />
      {errorMessage && (
        <div className='text-sm text-red-500'>{errorMessage}</div>
      )}
      <button
        className={`w-full bg-[#FDBA74] hover:bg-black hover:text-white text-black font-bold py-3 px-6 rounded-lg transition-colors ${
          (!stripe || isProcessing) && 'opacity-50 cursor-not-allowed'
        }`}
        type='submit'
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  )
}

export default PaymentForm
