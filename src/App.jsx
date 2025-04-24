import './index.css'

import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Vans from './pages/Vans/Vans.jsx'
import VanDetails from './pages/Vans/VanDetails.jsx'
import Layout from './component/Layout.jsx'
import Income from './pages/Host/Income.jsx'
import Reviews from './pages/Host/Reviews.jsx'
import HostLayout from './component/HostLayout.jsx'
import AuthRequired from './component/AuthRequired.jsx'
import Dashboard from './pages/Host/Dashboard.jsx'
import HostVans from './pages/Host/HostVans.jsx'
import HostVanDetail from './pages/Host/HostVanDetail.jsx'
import HostVanInfo from './pages/Host/HostVanInfo.jsx'
import HostVanPricing from './pages/Host/HostVanPricing.jsx'
import HostVanPhotos from './pages/Host/HostVanPhotos.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'
import { AuthProvider } from './context/AuthProvider'
import Booking from './pages/Vans/Booking.jsx'
import BookingConfirmation from './pages/Vans/BookingConfirmation.jsx'

function App () {
  return (
    <AuthProvider>
      <div className='flex flex-col min-h-screen'>
        {/* Added main wrapper */}
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />

            {/** Navbar Routes */}
            <Route path='/about' element={<About />} />
            <Route path='/vans' element={<Vans />} />
            <Route path='/vans/:id' element={<VanDetails />} />

            {/*  Login */}
            <Route path='/login' element={<Login />} />

            {/** Host Layout Routes */}
            <Route element={<AuthRequired />}>
              <Route path='/host' element={<HostLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='income' element={<Income />} />
                <Route path='reviews' element={<Reviews />} />
                <Route path='vans' element={<HostVans />} />
                <Route path='vans/:id/' element={<HostVanDetail />}>
                  <Route index element={<HostVanInfo />} />
                  <Route path='pricing' element={<HostVanPricing />} />
                  <Route path='photos' element={<HostVanPhotos />} />
                </Route>
              </Route>
            </Route>

            {/* Booking Routes */}
            <Route element={<AuthRequired />}>
              <Route path='/vans/:id/book' element={<Booking />} />
              <Route
                path='/vans/:id/book/confirmation'
                element={<BookingConfirmation />}
              />
            </Route>

            {/* A catch all route - 404 page */}
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
