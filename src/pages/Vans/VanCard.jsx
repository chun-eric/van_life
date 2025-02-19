import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const VanCard = ({ van, colorOptions, searchParams }) => {
  return (
    <div>
      {" "}
      <Link
        // saves search params to url
        state={{ search: `?${searchParams.toString()}` }}
        to={`/vans/${van.id}`} // bug was using a relative path
        key={van.id}
        aria-label={`View details for ${van.name}, 
                 priced at $${van.price} per day`}
      >
        <div className='flex flex-col w-full pb-4 my-2 border border-black rounded-lg shadow-md cursor-pointer'>
          <img
            src={van.imageUrl[0]}
            alt={`Image of ${van.name}`}
            className='object-cover w-full transition rounded-lg aspect-square hover:shadow-lg hover:shadow-transition hover:opacity-95'
          />
          <div className='ml-2'>
            <div className='flex flex-col items-start justify-between w-full gap-2 px-2 my-4'>
              <p className='text-lg font-bold'>{van.name}</p>
              <button className='inline-block'>
                <span
                  style={{ backgroundColor: colorOptions[van.type] }}
                  className={`inline-block px-2 py-2 capitalize bg-black max-w-[100px]  text-white  transition-all duration-200 text-xs rounded 
    }`}
                >
                  {van.type}
                </span>
              </button>
            </div>
            <div className='ml-2'>
              <p className='font-semibold text-gray-900 text-bases'>
                ${van.price}
                <span className='text-sm '>/day</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

VanCard.propTypes = {
  van: PropTypes.object.isRequired,
  colorOptions: PropTypes.object.isRequired, // Add this line
  searchParams: PropTypes.object.isRequired,
};

export default VanCard;
