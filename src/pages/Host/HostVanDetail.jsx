import { useState, useEffect } from "react";
import "../../server.js";
import { NavLink, useParams } from "react-router-dom";

const HostVanDetail = () => {
  const [van, setVan] = useState([]);
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVan(data.vans[0]); // grabbing the first item in the array only
      });
  }, [id]);

  // color options
  const colorOptions = {
    simple: "#e17653",
    rugged: "#115E59",
    luxury: "#161616",
  };

  console.log("this is the van", van);
  return (
    <div className='w-full '>
      <div className='flex flex-col w-full gap-4 p-5 bg-white'>
        <div className='flex flex-col items-center w-full gap-6 rounded-lg sm:flex-row'>
          <img
            className='object-cover w-full h-auto rounded sm:w-36 sm:h-36'
            src={van.imageUrl}
            alt={`This is a ${van.type}  ${van.name} van`}
          />
          <div className='flex flex-col w-full align-bottom item-center'>
            <div className='mb-3'>
              <span
                style={{ backgroundColor: colorOptions[van.type] }}
                className={`inline-block text-xs px-4 py-2 capitalize bg-black max-w-[100px] text-center text-white rounded-lg  transition-all duration-200  
                }`}
              >
                {van.type}
              </span>
            </div>
            <p className='mb-1 text-xl font-bold'>{van.name}</p>
            <p className='text-lg font-bold'>
              ${van.price}
              <span className='text-base font-normal'>/day</span>
            </p>
          </div>
        </div>
        <nav className='flex flex-wrap gap-10 mt-4 text-sm'>
          <NavLink
            to={`/host/vans/${id}/details`}
            end
            className={({ isActive }) =>
              isActive
                ? "font-bold text-gray-800 underline hover:text-gray-600"
                : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
            }
          >
            Details
          </NavLink>
          <NavLink
            to={`/host/vans/${id}/pricing`}
            className={({ isActive }) =>
              isActive
                ? "font-bold text-gray-800 underline hover:text-gray-600"
                : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
            }
          >
            Pricing
          </NavLink>

          <NavLink
            to={`/host/vans/${id}/photos`}
            className={({ isActive }) =>
              isActive
                ? "font-bold text-gray-800 underline hover:text-gray-600"
                : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
            }
          >
            Photos
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default HostVanDetail;
