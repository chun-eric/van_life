import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

const HostLayout = () => {
  return (
    <div className='max-w-[1280px] mx-auto px-6 mt-12 flex flex-col  flex-wrap bg-white'>
      <nav className='flex flex-col gap-4 text-sm xs:gap-12 xs:flex-row xs:pl-2 pl:3'>
        <NavLink
          to='.'
          end
          className={({ isActive }) =>
            isActive
              ? "font-bold text-gray-800 underline hover:text-gray-600"
              : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to='income'
          className={({ isActive }) =>
            isActive
              ? "font-bold text-gray-800 underline hover:text-gray-600"
              : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
          }
        >
          Income
        </NavLink>
        <NavLink
          to='vans'
          className={({ isActive }) =>
            isActive
              ? "font-bold text-gray-800 underline hover:text-gray-600"
              : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
          }
        >
          Vans
        </NavLink>
        <NavLink
          to='reviews'
          className={({ isActive }) =>
            isActive
              ? "font-bold text-gray-800 underline hover:text-gray-600"
              : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
          }
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default HostLayout;
