import React from 'react'
import Footer from '../Footer'
import Contact from "../Contact"
import Navbar from '../Navbar'

const Contacts = () => {
  return (
    <div>
     <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="mt-16 min-h-screen ">
        <Contact />
      </div>
      <Footer/>
    </div>
  )
}

export default Contacts
