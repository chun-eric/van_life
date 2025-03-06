import React from "react";

const RentalDatePicker = ({
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  onPickupDateChange,
  onPickupTimeChange,
  onReturnDateChange,
  onReturnTimeChange,
}) => {
  return (
    <div className='flex flex-col md:flex-row w-full border border-slate-950 divide-y md:divide-y-0 md:divide-x divide-slate-950'>
      {" "}
      {/* Pick up section */}
      <div className='flex-1 flex  '>
        <div className='flex-1 flex flex-col gap-2  p-2 border-r border-slate-950 items-start'>
          <label className='block text-xs text-gray-700 mb-1'>
            Pickup Date
          </label>
          <div className='flex items-center pr-2 '>
            <div className='w-full '>
              <input
                type='date'
                className='w-full text-sm bg-gray-100 px-2 py-1'
                value={pickupDate}
                onChange={(e) => onPickupDateChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='flex-1 flex flex-col gap-2 p-2 items-start'>
          <label className='block text-xs text-gray-700 mb-1'>
            Pickup Time
          </label>
          <div className='flex items-center  '>
            <div className='w-full '>
              <input
                type='time'
                className='w-full text-sm bg-gray-100 px-2 py-1'
                value={pickupTime}
                onChange={(e) => onPickupTimeChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Return section */}
      <div className='flex-1 flex  '>
        <div className='flex-1 flex flex-col gap-2 p-2 border-r border-slate-950 items-start'>
          <label className='block text-xs text-gray-700 mb-1'>
            Return Date
          </label>
          <div className='flex items-center pr-2 '>
            <div className='w-full '>
              <input
                type='date'
                className='w-full text-sm bg-gray-100 px-2 py-1'
                value={returnDate}
                onChange={(e) => onReturnDateChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='flex-1 flex flex-col gap-2 p-2 items-start'>
          <label className='block text-xs text-gray-700 mb-1'>
            Return Time
          </label>
          <div className='flex items-center  '>
            <div className='w-full '>
              <input
                type='time'
                className='w-full text-sm bg-gray-100 px-2 py-1'
                value={returnTime}
                onChange={(e) => onReturnTimeChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDatePicker;
