import React from 'react'

const RentalDatePicker = ({
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  onPickupDateChange,
  onPickupTimeChange,
  onReturnDateChange,
  onReturnTimeChange
}) => {
  return (
    <div className='flex flex-col w-full border divide-y md:flex-row border-slate-950 md:divide-y-0 md:divide-x divide-slate-950'>
      {' '}
      {/* Pick up section */}
      <div className='flex flex-1 w-full'>
        <div className='flex flex-col items-start flex-1 w-full gap-2 p-2 border-r border-slate-950'>
          <label className='block mb-1 text-xs text-gray-700'>
            Pickup Date
          </label>
          <div className='flex items-center w-full pr-2 '>
            <div className='w-full '>
              <input
                type='date'
                className='w-full px-2 py-1 text-sm bg-gray-100'
                value={pickupDate}
                onChange={e => onPickupDateChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start flex-1 w-full gap-2 p-2'>
          <label className='block w-full mb-1 text-xs text-gray-700'>
            Pickup Time
          </label>
          <div className='flex items-center w-full '>
            <div className='w-full '>
              <input
                type='time'
                className='w-full px-2 py-1 text-sm bg-gray-100'
                value={pickupTime}
                onChange={e => onPickupTimeChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Return section */}
      <div className='flex flex-1 '>
        <div className='flex flex-col items-start justify-center flex-1 gap-2 p-2 border-r border-slate-950'>
          <label className='block mb-1 text-xs text-gray-700'>
            Return Date
          </label>
          <div className='flex items-center w-full pr-2 '>
            <div className='w-full '>
              <input
                type='date'
                className='w-full px-2 py-1 text-sm bg-gray-100'
                value={returnDate}
                onChange={e => onReturnDateChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col items-start justify-center flex-1 gap-2 p-2'>
          <label className='block mb-1 text-xs text-gray-700'>
            Return Time
          </label>
          <div className='flex items-center w-full'>
            <div className='w-full '>
              <input
                type='time'
                className='w-full px-2 py-1 text-sm bg-gray-100'
                value={returnTime}
                onChange={e => onReturnTimeChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RentalDatePicker
