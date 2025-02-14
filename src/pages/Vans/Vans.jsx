import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../server.js";
import { getVans } from "../../api.js";
import VanCard from "./VanCard.jsx";
import SearchBar from "../../component/SearchBar.jsx";

const Vans = () => {
  const [vans, setVans] = useState([]); // all vans state
  const [searchParams, setSearchParams] = useSearchParams(); // URL search params
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const typeFilter = searchParams.get("type"); // URL search type
  console.log(typeFilter);

  // Filtered vans array based on url search type
  const filteredVans = typeFilter
    ? vans.filter((van) => {
        const matchesType = van.type === typeFilter;
        const matchesSearch = van.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
      })
    : vans.filter((van) =>
        van.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      setError(null);
      try {
        const data = await getVans();
        setVans(data);
      } catch (error) {
        setError(error);
        setVans([]);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, []);

  // color options
  const colorOptions = {
    simple: "#e17653",
    rugged: "#115E59",
    luxury: "#161616",
  };

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }

      return prevParams;
    });
  }

  function handleSearch(value) {
    console.log("Value received from SearchBar:", value);
    setSearchQuery(value);
  }

  // if loading
  if (loading) {
    return (
      <div className='w-full px-4 sm:px-6 '>
        <div className='my-10 max-w-[1280px] mx-auto'>
          <h1 className='' aria-live='polite'>
            Loading vans...
          </h1>
        </div>
      </div>
    );
  }

  // if error occurs
  if (error) {
    return (
      <div className='w-full px-4 sm:px-6'>
        <div className='my-10 max-w-[1280px] mx-auto'>
          <div className='p-4 text-red-500 border border-red-500 rounded'>
            <h2 className='mb-2 text-xl font-bold' aria-live='assertive'>
              Error Details:
            </h2>
            <p aria-live='assertive'>Message: {error.message}</p>
            <p aria-live='assertive'>Status: {error.status}</p>
            <p aria-live='assertive'>Status Text: {error.statusText}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full px-4 bg-white border border-t border-gray-100 py-14 sm:px-6 '>
      <div className='my-10 max-w-[1280px] mx-auto'>
        <h1 className='mb-3 text-xl font-bold md:text-2xl'>Explore Our Vans</h1>
        <p className='my-2 mb-6 text-xs'>
          Find the perfect van for your next adventure!
        </p>
        <div className='flex flex-row items-center gap-6 mb-6 align-top justify-normal'>
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
          {console.log("Current search query:", searchQuery)}
          <select
            name=''
            id=''
            className='px-4 py-2 text-xs border border-gray-200'
          >
            <option value=''>Sort By</option>
            <option value=''>Price: Low to High</option>
            <option value=''>Price: High to Low</option>
            <option value=''>Price: High to Low</option>
          </select>
        </div>
        <div className='flex flex-col flex-wrap items-center justify-between mb-4 xs:flex-row'>
          <div className='flex flex-wrap w-full gap-1 xs:w-auto'>
            {Object.keys(colorOptions).map((type) => (
              <button
                key={type}
                className='no-underlines'
                onClick={() => handleFilterChange("type", type)}
              >
                <span
                  style={{
                    backgroundColor:
                      typeFilter === type ? colorOptions[type] : "#ffead0",
                    color: typeFilter === type ? "white" : "black",
                  }}
                  className={`inline-block px-2 py-2 capitalize max-w-[100px] text-center rounded mr-2 cursor-pointer text-xs`}
                >
                  {type}
                </span>
              </button>
            ))}
          </div>
          {typeFilter && (
            <button
              onClick={() => handleFilterChange("type", null)}
              className='flex w-full mt-4 ml-2 xs:ml-0 xs:w-auto xs:mt-0'
            >
              <span
                className={`inline-block  py-2 capitalize  w-full text-left  rounded text-black mr-2 cursor-pointer  underline text-xs
              }`}
              >
                Clear filter
              </span>
            </button>
          )}
        </div>
        <div className='grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {filteredVans.map((van) => (
            // Van Card
            <VanCard
              key={van.id}
              van={van}
              colorOptions={colorOptions}
              searchParams={searchParams}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vans;
