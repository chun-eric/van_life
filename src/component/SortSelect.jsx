import { useState } from 'react'

const SortSelect = ({ value, onSort }) => {
  // tracking the sort state

  return (
    <select
      name=''
      value={value}
      onChange={e => onSort(e.target.value)}
      id=''
      className='px-2 lg:py-2.5 text-xs   outline-none cursor-pointer bg-gray-50 w-full h-full py-4 pr-6 rounded-lg'
    >
      <option value='default'>Sort By</option>
      <option value='low-to-high'>Price: Low to High</option>
      <option value='high-to-low'>Price: High to Low</option>
    </select>
  )
}

export default SortSelect
