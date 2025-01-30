import { useState, useEffect } from "react";
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
    <div className='w-full p-6 '>
      <div className='my-10 max-w-[1280px] mx-auto'>
        <h1 className='mb-6 text-lg font-bold md:text-2xl'>
          Explore our van options 🚐
        </h1>
        <div className='flex items-start mb-4'>
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
        <div className='grid items-center w-full gap-8 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1'>
          {vans.map((van) => (
            <div
              key={van.id}
              className='grid justify-between w-full gap-4 my-4 cursor-pointer '
            >
              <img
                src={van.imageUrl}
                alt={van.name}
                className='w-full max-w-full transition rounded-md h-96 hover:shadow-lg hover:shadow-transition hover:opacity-95'
              />
              <div className='flex justify-between w-full px-2'>
                <h2 className='text-xl font-bold'>{van.name}</h2>
                <p>
                  ${van.price}
                  <span>/day</span>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vans;
