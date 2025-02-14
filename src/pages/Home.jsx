// import { Link } from "react-router-dom";
// import HeroBackground from "../assets/image-54.png";
import CallToAction from "../component/CallToAction";
import Hero from "../component/Hero";
import Testimonials from "../component/Testimonials";
import Vans from "../pages/Vans/Vans";

const Home = () => {
  return (
    <>
      <Hero />
      <Vans />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default Home;
