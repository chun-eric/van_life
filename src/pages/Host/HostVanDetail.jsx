import { useState, useEffect } from 'react'
import { getHostVans } from '../../api'
import { NavLink, useParams, Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth' // Import the auth context

const HostVanDetail = () => {
  const [van, setVan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth() // Get the authenticated user

  useEffect(() => {
    // First check if user is authenticated
    if (!user) {
      navigate('/login', {
        replace: true,
        state: {
          message: 'You must be logged in to view your vans',
          from: `/host/vans/${id}`
        }
      })
      return
    }

    async function loadVans () {
      setLoading(true)
      try {
        const data = await getHostVans()

        // Find the specific van by ID
        const currentVan = data.find(van => van.id === id)

        if (!currentVan) {
          throw {
            message: 'Van not found',
            status: 404,
            statusText: 'Not Found'
          }
        }

        setVan(currentVan)
      } catch (error) {
        console.error('Error fetching van details:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    loadVans()
  }, [id, user, navigate])

  // color options
  const colorOptions = {
    simple: '#e17653',
    rugged: '#115E59',
    luxury: '#161616'
  }

  // handle image change
  const handleImageChange = index => {
    setCurrentImageIndex(index)
  }

  // Loading state
  if (loading) {
    return (
      <div className='w-full px-4 mt-10 sm:px-6'>
        <div className='my-10 max-w-[1280px] mx-auto'>
          <div className='flex items-center'>
            <div className='w-5 h-5 mr-3 border-t-2 border-b-2 border-gray-800 rounded-full animate-spin'></div>
            <h1 className='' aria-live='polite'>
              Loading van details...
            </h1>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className='w-full px-4 sm:px-6'>
        <div className='my-10 max-w-[1280px] mx-auto'>
          <div className='p-4 text-red-500 border border-red-500 rounded'>
            <h2 className='mb-2 text-xl font-bold' aria-live='assertive'>
              Error Details:
            </h2>
            <p aria-live='assertive'>Message: {error.message}</p>
            {error.status && (
              <p aria-live='assertive'>Status: {error.status}</p>
            )}
            {error.statusText && (
              <p aria-live='assertive'>Status Text: {error.statusText}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Return early if no van data
  if (!van) {
    return (
      <div className='w-full px-4 mt-10 sm:px-6'>
        <div className='my-10 max-w-[1280px] mx-auto'>
          <h1 className='text-red-500' aria-live='polite'>
            Van not found
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className='mb-36'>
      <section className='w-full mt-4'>
        <Link
          to='..'
          relative='path'
          className='block mt-16 mb-4 text-black no-underline'
        >
          &larr;{' '}
          <span className='text-xs capitalize hover:underline'>
            back to all vans
          </span>
        </Link>

        <div className='flex flex-col w-full gap-4 border border-black rounded-lg sm:flex-row bg-gray-50'>
          <div className='sm:w-[50%] h-auto w-full'>
            {van.imageUrl && van.imageUrl.length > 0 ? (
              <img
                className='object-cover w-full h-auto rounded-lg shadow-sm sm:h-full sm:w-full'
                src={van.imageUrl[currentImageIndex]}
                alt={`This is a ${van.type} ${van.name} van`}
                onError={e => {
                  e.target.src =
                    'https://via.placeholder.com/400x300?text=Image+Not+Available'
                }}
              />
            ) : (
              <div className='flex items-center justify-center w-full h-64 bg-gray-200 rounded-lg'>
                <p>No image available</p>
              </div>
            )}
          </div>
          <div className='flex flex-col items-center w-full gap-6 rounded-lg xmt-4 xs:w-[50%] py-3 pt-7'>
            <div className='flex flex-col w-full px-6 align-bottom item-center'>
              <div className=''>
                <div className='mb-6'>
                  <span
                    style={{
                      backgroundColor: colorOptions[van.type] || '#000000'
                    }}
                    className='inline-block text-xs px-4 py-2 capitalize bg-black max-w-[100px] text-center text-white rounded-lg transition-all duration-200'
                  >
                    {van.type}
                  </span>
                </div>
                <div className='flex items-center justify-between xs:items-start xs:flex-col xs:gap-2'>
                  <p className='mb-1 text-xl font-bold'>{van.name}</p>
                  <p className='text-lg font-bold'>
                    ${van.price}
                    <span className='text-base font-normal'>/day</span>
                  </p>
                </div>
              </div>

              <nav className='flex flex-wrap gap-10 mt-6 text-sm'>
                <NavLink
                  to='.'
                  end
                  className={({ isActive }) =>
                    isActive
                      ? 'font-bold text-gray-800 underline hover:text-gray-600'
                      : 'font-semibold text-gray-800 hover:text-gray-600 hover:underline'
                  }
                >
                  Details
                </NavLink>
                <NavLink
                  to='pricing'
                  className={({ isActive }) =>
                    isActive
                      ? 'font-bold text-gray-800 underline hover:text-gray-600'
                      : 'font-semibold text-gray-800 hover:text-gray-600 hover:underline'
                  }
                >
                  Pricing
                </NavLink>
                <NavLink
                  to='photos'
                  className={({ isActive }) =>
                    isActive
                      ? 'font-bold text-gray-800 underline hover:text-gray-600'
                      : 'font-semibold text-gray-800 hover:text-gray-600 hover:underline'
                  }
                >
                  Photos
                </NavLink>
              </nav>
              <Outlet
                context={{
                  van,
                  onImageChange: handleImageChange,
                  currentImageIndex
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HostVanDetail
