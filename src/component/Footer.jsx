import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/logo.png";
import {
  faFacebook,
  faLinkedin,
  faYoutube,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className='pt-16 pb-8 text-black bg-orange-100 border-t border-black'>
      <div className='px-6 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-5 '>
          {/* Logo Section */}
          <div className='col-span-1'>
            <Link to='/'>
              <img src={Logo} alt='' width={100} height={100} />
            </Link>
          </div>

          {/* Quick Links section */}
          <div className='col-span-1'>
            <h3 className='mb-4 text-sm font-semibold'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/'
                  className='text-sm text-slate-800 hover:text-gray-700'
                >
                  Van Rentals
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-sm text-slate-800 hover:text-gray-700'
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-sm text-slate-800 hover:text-gray-700'
                >
                  Customer Support
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-sm text-slate-800 hover:text-gray-700'
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-sm text-slate-800 hover:text-gray-700'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info section */}
          <div className='col-span-1'>
            <h3 className='mb-4 text-sm font-semibold'>Company Info</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/about'
                  className='text-sm text-slate-800 hover:text-gray-700'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to='/blog'
                  className='text-sm text-slate-800 hover:text-gray-700'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to='/careers'
                  className='text-sm text-slate-800 hover:text-gray-700'
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to='/press'
                  className='text-sm text-slate-800 hover:text-gray-700'
                >
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe section */}
          <div className='col-span-1 md:col-span-2 max-w-[400px]'>
            <h3 className='mb-4 text-sm font-semibold'>Subscribe</h3>
            <p className='mb-4 text-sm text-gray-600'>
              Join our newsletter for updates on new features and special offers
            </p>
            <form action='' className='flex flex-col w-full gap-1 sm:flex-row'>
              <input
                type='email'
                className='w-full px-3 py-2 text-sm border border-gray-300 outline-none sm:w-2/3 placeholder:text-xs'
                placeholder='Enter your email'
              />
              <button
                type='submit'
                className='w-full px-2 py-3 text-xs text-white bg-black  hover:bg-[#115E59] focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/3 '
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 mt-16 border-t border-gray-400'>
          <div className='flex flex-col justify-between space-y-4 items-left md:flex-row md:space-y-0'>
            <div className='flex flex-col items-start gap-2 text-xs text-left text-gray-900 md:gap-3 md:flex-row md:space-x-4 '>
              <span className='font-bold'>© {year}. All rights reserved.</span>
              <Link to='/privacy' className='hover:underline'>
                Privacy Policy
              </Link>
              <Link to='/terms' className='hover:underline'>
                Terms of Service
              </Link>
              <button className='text-gray-900 hover:underline'>
                Cookie Setting
              </button>
            </div>
            <div className='flex flex-row items-center space-x-4'>
              <a
                href='https://facebook.com'
                className='text-gray-600 hover:text-gray-900'
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href='https://instagram.com'
                className='text-gray-600 hover:text-gray-900'
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href='https://linkedin.com'
                className='text-gray-600 hover:text-gray-900'
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href='https://youtube.com'
                className='text-gray-600 hover:text-gray-900'
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a
                href='https://youtube.com'
                className='text-gray-600 hover:text-gray-900'
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
