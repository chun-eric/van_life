import "./index.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import "./server.js";
import Vans from "./pages/Vans.jsx";

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1'>
        {" "}
        {/* Added main wrapper */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/vans' element={<Vans />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
