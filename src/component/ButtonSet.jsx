import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ButtonSet = ({
  button1Text = "Explore",
  button2Text = "Book",
  button1Link = "/",
  button2Link = "/",
  button2OnClick,
}) => {
  const buttonBaseClasses =
    "w-full px-6 py-3 font-semibold text-black transition-all border border-black shadow-inner cursor-pointer hover:-translate-y-0.5 hover:shadow-md duration-300 ease-in-out";
  return (
    <div className='flex flex-col items-center w-full gap-3 text-center xs:flex-row xs:w-auto '>
      <Link to={button1Link} className='block w-[150px]'>
        <button
          className={`${buttonBaseClasses} bg-[#FDBA74] hover:bg-orange-50 font-bold`}
        >
          {button1Text}
        </button>
      </Link>
      {/* button2OnClick is checking if user is logged in or not */}
      {button2OnClick ? (
        // if user is logged in
        <Link to='/' className=' w-[150px] md:w-inline-block'>
          <button
            onClick={button2OnClick}
            className={`${buttonBaseClasses} bg-white hover:bg-gray-50`}
          >
            {button2Text}
          </button>
        </Link>
      ) : (
        // if user is not logged in
        // link to the login page
        <Link to={button2Link} className='block w-[150px]'>
          <button className={`${buttonBaseClasses} bg-white hover:bg-gray-50`}>
            {button2Text}
          </button>
        </Link>
      )}
    </div>
  );
};

ButtonSet.propTypes = {
  button1Text: PropTypes.string,
  button2Text: PropTypes.string.isRequired, // Add prop type validation for button2Text
  button1Link: PropTypes.string.isRequired,
  button2Link: PropTypes.string.isRequired,
};

export default ButtonSet;
