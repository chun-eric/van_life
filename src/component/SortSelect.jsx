import { useState } from "react";

const SortSelect = ({ value, onSort }) => {
  // tracking the sort state

  return (
    <div>
      <select
        name=''
        value={value}
        onChange={(e) => onSort(e.target.value)}
        id=''
        className='px-3 py-2 text-xs border-b outline-none cursor-pointer border-slate-100'
      >
        <option value='default'>Sort By</option>
        <option value='low-to-high'>Price: Low to High</option>
        <option value='high-to-low'>Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortSelect;
