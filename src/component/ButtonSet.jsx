import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ButtonSet = ({
  button1Text = "Explore",
  button2Text = "Book",
  button1Link = "/",
  button2Link = "/",
  button2OnClick,
}) => {
  return (
    <div className='flex gap-3'>
      <Link to={button1Link}>
        <button className='px-6 py-3 font-semibold transition-all bg-orange-200 border border-black shadow-inner cursor-pointer  hover:bg-orange-50 hover:-translate-y-0.5 hover:shadow-md duration-300 ease-in-out'>
          {button1Text}
        </button>
      </Link>
      {/* button2OnClick is checking if user is logged in or not */}
      {button2OnClick ? (
        // if user is logged in
        <Link to='/'>
          <button
            onClick={button2OnClick}
            className='px-6 py-3 font-semibold transition-all border border-black shadow-inner cursor-pointer bg-b hover:bg-white  bg-gray-50  hover:-translate-y-0.5 hover:shadow-md duration-300 ease-in-out'
          >
            {button2Text}
          </button>
        </Link>
      ) : (
        // if user is not logged in
        // link to the login page
        <Link to={button2Link}>
          <button className='px-6 py-3 font-semibold transition-all border border-black shadow-inner cursor-pointer bg-b hover:bg-white  bg-gray-50  hover:-translate-y-0.5 hover:shadow-md duration-300 ease-in-out'>
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
