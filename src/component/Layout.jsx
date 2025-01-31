import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className='flex-1 min-h-[100vh]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
