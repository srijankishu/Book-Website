import React from 'react';
import Navbar from '../Component/Navbar';
import Course from '../Component/Course';
import Footer from '../Component/Footer';

const Courses = () => {
  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Content Area */}
      <div className="min-h-screen ">
        <Course />
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Courses;
