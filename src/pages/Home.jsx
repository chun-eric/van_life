// import { Link } from "react-router-dom";
// import HeroBackground from "../assets/image-54.png";
import { useRef, useEffect } from 'react'

import CallToAction from '../component/CallToAction'
import Hero from '../component/Hero'
import Testimonials from '../component/Testimonials'
import Vans from '../pages/Vans/Vans'

const Home = () => {
  const vansRef = useRef(null)

  useEffect(() => {
    const handleScrollToVans = () => {
      if (vansRef.current) {
        vansRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }

    // Add event listener for the custom event
    window.addEventListener('scrollToVans', handleScrollToVans)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scrollToVans', handleScrollToVans)
    }
  }, [])

  return (
    <>
      <Hero vansRef={vansRef} />
      <div id='vans-section' ref={vansRef}>
        <Vans />
      </div>
      <Testimonials />
      <CallToAction />
    </>
  )
}

export default Home
