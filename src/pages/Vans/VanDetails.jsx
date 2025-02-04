import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getVans } from "../../api.js";

const VanDetails = () => {
  const [van, setVan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  // reg eturns id: "1"
  // console.log(id);
  console.log(location);

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans(id);
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

  // loading state
  if (loading) {
    return (
      <div className='w-full px-4 sm:px-6 '>
        <div className='my-10 max-w-[1280px] mx-auto'>
          <h1 className='' aria-live='polite'>
            Loading van details...
          </h1>
        </div>
      </div>
    );
  }

  // error state
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
    <div className='w-full px-4 sm:px-6'>
      <div className='max-w-[600px] mx-auto my-24'>
        <Link
          to={`..${location.state?.search || ""}`}
          relative='path'
          className='block my-8 text-black no-underline '
        >
          &larr;{" "}
          <span className='text-sm hover:underline'>
            Back to all {van?.type} vans
          </span>
        </Link>
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
