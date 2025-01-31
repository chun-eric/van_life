import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../server.js";

const VanDetails = () => {
  const [van, setVan] = useState(null);
  const params = useParams();

  // reg eturns id: "1"
  console.log(params);

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]);

  console.log(van);

  // color options
  const colorOptions = {
    simple: "#e17653",
    rugged: "#115E59",
    luxury: "#161616",
  };

  return (
    <div className='w-full px-4 sm:px-6'>
      <div className='max-w-[600px] mx-auto my-24'>
        {van ? (
          <div className='flex flex-col text-[#161616] gap-4'>
            <img src={van.imageUrl} className='mb-4 rounded' />
            <span
              style={{ backgroundColor: colorOptions[van.type] }}
              className={`inline-block text-sm px-1 py-2 capitalize bg-black max-w-[100px] text-center text-white rounded-lg  transition-all duration-200  
                }`}
            >
              {van.type}
            </span>
            <p className='mt-3 text-2xl font-bold'>{van.name}</p>
            <p className='text-xl font-bold'>
              ${van.price}
              <span className='text-base font-semibold'>/day</span>
            </p>
            <p className='w-[90%] text-sm leading-relaxed text-black mb-4'>
              {van.description}
            </p>
            <button className='capitalize bg-[#FF8C38] text-white text-base rounded-lg px-3 py-3 font-semibold hover:bg-[black] transition-all duration-200 '>
              Rent this van
            </button>
          </div>
        ) : (
          <h2 className=''> Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default VanDetails;
