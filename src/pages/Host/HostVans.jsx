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
      <div className='w-full px-4 sm:px-6'>
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
    <div className='flex flex-col gap-5 py-10 pb-16 my-4 mt-3 bg-white rounded-lg xs:mt-6 xs:px-2 px:0'>
      <p className='text-2xl font-bold'>Your listed vans</p>
      <div className='flex flex-col flex-1 gap-5'>
        {vans.length > 0 ? (
          vans.map((van) => (
            <div key={van.id} className='flex flex-col gap-4'>
              <Link to={`/host/vans/${van.id}`}>
                <div className='flex flex-row items-center justify-between gap-6 border border-black rounded-lg'>
                  <div className='flex items-center justify-between gap-3 xs:gap-6'>
                    <img
                      className='object-cover rounded-lg cursor-pointer h-28 w-28'
                      src={van.imageUrl[0]}
                      alt={`This is a ${van.type}  ${van.name} van`}
                    />
                    <div className='flex flex-col'>
                      <p className='mb-2 font-bold xs:text-xl text-md'>
                        {van.name}
                      </p>
                      <p className='xs:text-lg text-md'>
                        <span className=''>${van.price}/day</span>
                      </p>
                    </div>
                  </div>
                  <span className='hidden mr-4 text-xs cursor-pointer hover:underline xs:block'>
                    View
                  </span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h2 className='text-2xl font-bold'>No vans listed...</h2>
        )}
      </div>
    </div>
  );
};

export default HostVans;
