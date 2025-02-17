import React from "react";
import { X } from "lucide-react";
import ButtonSet from "./ButtonSet";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const SideNavBar = () => {
  return (
    <div
      // onClick={onClose}
      className='fixed inset-0 h-full transition-opacity bg-white z-1500'
    >
      <div className='fixed inset-y-0 right-0 z-50 w-[90%] transition-transform duration-2300 ease-in-out transform bg-white shadow-lg border border-black rounded-lg flex flex-col'>
        <div className='p-4'>
          <div className='flex items-center w-full mt-4 sm:p-4 align-items sm:mt-0'>
            <Link to='/'>
              <img
                src={logo}
                alt='Van Life Logo'
                className='md:w-[160px] sm:w-[120px] w-[80px]'
              />
            </Link>
            {/* x button */}
            <button
              // onClick={onClose}
              className='absolute p-3 rounded-full top-4 right-4 hover:bg-gray-100'
            >
              <X className='w-6 h-6' />
            </button>
          </div>
          {/* nav links */}
          <nav className='p-1 pb-8 mt-12 border-b sm:p-4'>
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
                  Vans
                </NavLink>
              </li>
              <li>
                <NavLink></NavLink>
              </li>
            </ul>
          </nav>
          <ButtonSet></ButtonSet>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
