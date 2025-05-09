import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/logo.png'
import { UserCircle } from 'lucide-react'
import { useAuth } from '../context/useAuth.jsx'
import ButtonSet from './ButtonSet.jsx'
import SideNavBar from './SideNavBar.jsx'
import { Menu } from 'lucide-react'

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const location = useLocation()

  // function to handle Book now button click
  const handleBookNowClick = e => {
    if (location.pathname === '/') {
      e.preventDefault()
      // Use a custom event to communicate with the Home component
      const scrollEvent = new CustomEvent('scrollToVans')
      window.dispatchEvent(scrollEvent)
    }
    // Otherwise, let the link navigate to /book
  }

  return (
    <header className='bg-[#FFF7ED] w-full border-b border-black  '>
      <div className='max-w-[1280px] mx-auto px-4 md:px-6'>
        <nav className='h-[100px] flex items-center justify-between'>
          <div className='flex items-center gap-10'>
            <Link to='/'>
              <img src={logo} alt='#VANLIFE' className='w-[120px]' />
            </Link>

            <div className='hidden md:block'>
              <ul className='flex gap-8 mr-4 list-none '>
                <li className='flex items-center'>
                  <NavLink
                    to='/host'
                    className={({ isActive }) =>
                      isActive
                        ? 'font-bold text-gray-800 underline'
                        : 'font-semibold text-black hover:underline hover:text-gray-600'
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
                        ? 'font-bold text-gray-800 underline hover:text-gray-600'
                        : 'font-semibold text-gray-800 hover:text-gray-600 hover:underline'
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
                        ? 'font-bold text-gray-800 underline'
                        : 'font-semibold text-gray-800 hover:underline hover:text-gray-600'
                    }
                  >
                    Vans
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          {/* Desktop buttonset */}
          <div className='items-center hidden md:flex'>
            <ButtonSet
              button1Text='Book Now'
              button1Link='/'
              button1OnClick={handleBookNowClick}
              button2OnClick={isLoggedIn ? logout : null}
              button2Text={isLoggedIn ? 'Sign Out' : 'Sign in'}
              button2Link={isLoggedIn ? '/' : '/login'}
            />
          </div>

          {/** Mobile Hamburger Menu */}
          <button
            onClick={() => setIsSideNavOpen(!isSideNavOpen)}
            aria-label='Open menu'
            className='p-2 rounded-lg md:hidden hover:bg-gray-200 cursoer-pointer'
          >
            <Menu size={24} />
          </button>
        </nav>
      </div>
      {/* Side Navigation Model */}
      {/* <SideNavBar /> */}
      {isSideNavOpen && (
        <SideNavBar
          isOpen={isSideNavOpen}
          onClose={() => setIsSideNavOpen(!isSideNavOpen)}
        />
      )}
    </header>
  )
}

export default Navbar
