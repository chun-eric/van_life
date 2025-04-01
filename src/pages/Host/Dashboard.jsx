import { Link } from 'react-router-dom'
import { BsStarFill } from 'react-icons/bs'
import { useState, useEffect, useContext } from 'react'
import { getHostVans, getUserReviews, getUserTransactions } from '../../api'
import { AuthContext } from '../../context/AuthContext'

const Dashboard = () => {
  // State for data fetched from Firebase
  const [vans, setVans] = useState([])
  const [reviews, setReviews] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useContext(AuthContext)

  console.log('Current user:', user)

  // Fetch all data on component mount
  useEffect(() => {
    async function fetchData () {
      try {
        setLoading(true)

        // Fetch data in parallel for better performance
        const [vansData, reviewsData, transactionsData] = await Promise.all([
          getHostVans(),
          getUserReviews(),
          getUserTransactions()
        ])

        console.log('Successfully fetched vans:', vansData)
        console.log('Successfully fetched reviews:', reviewsData)
        console.log('Successfully fetched transactions:', transactionsData)

        setVans(vansData)
        setReviews(reviewsData)
        setTransactions(transactionsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Calculate review stats if reviews exist
  const reviewCount = reviews.length

  const averageRating =
    reviewCount > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount
        ).toFixed(1)
      : '0.0'

  // Calculate income for last 30 days
  const calculateLast30DaysIncome = () => {
    if (transactions.length === 0) return 0

    const now = new Date()
    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(now.getDate() - 30)

    const filteredTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      return transactionDate >= thirtyDaysAgo
    })

    return filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    )
  }

  const last30DaysIncome = calculateLast30DaysIncome()

  const formatted = last30DaysIncome.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  // Render vans data
  function renderVans (vans) {
    if (!vans || vans.length === 0) {
      return <p className='text-gray-500'>No vans listed yet.</p>
    }

    const vansElements = vans.map(van => (
      <div key={van.id} className='relative flex flex-col gap-4'>
        <div className='flex flex-row items-center justify-between gap-3 pr-2 border border-black rounded-lg xs:gap-6'>
          <div className='flex items-center justify-between gap-3 xs:gap-6 '>
            <img
              className='object-cover rounded-lg cursor-pointer h-28 w-28'
              src={
                van.imageUrl && Array.isArray(van.imageUrl)
                  ? van.imageUrl[0]
                  : van.imageUrl
              }
              alt={`This is a ${van.type || ''} ${van.name || ''} van`}
              onError={e => {
                console.error('Image failed to load:', e)
                e.target.src = 'https://via.placeholder.com/112?text=No+Image'
              }}
            />
            <div className='flex flex-col '>
              <p className='mb-2 text-base font-bold xs:text-xl'>{van.name}</p>
              <p className='text-md xs:text-xl'>
                <span className=''>${van.price}/day</span>
              </p>
            </div>
          </div>
          <Link
            to={`vans/${van.id}`}
            className='hidden mr-4 text-xs cursor-pointer hover:underline xs:block'
          >
            View
          </Link>
        </div>
      </div>
    ))

    return (
      <div className=''>
        <section className='flex flex-col gap-4'>{vansElements}</section>
      </div>
    )
  }

  // Render error message
  if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <div className='py-10 mt-2 rounded-lg '>
      <div className='p-5 text-left text-white bg-teal-700 rounded-lg '>
        <section className='flex flex-col gap-4 '>
          <div className='flex flex-col gap-2'>
            <h1 className='pt-3 text-xl font-bold xs:text-2xl'>
              Welcome {user?.name || 'back'}!
            </h1>
            <div className='flex flex-row items-center justify-between '>
              <p className='text-xs xs:text-sm'>
                Your income in the past{' '}
                <span className='underline cursor-pointer'>30 days</span>
              </p>
              <Link
                to='income'
                className='hidden pr-3 text-xs cursor-pointer hover:underline xs:block'
              >
                Details
              </Link>
            </div>
            <h2 className='mt-6 text-2xl font-bold xs:text-2xl'>{formatted}</h2>
          </div>
        </section>
        <section className='flex flex-row items-center justify-between my-8'>
          <div className='flex flex-col gap-4 xs:flex-row'>
            <h2 className='font-semibold'>Review score</h2>
            <div className='flex flex-row items-center gap-1 '>
              <BsStarFill className='' color='#ff8c38' />
              <p className='ml-1'>
                <span className='font-bold'>{averageRating}</span>/5
              </p>
              <p className='ml-2'>
                <span className='text-sm underline cursor-pointer'>
                  {reviewCount} reviews
                </span>
              </p>
            </div>
          </div>
          <Link
            to='/host/reviews'
            className='hidden pr-3 text-xs cursor-pointer hover:underline xs:block'
          >
            Details
          </Link>
        </section>
      </div>
      <section className='flex flex-col gap-2 my-10 '>
        <div className='flex flex-col gap-5 mb-1 xs:mb-3 xs:items-center xs:flex-row items-left'>
          <h2 className='text-2xl font-bold '>Your listed vans</h2>
          <Link
            to='vans'
            className='mt-1 text-xs cursor-pointer hover:underline'
          >
            View all
          </Link>
        </div>
        <div className='rounded-lg'>
          {loading ? <h1 className=''>Loading...</h1> : renderVans(vans)}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
