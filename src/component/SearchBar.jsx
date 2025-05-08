import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  // state to save these values
  const [inputValue, setInputValue] = useState('')

  const handleChange = e => {
    setInputValue(e.target.value)
    onSearch(e.target.value)
  }

  const handleClear = () => {
    setInputValue('')
    onSearch('')
  }

  return (
    <div className='relative items-center flex-grow '>
      <input
        type='text'
        value={inputValue}
        onChange={handleChange}
        className={`w-full p-2 outline-none transition-all duration-400 ease-in-out text-sm ${
          inputValue ? 'border-b border-[#FDBA74]' : 'border-b border-slate-600'
        }`}
        placeholder='Search vans...'
      />
      {
        // if there is a value, show the clear button
        inputValue && (
          <button
            onClick={handleClear}
            className='absolute text-xs text-gray-600 top-3 right-4'
            aria-label='clear search bar'
          >
            X
          </button>
        )
      }
    </div>
  )
}

export default SearchBar
