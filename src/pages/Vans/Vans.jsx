import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { getVans } from '../../api.js'
import VanCard from './VanCard.jsx'
import SearchBar from '../../component/SearchBar.jsx'
import SortSelect from '../../component/SortSelect.jsx'
// import DateRangePicker from "../../component/DateRangePicker.jsx";
import RentalDatePicker from '../../component/RentalDatePicker.jsx'

const Vans = () => {
  // get current time rounded to nearest half hour in HH:MM format
  const getCurrentTime = () => {
    const now = new Date()
    console.log('now', now)

    let hours = now.getHours()
    const minutes = now.getMinutes()
    const roundedMinutes = Math.round(minutes / 30) * 30 // round minutes to nearest 30

    // handle hour rollover
    if (roundedMinutes === 60) {
      hours = (hours + 1) % 24
      return `${hours.toString().padStart(2, '0')}:00`
    }

    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = roundedMinutes.toString().padStart(2, '0')
    return `${formattedHours}:${formattedMinutes}`
  }

  // get current date
  const today = new Date().toISOString().split('T')[0]
  // set initial pickup and return times
  const initialPickupTime = getCurrentTime()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const initialReturnDateFormatted = tomorrow.toISOString().split('T')[0]

  const [vans, setVans] = useState([]) // all vans state
  const [searchParams, setSearchParams] = useSearchParams() // URL search params
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sort, setSort] = useState('')
  const [pickupDate, setPickupDate] = useState(today)
  const [pickupTime, setPickupTime] = useState(initialPickupTime)
  const [returnDate, setReturnDate] = useState(initialReturnDateFormatted)
  const [returnTime, setReturnTime] = useState(initialPickupTime)

  const typeFilter = searchParams.get('type') // URL search type
  console.log(typeFilter)

  // sort all vans first
  const sortVans = [...vans].sort((a, b) => {
    if (sort === 'low-to-high') {
      return a.price - b.price
    } else if (sort === 'high-to-low') {
      return b.price - a.price
    }
    return 0
  })

  // Filtered vans array based on url search type
  const filteredVans = typeFilter
    ? sortVans.filter(van => {
        const matchesType = van.type === typeFilter
        const matchesSearch = van.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
        return matchesType && matchesSearch
      })
    : sortVans.filter(van =>
        van.name.toLowerCase().includes(searchQuery.toLowerCase())
      )

  useEffect(() => {
    async function loadVans () {
      setLoading(true)
      setError(null)
      try {
        const data = await getVans()
        setVans(data)
      } catch (error) {
        setError(error)
        setVans([])
      } finally {
        setLoading(false)
      }
    }
    loadVans()
  }, [])

  // color options
  const colorOptions = {
    simple: '#e17653',
    rugged: '#115E59',
    luxury: '#161616'
  }

  function handleFilterChange (key, value) {
    setSearchParams(prevParams => {
      if (value === null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }

      return prevParams
    })
  }

  function handleSearch (value) {
    console.log('Value received from SearchBar:', value)
    setSearchQuery(value)
  }

  function handleSort (value) {
    console.log('Value received from SortSelect:', value)
    setSort(value)
  }

  // if loading
  if (loading) {
    return (
      <div className='w-full px-4 sm:px-6 '>
        <div className='my-10 max-w-[1280px] mx-auto'>
          <h1 className='' aria-live='polite'>
            Loading vans...
          </h1>
        </div>
      </div>
    )
  }

  // if error occurs
  if (error) {
    return (
      <div className='w-full px-4 sm:px-6'>
        <div className='my-10 max-w-[1280px] mx-auto'>
          <div className='p-4 text-red-500 border border-red-500 rounded'>
            <h2 className='mb-2 text-xl font-bold' aria-live='assertive'>
              Error Details:
            </h2>
            <p aria-live='assertive'>Message: {error.message}</p>
            <p aria-live='assertive'>Status: {error.status}</p>
            <p aria-live='assertive'>Status Text: {error.statusText}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full px-8 py-24 bg-white border sm:px-6 '>
      <div className=' max-w-[1280px] mx-auto '>
        <h1 className='mb-3 text-xl font-bold md:text-4xl'>Explore Our Vans</h1>
        <p className='my-2 mb-6 text-xs'>
          Find the perfect van for your next adventure!
        </p>
        <div className='flex flex-col mb-6 '>
          {/* Container for all three components with responsive layouts */}
          <div className='flex flex-col justify-between w-full gap-3 lg:flex-row rounded-xl'>
            {/* Search Bar - Full width on all screens */}
            <div className='flex-1 w-full lg:max-w-[85%] '>
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className='w-full flex-1 lg:max-w-[10%] '>
              <SortSelect value={sort} onSort={handleSort} />
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-wrap items-center justify-between mb-4 xs:flex-row'>
          <div className='flex flex-wrap w-full gap-1 xs:w-auto'>
            {Object.keys(colorOptions).map(type => (
              <button
                key={type}
                className='no-underlines'
                onClick={() => handleFilterChange('type', type)}
              >
                <span
                  style={{
                    backgroundColor:
                      typeFilter === type ? colorOptions[type] : '#ffead0',
                    color: typeFilter === type ? 'white' : 'black'
                  }}
                  className={`inline-block px-2 py-2 capitalize max-w-[100px] text-center rounded mr-2 cursor-pointer text-xs`}
                >
                  {type}
                </span>
              </button>
            ))}
          </div>
          {typeFilter && (
            <button
              onClick={() => handleFilterChange('type', null)}
              className='flex w-full mt-4 ml-2 xs:ml-0 xs:w-auto xs:mt-0'
            >
              <span
                className={`inline-block  py-2 capitalize  w-full text-left  rounded text-black mr-2 cursor-pointer  underline text-xs
              }`}
              >
                Clear filter
              </span>
            </button>
          )}
        </div>
        <div className='grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {filteredVans.map(van => (
            // Van Card
            <VanCard
              key={van.id}
              van={van}
              colorOptions={colorOptions}
              searchParams={searchParams}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Vans
