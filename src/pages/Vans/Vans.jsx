import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../server.js";
import { getVans } from "../../api.js";
const Vans = () => {
  // all vans state
  const [vans, setVans] = useState([]);
  // URL search params
  const [searchParams, setSearchParams] = useSearchParams();
  // loading state
  const [loading, setLoading] = useState(false);
  // error state
  const [error, setError] = useState(null);

  const typeFilter = searchParams.get("type");

  // Filtered vans array based on url search type
  const filteredVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

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

  // if loading
  if (loading) {
    return (
      <div className='w-full px-4 sm:px-6 '>
        <div className='my-10 max-w-[1280px] mx-auto'>
          <h1 className=''>Loading vans...</h1>
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
            <h2 className='mb-2 text-xl font-bold'>Error Details:</h2>
            <p>Message: {error.message}</p>
            <p>Status: {error.status}</p>
            <p>Status Text: {error.statusText}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full px-4 sm:px-6 '>
      <div className='my-10 max-w-[1280px] mx-auto'>
        <h1 className='mb-6 text-xl font-bold md:text-2xl'>
          Explore our van options 🚐
        </h1>
        <div className='flex flex-col flex-wrap items-center justify-between mb-4 xs:flex-row'>
          <div className='flex flex-wrap w-full gap-2 xs:w-auto'>
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
                  className={`inline-block px-4 py-2 capitalize max-w-[100px] text-center rounded mr-2 cursor-pointer`}
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
                className={`inline-block  py-2 capitalize  w-full text-left  rounded text-black mr-2 cursor-pointer  underline
              }`}
              >
                Clear filter
              </span>
            </button>
          )}
        </div>
        <div className='grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {filteredVans.map((van) => (
            // Van Card
            <Link
              // saves search params to url
              state={{ search: `?${searchParams.toString()}` }}
              to={van.id}
              key={van.id}
              aria-label={`View details for ${van.name}, 
                             priced at $${van.price} per day`}
            >
              <div className='flex flex-col w-full my-2 cursor-pointer '>
                <img
                  src={van.imageUrl}
                  alt={`Image of ${van.name}`}
                  className='object-cover w-full transition rounded-md aspect-square hover:shadow-lg hover:shadow-transition hover:opacity-95'
                />
                <div className='flex justify-between w-full px-2 my-4'>
                  <p className='text-xl font-bold'>{van.name}</p>
                  <p className='text-xl font-bold'>
                    ${van.price}
                    <span className='text-base font-semibold'>/day</span>
                  </p>
                </div>
                <span
                  style={{ backgroundColor: colorOptions[van.type] }}
                  className={`inline-block px-1 py-2 capitalize bg-black max-w-[100px] text-center text-white rounded-lg ml-2 transition-all duration-200 [transition-timing-function:_cubic-bezier(0.4,_0,_0.2,_1)] 
                }`}
                >
                  {van.type}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vans;
