import React from "react";
import { X } from "lucide-react";
import ButtonSet from "./ButtonSet";
import { NavLink } from "react-router-dom";

const SideNavBar = () => {
  return (
    <div
      // onClick={onClose}
      className='fixed inset-0 h-full transition-opacity bg-white z-1500'
    >
      <div className='fixed inset-y-0 right-0 z-50 w-[90%] transition-transform duration-2300 ease-in-out transform bg-white shadow-lg border border-black rounded-lg flex flex-col'>
        <div className='p-4'>
          {/* x button */}
          <button
            // onClick={onClose}
            className='absolute p-3 rounded-full top-4 right-4 hover:bg-gray-100'
          >
            <X className='w-6 h-6' />
          </button>

          {/* nav links */}
          <nav className='mt-12 '>
            <ul className='space-y-4'>
              <li>
                <NavLink
                  to='/host'
                  className='mb-3 text-4xl font-bold hover:text-orange-400 hover:underline '
                >
                  Host
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/about'
                  className='mb-3 text-4xl font-bold hover:text-orange-400 hover:underline'
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/vans'
                  className='mb-3 text-4xl font-bold hover:text-orange-400 hover:underline'
                >
                  Vants
                </NavLink>
              </li>
              <li>
                <NavLink></NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
