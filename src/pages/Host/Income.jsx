import { Link } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'
import { useState, useEffect } from 'react'
import { getUserTransactions, getUserMonthlyData } from '../../api'

const Income = () => {
  const [transactions, setTransactions] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState(30)
  const [displayedTransactions, setDisplayedTransactions] = useState([])
  const [displayedTotal, setDisplayedTotal] = useState(0)

  // Fetch data from Firebase
  useEffect(() => {
    async function fetchData () {
      try {
        setLoading(true)
        // Fetch both transactions and monthly data in parallel
        const [transactionsData, monthlyDataResult] = await Promise.all([
          getUserTransactions(),
          getUserMonthlyData()
        ])

        setTransactions(transactionsData)
        setMonthlyData(monthlyDataResult)

        // Only calculate displayed data if we have transactions
        if (transactionsData && transactionsData.length > 0) {
          // Calculate using the transactionsData directly
          const initialPeriodData = calculateIncomeForPeriod(
            30,
            transactionsData
          )
          setDisplayedTransactions(initialPeriodData.transactions)
          setDisplayedTotal(initialPeriodData.total)
        } else {
          setDisplayedTransactions([])
          setDisplayedTotal(0)
        }
      } catch (err) {
        console.error('Error fetching income data:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Helper function to calculate date range based on actual transaction data
  const calculateDateRange = (days, transactionsArray) => {
    // If no transactions, return null values to indicate no valid date range
    if (!transactionsArray || transactionsArray.length === 0) {
      return { currentDate: null, pastDate: null }
    }

    // Sort transactions by date to find the most recent one
    const sortedTransactions = [...transactionsArray].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )

    const currentDate = new Date(sortedTransactions[0].date)
    const pastDate = new Date(currentDate)
    pastDate.setDate(currentDate.getDate() - days)
    return { currentDate, pastDate }
  }

  // Helper function to filter and sum transactions for a specific period
  const calculateIncomeForPeriod = (days, transactionsArray = transactions) => {
    // Get date range from actual transaction data
    const { currentDate, pastDate } = calculateDateRange(
      days,
      transactionsArray
    )

    // If no valid date range (no transactions), return empty result
    if (!currentDate || !pastDate) {
      return { total: 0, transactions: [] }
    }

    const filteredTransactions = transactionsArray.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      return transactionDate >= pastDate && transactionDate <= currentDate
    })

    return {
      total: filteredTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      ),
      transactions: filteredTransactions
    }
  }

  // Format date for display
  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit'
    })
  }

  // Handle period change and update displayed data
  const handlePeriodChange = days => {
    const periodData = calculateIncomeForPeriod(days, transactions)
    setSelectedPeriod(days)
    setDisplayedTransactions(periodData.transactions)
    setDisplayedTotal(periodData.total)
  }

  // Calculate income for different periods for the summary section
  // Using memoization to avoid unnecessary recalculations
  const getCalculatedPeriods = () => {
    return {
      last30Days: calculateIncomeForPeriod(30, transactions),
      last60Days: calculateIncomeForPeriod(60, transactions),
      last90Days: calculateIncomeForPeriod(90, transactions),
      last180Days: calculateIncomeForPeriod(180, transactions),
      last365days: calculateIncomeForPeriod(365, transactions)
    }
  }

  // Loading state
  if (loading)
    return (
      <div className='px-6 py-10 mt-6 mb-10 rounded-lg bg-gray-50'>
        <div className='flex items-center justify-center'>
          <div className='w-6 h-6 border-2 border-t-2 border-gray-500 rounded-full border-t-teal-500 animate-spin'></div>
          <span className='ml-2'>Loading income data...</span>
        </div>
      </div>
    )

  // Error state
  if (error)
    return (
      <div className='px-6 py-10 mt-6 mb-10 text-red-600 rounded-lg bg-gray-50'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6 mr-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          Error loading income data: {error.message}
        </div>
      </div>
    )

  const calculatedPeriods = getCalculatedPeriods()

  return (
    <div className='px-6 py-10 mt-6 mb-10 rounded-lg bg-gray-50'>
      <section className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>Host Income</h1>
          <div className='flex flex-row items-center justify-between'>
            <p className='text-sm'>
              Last{' '}
              <span className='text-gray-700 underline cursor-pointer'>
                {selectedPeriod} days
              </span>
            </p>
          </div>
          <h2 className='mt-6 text-3xl font-bold'>
            ${displayedTotal.toLocaleString()}
          </h2>
          <div className='flex flex-col mt-4 xs:flex-row'>
            <button
              className={`px-3 py-2 text-xs ${
                selectedPeriod === 30
                  ? 'bg-[#f7924a] text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => handlePeriodChange(30)}
            >
              30 days
            </button>
            <button
              className={`px-3 py-2 text-xs ${
                selectedPeriod === 60
                  ? 'bg-[#f7924a] text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => handlePeriodChange(60)}
            >
              60 days
            </button>
            <button
              className={`px-3 py-2 text-xs ${
                selectedPeriod === 90
                  ? 'bg-[#f7924a] text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => handlePeriodChange(90)}
            >
              90 days
            </button>
            <button
              className={`px-3 py-2 text-xs ${
                selectedPeriod === 180
                  ? 'bg-[#f7924a] text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => handlePeriodChange(180)}
            >
              180 days
            </button>
            <button
              className={`px-3 py-2 text-xs ${
                selectedPeriod === 365
                  ? 'bg-[#f7924a] text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => handlePeriodChange(365)}
            >
              12 months
            </button>
          </div>
        </div>
      </section>

      <section className='mt-10'>
        <div className='flex h-48 mb-6'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={monthlyData}
              margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
            >
              <CartesianGrid
                horizontal={true}
                vertical={false}
                strokeDasharray='3 3'
                stroke='#E5E7EB'
              />
              <XAxis
                dataKey='month'
                axisLine={false}
                tickLine={false}
                fontSize={12}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize={12}
                tickFormatter={value => `$${value / 1000}k`}
                ticks={[0, 1000, 2000, 3000, 4000, 5000]}
                domain={[0, 5000]}
                dx={-10}
                interval={0}
              />
              <Bar dataKey='amount' fill='#23b0a7' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className='flex flex-col gap-2 my-10'>
        <div className='flex flex-row items-center gap-5 mb-3'>
          <p className='text-xl font-semibold'>
            Your Transactions <span>({displayedTransactions.length})</span>
          </p>
          <span className='-mb-1 text-xs'>Last {selectedPeriod} days</span>
        </div>
        <div className='flex flex-col gap-2 rounded-lg'>
          {displayedTransactions.length > 0 ? (
            displayedTransactions.map(transaction => (
              <div
                className='flex flex-row items-center justify-between gap-4 px-3 py-4 border rounded shadow-sm border-slate-300 hover:bg-white hover:shadow-md hover:transition-all hover:ease-in-out hover:duration-200'
                key={transaction.id}
              >
                <span
                  className={`font-bold ${
                    transaction.amount > 0 ? 'text-green-700' : 'text-red-600'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : '-'}$
                  {Math.abs(transaction.amount).toLocaleString()}{' '}
                  <span className='text-sm'>
                    {transaction.amount > 0 ? 'Deposited' : 'Withdrawn'}
                  </span>
                </span>
                <span>{formatDate(transaction.date)}</span>
              </div>
            ))
          ) : (
            <p className='py-4 text-gray-500'>
              No transactions found for this period.
            </p>
          )}
        </div>
      </section>
      <section>
        <div className='p-4 mt-6 bg-gray-100 border border-gray-200 rounded-lg'>
          <h3 className='mb-3 font-bold'>Income Summary</h3>
          <div className='space-y-2'>
            <p>
              Last 30 days:{' '}
              <span className='font-bold'>
                ${calculatedPeriods.last30Days.total.toLocaleString()}
              </span>
            </p>
            <p>
              Last 60 days:{' '}
              <span className='font-bold'>
                ${calculatedPeriods.last60Days.total.toLocaleString()}
              </span>
            </p>
            <p>
              Last 90 days:{' '}
              <span className='font-bold'>
                ${calculatedPeriods.last90Days.total.toLocaleString()}
              </span>
            </p>
            <p>
              Last 180 days:{' '}
              <span className='font-bold'>
                ${calculatedPeriods.last180Days.total.toLocaleString()}
              </span>
            </p>
            <p>
              Last year:{' '}
              <span className='font-bold'>
                ${calculatedPeriods.last365days.total.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Income
