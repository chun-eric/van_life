import { useState } from "react";

const DateRangePicker = () => {
  // state
  const [showCalendar, setShowCalender] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // get calendar view controls
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  console.log("currentMonth", currentMonth);

  return (
    <div className=' w-full relative '>
      {/* input field */}
      <div
        className='flex items-center  text-black cursor-pointer w-full'
        onClick={() => setShowCalender(!showCalendar)}
      >
        <div className='flex items-center pl-2 border border-gray-600 w-full  '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className='size-5 w-5 h-5'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5'
            />
          </svg>
          <input
            type='text'
            readOnly
            value={
              dateRange.startDate
                ? `${dateRange.startDate} - ${dateRange.endDate}`
                : "Select Dates"
            }
            placeholder='Select Dates'
            className='w-full px-4 py-3 mt-1 text-xs outline-none cursor-pointer placeholder:text-black'
          />
        </div>
      </div>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div className='absolute left-0 z-150 w-full mt-0 p-4 bg-white rounded-lg shadow top-full max-w-[600px]'>
          {/* Calendar Navigation */}
          <div className='flex items-center justify-between mb-4'>
            <button className='flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full'>
              &larr;
            </button>
            <span className='text-xs'>
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button className='flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full'>
              &rarr;
            </button>
          </div>

          {/* Calendar Grid */}
          <div className='grid grid-cols-7 gap-1 '>
            {/* Weekday headers */}
            {weekDays.map((day) => {
              return (
                <div className='text-xs text-gray-400 ' key={day}>
                  {day}
                </div>
              );
            })}

            {/* Calendar days */}
            {Array.from({ length: 35 }, (_, i) => (
              <button
                className='flex items-center justify-center w-8 h-8 mt-2 text-xs text-center rounded-full hover:bg-black hover:text-white'
                key={i}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Calendar Days */}

          {/* Quick Selection */}
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
