import { useState } from "react";

const SortSelect = ({ value, onSort }) => {
  // tracking the sort state

  return (
    <select
      name=''
      value={value}
      onChange={(e) => onSort(e.target.value)}
      id=''
      className='px-4 py-2.5 text-xs border border-gray-600 rounded-r outline-none cursor-pointer bg-white w-full h-full'
    >
      <option value='default'>Sort By</option>
      <option value='low-to-high'>Price: Low to High</option>
      <option value='high-to-low'>Price: High to Low</option>
    </select>
  );
};

export default SortSelect;
