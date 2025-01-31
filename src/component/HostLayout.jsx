import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dashboard from "../pages/Host/Dashboard";
import Income from "../pages/Host/Income";
import Reviews from "../pages/Host/Reviews";
import HostVans from "../pages/Host/HostVans";

const HostLayout = () => {
  return (
    <div className='max-w-[1280px] mx-auto px-6 mt-12 flex flex-col gap-8 flex-wrap'>
      <nav className='flex flex-wrap gap-12'>
        <NavLink
          to='/host'
          end
          className={({ isActive }) =>
            isActive
              ? "font-bold text-gray-800 underline hover:text-gray-600"
              : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
          }
        >
          <Dashboard />
        </NavLink>
        <NavLink
          to='/host/income'
          className={({ isActive }) =>
            isActive
              ? "font-bold text-gray-800 underline hover:text-gray-600"
              : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
          }
        >
          <Income />
        </NavLink>
        <NavLink
          to='/host/vans'
          className={({ isActive }) =>
            isActive
              ? "font-bold text-gray-800 underline hover:text-gray-600"
              : "font-semibold text-gray-800 hover:text-gray-600 hover:underline"
          }
        >
          Vans
        </NavLink>
        <NavLink
          to='/host/reviews'
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
