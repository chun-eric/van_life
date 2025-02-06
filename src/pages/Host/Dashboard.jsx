import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { getHostVans } from "../../api";

const Dashboard = () => {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch vans data after initial component mount
  useEffect(() => {
    setLoading(true);
    getHostVans()
      .then((data) => setVans(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  // render vans data
  function renderVans(vans) {
    const vansElements = vans.map((van) => (
      <div key={van.id} className='flex flex-col gap-4 px-4 py-5 '>
        <div className='flex flex-row items-center justify-between gap-6 rounded-lg'>
          <div className='flex items-center justify-between gap-6 '>
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
          <Link
            to={`vans/${van.id}`}
            className='text-xs cursor-pointer hover:underline'
          >
            View
          </Link>
        </div>
      </div>
    ));

    return (
      <div className=''>
        <section className=''>{vansElements}</section>
      </div>
    );
  }

  // render error message
  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className='px-6 py-10 mt-6 bg-white rounded-lg '>
      <section className='flex flex-col gap-4 '>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>Welcome $Bob!</h1>
          <div className='flex flex-row items-center justify-between '>
            <p className='text-sm'>
              Your income in the past{" "}
              <span className='text-gray-700 underline cursor-pointer'>
                30 days
              </span>
            </p>
            <Link
              to='income'
              className='pr-3 text-xs cursor-pointer hover:underline'
            >
              Details
            </Link>
          </div>
          <h2 className='mt-6 text-3xl font-bold'>$2,260.89</h2>
        </div>
      </section>
      <section className='flex flex-row items-center justify-between my-8'>
        <div className='flex flex-row gap-4'>
          <h2 className='font-bold'>Review score</h2>
          <div className='flex flex-row items-center gap-1'>
            <BsStarFill className='' color='#ff8c38' />
            <p className='ml-1'>
              <span className='font-bold'>${5}.0</span>/5
            </p>
            <p className='ml-2'>
              <span className='underline cursor-pointer'>${3} reviews</span>
            </p>
          </div>
        </div>
        <Link
          to='review'
          className='pr-3 text-xs cursor-pointer hover:underline'
        >
          Details
        </Link>
      </section>
      <section className='flex flex-col gap-2 my-10 '>
        <div className='flex flex-row items-center gap-5 mb-3 '>
          <h2 className='text-2xl font-bold '>Your listed vans</h2>
          <Link
            to='vans'
            className='mt-1 text-xs cursor-pointer hover:underline'
          >
            View all
          </Link>
        </div>
        <div className='bg-[#fff7ee] rounded-lg'>
          {loading && !vans ? (
            <h1 className=''>Loading...</h1>
          ) : (
            renderVans(vans)
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
