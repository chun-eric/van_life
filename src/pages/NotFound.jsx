import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='flex items-center justify-center w-full min-h-screen px-4 mx-auto -mt-20 text-center sm:px-8'>
      <div className='my-10 max-w-[1280px] mx-auto '>
        <h1 className='mb-8 text-5xl font-bold'>
          404 <span className=''> Error</span>
        </h1>
        <p className='text-lg font-bold text-slate-700'>
          Sorry, the page you are looking for
        </p>
        <p className='text-lg font-bold text-slate-700'>wasn't found. =(</p>
        <Link to='/' className=''>
          <button className='bg-black text-white w-[100%] max-w-[400px] text-center px-12 py-3 rounded capitalize mt-10 font-semibold z-10 text-base'>
            Return to Home{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
