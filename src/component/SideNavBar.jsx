import { useState, useEffect } from "react";
import { X } from "lucide-react";
import ButtonSet from "./ButtonSet";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/useAuth";

const SideNavBar = ({ isOpen, onClose }) => {
  const { isLoggedIn, logout } = useAuth();

  const navigationLinks = [
    { to: "/host", text: "Host" },
    { to: "/about", text: "About" },
    { to: "/vans", text: "Vans" },
  ];

  return (
    <div
      className='fixed inset-0 h-full transition-opacity bg-white z-2500'
      style={{ zIndex: 9999 }}
    >
      {/** overlay and close */}
      <div
        className='fixed inset-0 transition-opacity duration-300 bg-black/80'
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 w-[90%] transition-transform duration-300 ease-in-out transform bg-white shadow-lg border border-black rounded-lg flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='p-4'>
          <div className='flex items-center w-full mt-4 sm:p-4 align-items sm:mt-0'>
            <Link to='/'>
              <img
                src={logo}
                alt='Van Life Logo'
                className='md:w-[160px] sm:w-[120px] w-[100px] transition-transform duration-200 hover:scale-105'
              />
            </Link>
            {/* x button */}
            <button
              // onClick={onClose}
              className='absolute p-3 transition-all duration-200 rounded-full top-4 right-4 hover:bg-gray-100 hover:rotate-90'
            >
              <X className='w-6 h-6' onClick={onClose} />
            </button>
          </div>
          {/* nav links */}
          <nav className='p-1 pb-8 mt-12 border-b border-black sm:p-4'>
            <ul className='mb-6 space-y-4 font-bold '>
              {navigationLinks.map(({ to, text }, index) => (
                <li
                  key={to}
                  style={{
                    animation: `slideIn 0.3s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                    transform: "translateX(20px)",
                  }}
                >
                  <NavLink
                    to={to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `text-4xl font-bold transition-all duration-200
                      hover:text-orange-400 hover:underline hover:translate-x-2 inline-block
                      ${isActive ? "text-orange-400 underline" : ""}`
                    }
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className='flex flex-col mt-10 ml-4 animate-fadeInDelay'>
            <ButtonSet
              button1Text='Book'
              button1Link='/book'
              button2OnClick={
                isLoggedIn
                  ? () => {
                      logout();
                      onClose();
                    }
                  : null
              }
              button2Text={isLoggedIn ? "Sign Out" : "Sign in"}
              button2Link={isLoggedIn ? "/" : "/login"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
