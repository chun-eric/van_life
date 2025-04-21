import PropTypes from 'prop-types'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const ButtonSet = ({
  button1Text = 'Explore',
  button1Link = '/',
  button1OnClick,
  button2Text = 'Book',
  button2Link,
  button2OnClick
}) => {
  const buttonBaseClasses =
    'w-full px-6 py-3 font-semibold text-black transition-all border border-black shadow-inner cursor-pointer hover:-translate-y-0.5 hover:shadow-md duration-300 ease-in-out'

  // const location = useLocation()
  // const navigate = useNavigate()

  // function for handle Book Now button click for smooth scrolling on homepage
  // const handleBookNowClick = () => {
  //   if (button1Text === 'Book Now') {
  //     if (location.pathname === '/') {
  //       e.preventDefault()
  //       // scroll to the vans section
  //       const vansSection = document.getElementById('vans-section')
  //       if (vansSection) {
  //         vansSection.scrollIntoView({ behavior: 'smooth' })
  //       } else {
  //         navigate('/#vans-section')
  //       }
  //     }
  //   }
  // }

  return (
    <div className='flex flex-col items-center w-full gap-3 text-center xs:flex-row xs:w-auto '>
      <Link
        to={button1Link}
        onClick={button1OnClick}
        className='block w-[150px]'
      >
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
  )
}

ButtonSet.propTypes = {
  button1Text: PropTypes.string,
  button2Text: PropTypes.string.isRequired, // Add prop type validation for button2Text
  button1Link: PropTypes.string.isRequired,
  button2Link: PropTypes.string.isRequired,
  button2OnClick: PropTypes.func
}

export default ButtonSet
