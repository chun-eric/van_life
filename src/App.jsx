import "./index.css";

import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import "./server.js";
import Vans from "./pages/Vans/Vans.jsx";
import VanDetails from "./pages/Vans/VanDetails.jsx";
import Layout from "./component/Layout.jsx";

import Income from "./pages/Host/Income.jsx";
import Reviews from "./pages/Host/Reviews.jsx";
import HostLayout from "./component/HostLayout.jsx";
import Dashboard from "./pages/Host/Dashboard.jsx";
import HostVans from "./pages/Host/HostVans.jsx";
import HostVanDetail from "./pages/Host/HostVanDetail.jsx";

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Added main wrapper */}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          {/** Navbar Routes */}
          <Route path='/about' element={<About />} />
          <Route path='/vans' element={<Vans />} />
          <Route path='/vans/:id' element={<VanDetails />} />

          {/** Host Layout Routes */}
          <Route path='/host' element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='income' element={<Income />} />
            <Route path='vans' element={<HostVans />} />
            <Route path='vans/:id' element={<HostVanDetail />} />
            <Route path='reviews' element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
