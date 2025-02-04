import { useState, useEffect } from "react";
import { getHostVans } from "../../api";
import { Link } from "react-router-dom";

const HostVans = () => {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getHostVans();
        setVans(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, []);

  // Loading state
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
    <div className='flex flex-col gap-5 my-4'>
      <p className='text-2xl font-bold'>Your listed vans</p>
      <div className='flex flex-col flex-1 gap-5'>
        {vans.length > 0 ? (
          vans.map((van) => (
            <Link to={van.id} key={van.id}>
              <div className='flex flex-col gap-4 p-5 bg-white'>
                <div className='flex flex-row items-center gap-6 rounded-lg'>
                  <img
                    className='object-cover rounded-lg cursor-pointer h-28 w-28'
                    src={van.imageUrl}
                    alt={`This is a ${van.type}  ${van.name} van`}
                  />
                  <div className='flex flex-col'>
                    <p className='mb-2 text-xl font-bold'>{van.name}</p>
                    <p className=''>
                      <span className=''>${van.price}/day</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h2 className='text-2xl font-bold'>No vans listed...</h2>
        )}
      </div>
    </div>
  );
};

export default HostVans;
