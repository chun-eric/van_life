import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  // state to save these values
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onSearch(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  return (
    <div className='relative items-center flex-grow'>
      <input
        type='text'
        value={inputValue}
        onChange={handleChange}
        className='w-full px-4 py-[0.75rem] text-sm border border-gray-600 rounded-l outline-none placeholder:text-xs '
        placeholder='Search vans...'
      />
      {
        // if there is a value, show the clear button
        inputValue && (
          <button
            onClick={handleClear}
            className='absolute text-xs text-gray-600 rounded-full top-3 right-4'
            aria-label='clear search bar'
          >
            X
          </button>
        )
      }
    </div>
  );
};

export default SearchBar;
