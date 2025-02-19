import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getVans } from "../../api.js";
import Breadcrumbs from "../../component/Breadcrumbs.jsx";

const VanDetails = () => {
  const [van, setVan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("info");

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

  // tab content
  const tabContent = {
    info: "Our Adventure Van comes equipped with all the essentials for a perfect getaway. Enjoy a fully-stocked kitchen, comfortable sleeping arrangements, and ample storage space. Experience the great outdoors like never before!",
    delivery:
      "Get your van delivered right to your destination. We offer flexible pickup and drop-off times, with real-time tracking and timely communication throughout the delivery process.",
    payment:
      "Easy and secure payment options available. We accept all major credit cards, digital wallets, and offer flexible payment plans. Transparent pricing with no hidden fees.",
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

  const buttonBaseClasses =
    "w-full px-6 py-3 font-semibold text-black transition-all border border-black shadow-inner cursor-pointer hover:-translate-y-0.5 hover:shadow-md duration-300 ease-in-out";

  return (
    <div className='w-full max-w-6xl px-4 mx-auto sm:px-6'>
      <div className='flex flex-col w-full p-6 mx-auto my-24 bg-white rounded-lg '>
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
          <div className='flex flex-col text-[#161616] gap-6 md:flex-row md:gap-8 nax-w-[1280px]'>
            <div className='w-full md:w-[50%]'>
              <img src={van.imageUrl} className='mb-4 rounded shadow-sm' />
            </div>
            <div className='w-full md:w-[50%] flex flex-col gap-5'>
              <Breadcrumbs van={van} />
              <p className='mt-3 text-2xl font-bold'>{van.name}</p>
              <p className='text-xl font-bold'>
                ${van.price}
                <span className='text-base font-semibold'>/day</span>
              </p>
              <span
                style={{ backgroundColor: colorOptions[van.type] }}
                className={`inline-block text-xs px-1 py-2 capitalize bg-black max-w-[100px] text-center text-white rounded-lg  transition-all duration-200  
                }`}
              >
                {van.type}
              </span>
              <p className='w-[80%] text-sm leading-relaxed text-black mb-4'>
                {van.description}
              </p>
              <Link to={`/vans/${van.id}/book`}>
                <button
                  className={`${buttonBaseClasses} bg-[#FDBA74] hover:bg-orange-50 font-bold w-[80%]`}
                >
                  Rent Van
                </button>
              </Link>
              {/* tabs */}
              <div className='mt-8 '>
                <div className='flex gap-8 pl-2'>
                  {["info", "delivery", "payment"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 text-xs capitalize  transition-all duration-200 ${
                        activeTab === tab
                          ? "border-b-2 border-black"
                          : "text-gray-500 hover:text-black"
                      } `}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              {/* tab content */}
              <div className='py-1 w-[70%] pl-2'>
                <p className='text-xs leading-relaxed text-gray-700'>
                  {tabContent[activeTab]}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <h2 className=''> Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default VanDetails;
