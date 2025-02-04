import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <header className='bg-[#FFF7ED] w-full '>
      <div className='max-w-[1280px] mx-auto px-4 md:px-6'>
        <nav className=' h-[100px] flex items-center justify-between '>
          <Link to='/'>
            <img src={logo} alt='#VANLIFE' className='w-[120px]' />
          </Link>

          <div className=''>
            <ul className='flex gap-8 mr-4 list-none '>
              <li>
                <NavLink
                  to='/host'
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-gray-800 underline"
                      : "font-semibold text-gray-800 hover:underline hover:text-gray-600"
                  }
                >
                  Host
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/about'
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-gray-800 underline hover:text-gray-600"
                      : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/vans'
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-gray-800 underline"
                      : "font-semibold text-gray-800 hover:underline hover:text-gray-600"
                  }
                >
                  Vans
                </NavLink>
              </li>
              <li>
                <Link to='/login'>
                  <UserCircle className='w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800' />
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
