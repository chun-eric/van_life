import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { getVan } from '../../api'

const Booking = () => {
  const { id } = useParams() // get van id from url
  const navigate = useNavigate()
  const [vanDetails, setVanDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  // initialize react hook form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // Useeffect to fetch van details
  useEffect(() => {
    const fetchVanDetails = async () => {
      try {
        setLoading(true)
        const van = await getVan(id) // fetches a single van using the import function
        setVanDetails(van)
      } catch (error) {
        console.error('Error fetching van details: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVanDetails()
  }, [id])

  console.log('single van details:', vanDetails)

  if (loading) {
    return <p className=''>Loading Van...</p>
  }

  if (!vanDetails) {
    return <p className='bg-red-500'>Van not found</p>
  }

  // handle form Submission
  const onSubmit = data => {
    console.log('Form data: ', data)
  }

  const buttonBaseClasses =
    ' px-6 py-3 font-semibold text-black transition-all border border-black shadow-inner cursor-pointer hover:-translate-y-0.5 hover:shadow-md duration-300 ease-in-out'

  return (
    <div className='flex flex-col item-center justify-center max-w-5xl h-[60%] gap-6 p-6 mx-auto md:flex-row'>
      {/* Van Details Section */}
      <div className='h-full p-4 rounded-lg shadow bg-gray-50 md:w-1/2'>
        <div className='h-[50%]'>
          {/* Main Image */}
          <img
            src={vanDetails.imageUrl[selectedImage]}
            alt=''
            className='w-full h-full mb-4 rounded shadow-sm'
          />
          {/* Thumbnail Images */}
          <div className='flex gap-1 mt-1'>
            {vanDetails.imageUrl?.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-24 h-24 overflow-hidden rounded ${
                  selectedImage === index ? 'ring-2 ring-[#FF8C38]' : ''
                }`}
              >
                <img
                  src={img}
                  alt={`Van thumbnail ${index + 1}`}
                  className='object-cover w-full h-full'
                />
              </button>
            ))}
          </div>
        </div>
        <div className='flex flex-col w-full gap-3 h-[50%]'>
          <h3 className='mt-3 text-2xl font-bold'>{vanDetails.name}</h3>
          <p className='mb-4 text-sm leading-relaxed text-slate-600'>
            {vanDetails.description}
          </p>
          <p className='text-lg font-bold'>${vanDetails.price} a day</p>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className='p-6 bg-white border border-black rounded-lg shadow md:w-1/2'>
        <h1 className='mb-4 text-xl font-bold'>Booking Request</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Pick up date */}
          <div className=''>
            <label className='block mb-2 text-sm text-gray-700'>
              Pickup Date
            </label>
            <input
              type='date'
              {...register('pickupDate', {
                required: 'Pickup date is required'
              })}
              className='w-full px-3 py-2 text-sm text-gray-700 border rounded outline-none'
            />
            {errors.pickupDate && (
              <p className='text-sm text-red-500'>
                {errors.pickupDate.message}
              </p>
            )}
          </div>

          {/* Pick up date */}
          <div className=''>
            <label className='block mb-2 text-sm text-gray-700'>
              Pickup Time
            </label>
            <input
              type='time'
              {...register('pickupTime', {
                required: 'Pickup time is required'
              })}
              className='w-full px-3 py-2 text-sm text-gray-700 border rounded'
            />
            {errors.pickupTime && (
              <p className='text-sm text-red-500'>
                {errors.pickupTime.message}
              </p>
            )}
          </div>

          {/* Drop-off Date */}
          <div className=''>
            <label className='block mb-2 text-sm text-gray-700'>
              Drop-off Date
            </label>
            <input
              type='date'
              className='w-full px-3 py-2 text-sm text-gray-700 border rounded'
              {...register('dropoffdate', {
                required: 'Drop-off date is required'
              })}
            />
            {errors.dropoffDate && (
              <p className='text-sm text-red-500'>
                {errors.dropoffDate.message}
              </p>
            )}
          </div>

          {/* Drop-off Time */}
          <div className=''>
            <label className='block mb-2 text-sm text-gray-700'>
              Drop-off Time
            </label>
            <input
              type='time'
              className='w-full px-3 py-2 text-sm text-gray-700 border rounded'
              {...register('dropofftime', {
                required: 'Drop-off time is required'
              })}
            />
            {errors.dropoffTime && (
              <p className='text-sm text-red-500'>
                {errors.dropoffTime.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className={`${buttonBaseClasses} bg-[#FDBA74] hover:bg-orange-50 font-bold `}
          >
            Booking Confirmation
          </button>
        </form>
      </div>
    </div>
  )
}

export default Booking
