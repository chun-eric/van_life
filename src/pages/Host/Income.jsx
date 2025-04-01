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

        // Initialize with the last 30 days data
        const initialPeriodData = calculateIncomeForPeriod(30, transactionsData)
        setDisplayedTransactions(initialPeriodData.transactions)
        setDisplayedTotal(initialPeriodData.total)
      } catch (err) {
        console.error('Error fetching income data:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // helper function to calculate date range
  const calculateDateRange = days => {
    if (!transactions || transactions.length === 0) {
      return { currentDate: new Date(), pastDate: new Date() }
    }

    // Sort transactions by date to find the most recent one
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )

    const currentDate = new Date(sortedTransactions[0].date)
    const pastDate = new Date(currentDate)
    pastDate.setDate(currentDate.getDate() - days)
    return { currentDate, pastDate }
  }

  // helper function to filter and sum transactions
  const calculateIncomeForPeriod = (days, transactionsArray = transactions) => {
    // object destructuring
    const { currentDate, pastDate } = calculateDateRange(days)

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

  // format date for display
  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit'
    })
  }

  // state for selected time period
  const [selectedPeriod, setSelectedPeriod] = useState(30)
  const [displayedTransactions, setDisplayedTransactions] = useState([])
  const [displayedTotal, setDisplayedTotal] = useState(0)

  // handle updated displayed data when period changes
  const handlePeriodChange = days => {
    const periodData = calculateIncomeForPeriod(days)
    console.log(periodData)
    setSelectedPeriod(days)
    setDisplayedTransactions(periodData.transactions)
    setDisplayedTotal(periodData.total)
  }

  // Calculate income for different periods for the summary section
  const calculatedPeriods = {
    last30Days: calculateIncomeForPeriod(30),
    last60Days: calculateIncomeForPeriod(60),
    last90Days: calculateIncomeForPeriod(90),
    last180Days: calculateIncomeForPeriod(180),
    last365days: calculateIncomeForPeriod(365)
  }

  if (loading)
    return (
      <div className='px-6 py-10 mt-6 mb-10 rounded-lg bg-gray-50'>
        Loading income data...
      </div>
    )
  if (error)
    return (
      <div className='px-6 py-10 mt-6 mb-10 text-red-600 rounded-lg bg-gray-50'>
        Error loading income data: {error.message}
      </div>
    )

  return (
    <div className='px-6 py-10 mt-6 mb-10 rounded-lg bg-gray-50'>
      <section className='flex flex-col gap-4 '>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>Host Income</h1>
          <div className='flex flex-row items-center justify-between '>
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
              className={`px-3 py-2  text-xs ${
                selectedPeriod === 30
                  ? 'bg-[#f7924a] text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => handlePeriodChange(30)}
            >
              30 days
            </button>
            <button
              className={`px-3 py-2  text-xs ${
                selectedPeriod === 60
                  ? 'bg-[#f7924a]  text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => handlePeriodChange(60)}
            >
              60 days
            </button>
            <button
              className={`px-3 py-2  text-xs ${
                selectedPeriod === 90
                  ? 'bg-[#f7924a] text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => handlePeriodChange(90)}
            >
              90 days
            </button>
            <button
              className={`px-3 py-2  text-xs ${
                selectedPeriod === 180
                  ? 'bg-[#f7924a] text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => handlePeriodChange(180)}
            >
              180 days
            </button>
            <button
              className={`px-3 py-2  text-xs ${
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
        <div className='flex h-48 mb-6 '>
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

      <section className='flex flex-col gap-2 my-10 '>
        <div className='flex flex-row items-center gap-5 mb-3 '>
          <p className='text-xl font-semibold '>
            Your Transactions{' '}
            <span className=''>({displayedTransactions.length})</span>
          </p>
          <span className='-mb-1 text-xs'>Last {selectedPeriod} days</span>
        </div>
        <div className='flex flex-col gap-2 rounded-lg '>
          {displayedTransactions.length > 0 ? (
            displayedTransactions.map(transaction => (
              <div
                className='flex flex-row items-center justify-between gap-4 px-3 py-4 border rounded shadow-sm border-slate-500 hover:bg-white hover:shadow-md hover:transition-all hover:ease-in-out hover:duration-200'
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
                <span className=''>{formatDate(transaction.date)}</span>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>
              No transactions found for this period.
            </p>
          )}
        </div>
      </section>
      <section className=''>
        <div className='p-4 mt-6 rounded-lg bg-gray-50'>
          <h3 className='mb-3 font-bold'>Income Summary</h3>
          <div className='space-y-2'>
            <p>
              Last 60 days:{' '}
              <span className='font-bold'>
                ${calculatedPeriods.last60Days.total.toLocaleString()}
              </span>
            </p>
            <p>
              Last 30 days:{' '}
              <span className='font-bold'>
                {' '}
                ${calculatedPeriods.last30Days.total.toLocaleString()}
              </span>
            </p>
            <p>
              Last 90 days:{' '}
              <span className='font-bold'>
                {' '}
                ${calculatedPeriods.last90Days.total.toLocaleString()}
              </span>
            </p>
            <p>
              Last 180 days:{' '}
              <span className='font-bold'>
                {' '}
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
