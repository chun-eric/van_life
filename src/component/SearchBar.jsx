import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  // state to save these values
  const [searchQuery, setSearchsearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchsearchQuery(query);
    onSearch(query);
  };
  return (
    <input
      type='text'
      value={searchQuery}
      onChange={handleSearch}
      className='flex-grow p-2 pl-3 border border-gray-200 outline-none rounded-2xl placeholder:text-xs'
      placeholder='Search vans...'
    />
  );
};

export default SearchBar;
