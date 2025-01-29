import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <header className='bg-[#FFF7ED] w-full '>
      <div className='max-w-[1280px] mx-auto px-4 md:px-6'>
        <nav className=' h-[100px] flex items-center justify-between '>
          <Link to='/'>
            <img src={logo} alt='#VANLIFE' className='w-[120px]' />
          </Link>

          <div className='flex flex-row gap-4'>
            <ul className='flex gap-8 list-none mr-4 '>
              <li>
                <Link
                  to='/about'
                  className='text-gray-800 font-semibold hover:underline '
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to='/vans'
                  className='text-gray-800 font-semibold hover:underline'
                >
                  Vans
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
