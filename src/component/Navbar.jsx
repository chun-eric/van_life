import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserCircle } from "lucide-react";
import { useAuth } from "../context/useAuth.jsx";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className='bg-[#FFF7ED] w-full '>
      <div className='max-w-[1280px] mx-auto px-4 md:px-6'>
        <nav className=' h-[100px] flex items-center justify-between '>
          <Link to='/'>
            <img src={logo} alt='#VANLIFE' className='w-[120px]' />
          </Link>

          <div className='flex items-center'>
            <ul className='flex gap-8 mr-4 list-none '>
              <li className='flex items-center'>
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
              <li className='flex items-center'>
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
              <li className='flex items-center'>
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
              <li className='flex items-center'>
                <Link to='/login'>
                  <UserCircle className='w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800' />
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <button
                    className='px-6 py-3 text-sm font-semibold text-center text-white capitalize bg-black rounded z-2'
                    onClick={logout}
                  >
                    {isLoggedIn ? "Log out" : "Log in"}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
