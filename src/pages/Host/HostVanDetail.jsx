import { useState, useEffect } from "react";
import { getHostVans } from "../../api";
import { NavLink, useParams, Link, Outlet } from "react-router-dom";

const HostVanDetail = () => {
  const [van, setVan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getHostVans(id);
        setVan(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, [id]);

  // color options
  const colorOptions = {
    simple: "#e17653",
    rugged: "#115E59",
    luxury: "#161616",
  };

  // Loading state
  if (loading) {
    return (
      <div className='w-full px-4 mt-10 sm:px-6'>
        <div className='my-10 max-w-[1280px] mx-auto'>
          <h1 className='' aria-live='polite'>
            Loading vans...
          </h1>
        </div>
      </div>
    );
  }

  // Error state
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
    <section className='w-full '>
      <Link
        to='..'
        relative='path'
        className='block my-8 text-black no-underline '
      >
        &larr; <span className='text-sm hover:underline'>Back to all vans</span>
      </Link>
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
            to='.'
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
            to='pricing'
            className={({ isActive }) =>
              isActive
                ? "font-bold text-gray-800 underline hover:text-gray-600"
                : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to='photos'
            className={({ isActive }) =>
              isActive
                ? "font-bold text-gray-800 underline hover:text-gray-600"
                : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
            }
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ van }} />
      </div>
    </section>
  );
};

export default HostVanDetail;
