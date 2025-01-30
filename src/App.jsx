import "./index.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import "./server.js";
import Vans from "./pages/Vans.jsx";
import VanDetails from "./pages/VanDetails.jsx";

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1'>
        {/* Added main wrapper */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/vans' element={<Vans />} />
          <Route path='/vans/:id' element={<VanDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
