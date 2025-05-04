import React from 'react'
import ExpandingImages from '../Components/About/ExpandingImages'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Hero from '../Components/About/Hero'

const About = () => {
  return (
    <>
        <Navbar/>
        <div className='mt-16'>
          <Hero/>
        <ExpandingImages/>
        </div>
        <Footer/>
    </>
  )
}

export default About