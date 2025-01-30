import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../server.js";

const Vans = () => {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  console.log(vans);

  // color options
  const colorOptions = {
    simple: "#e17653",
    rugged: "#115E59",
    luxury: "#161616",
  };

  return (
    <div className='w-full px-4 sm:px-6 '>
      <div className='my-10 max-w-[1280px] mx-auto'>
        <h1 className='mb-6 text-xl font-bold md:text-2xl'>
          Explore our van options 🚐
        </h1>
        <div className='flex flex-wrap items-start gap-2 mb-4'>
          {Object.keys(colorOptions).map((type) => (
            <span
              key={type}
              className={`inline-block px-4 py-2 capitalize bg-[#ffead0] max-w-[100px] text-center  rounded text-black mr-2 cursor-pointer 
              }`}
            >
              {type}
            </span>
          ))}
        </div>
        <div className='grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {vans.map((van) => (
            // Van Card
            <Link
              to={`/vans/${van.id}`}
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
