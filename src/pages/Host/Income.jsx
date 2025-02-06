import { Link } from "react-router-dom";
import { transactionData, monthlyData } from "../../data.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";

const Income = () => {
  // helper function to calculate date range
  const calculateDateRange = (days) => {
    const currentDate = new Date(transactionData.at(-1).date);
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - days);
    return { currentDate, pastDate };
  };

  // helper function to filter and sum transactions
  const calcuateIncomeForPeriod = (days) => {
    // object destructuring
    const { currentDate, pastDate } = calculateDateRange(days);

    const filteredTransactions = transactionData.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= pastDate && transactionDate <= currentDate;
    });

    return {
      total: filteredTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      ),
      transactions: filteredTransactions,
    };
  };

  // format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "2-digit",
    });
  };

  // Calculate income for different periods
  const last30Days = calcuateIncomeForPeriod(30);
  const last60Days = calcuateIncomeForPeriod(60);
  const last90Days = calcuateIncomeForPeriod(90);
  const last180Days = calcuateIncomeForPeriod(180);
  const last365days = calcuateIncomeForPeriod(365);

  // state for selected time period
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [displayedTransactions, setDisplayedTransactions] = useState(
    last30Days.transactions
  );
  const [displayedTotal, setDisplayedTotal] = useState(last30Days.total);

  // handle updated displayed data when period changes
  const handlePeriodChange = (days) => {
    const periodData = calcuateIncomeForPeriod(days);
    console.log(periodData);
    setSelectedPeriod(days);
    setDisplayedTransactions(periodData.transactions);
    setDisplayedTotal(periodData.total);
  };

  return (
    <div className='px-6 py-10 mt-6 bg-white rounded-lg '>
      <section className='flex flex-col gap-4 '>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>Host Income</h1>
          <div className='flex flex-row items-center justify-between '>
            <p className='text-sm'>
              Last{" "}
              <span className='text-gray-700 underline cursor-pointer'>
                {selectedPeriod} days
              </span>
            </p>
          </div>
          <h2 className='mt-6 text-3xl font-bold'>
            ${displayedTotal.toLocaleString()}
          </h2>
          <div className='flex mt-4'>
            <button
              className={`px-3 py-2  text-xs ${
                selectedPeriod === 30
                  ? "bg-[#f7924a] text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => handlePeriodChange(30)}
            >
              30 days
            </button>
            <button
              className={`px-3 py-2  text-xs ${
                selectedPeriod === 60
                  ? "bg-[#f7924a] text-black"
                  : "bg-gray-100"
              }`}
              onClick={() => handlePeriodChange(60)}
            >
              60 days
            </button>
            <button
              className={`px-3 py-2  text-xs ${
                selectedPeriod === 90
                  ? "bg-[#f7924a] text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => handlePeriodChange(90)}
            >
              90 days
            </button>
            <button
              className={`px-3 py-2  text-xs ${
                selectedPeriod === 180
                  ? "bg-[#f7924a] text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => handlePeriodChange(180)}
            >
              180 days
            </button>
            <button
              className={`px-3 py-2  text-xs ${
                selectedPeriod === 365
                  ? "bg-[#f7924a] text-white"
                  : "bg-gray-100"
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
                tickFormatter={(value) => `$${value / 1000}k`}
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
            Your Transactions{" "}
            <span className=''>({displayedTransactions.length})</span>
          </p>
          <span className='-mb-1 text-xs'>Last {selectedPeriod} days</span>
        </div>
        <div className='flex flex-col gap-2 rounded-lg '>
          {displayedTransactions.map((transaction) => (
            <div
              className='flex flex-row items-center justify-between gap-4 px-3 py-4 border border-slate-500 shadow-sm bg-[#FFF7ED] rounded'
              key={transaction.id}
            >
              <span className='font-bold'>
                ${transaction.amount.toLocaleString()}{" "}
                <span className='text-sm'>received</span>
              </span>
              <span className=''>{formatDate(transaction.date)}</span>
            </div>
          ))}
        </div>
      </section>
      <section className=''>
        <div className='p-4 mt-6 rounded-lg bg-gray-50'>
          <h3 className='mb-3 font-bold'>Income Summary</h3>
          <div className='space-y-2'>
            <p>
              Last 60 days:{" "}
              <span className='font-bold'>
                ${last60Days.total.toLocaleString()}
              </span>
            </p>
            <p>
              Last 30 days:{" "}
              <span className='font-bold'>
                {" "}
                ${last30Days.total.toLocaleString()}
              </span>
            </p>
            <p>
              Last 90 days:{" "}
              <span className='font-bold'>
                {" "}
                ${last90Days.total.toLocaleString()}
              </span>
            </p>
            <p>
              Last 180 days:{" "}
              <span className='font-bold'>
                {" "}
                ${last180Days.total.toLocaleString()}
              </span>
            </p>
            <p>
              Last year:{" "}
              <span className='font-bold'>
                ${last365days.total.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Income;
