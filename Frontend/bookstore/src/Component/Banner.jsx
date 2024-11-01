import React from 'react';
import image from '../image/banner.png';

export const Banner = () => {
  return (
    <>
      <div className="w-full md:px-20 px-4 flex flex-col md:flex-row">
        <div className="order-2 md:order-1 md:w-1/2 mt-20 md:mt-20">
        <div className="mt-2 md:mt-3 lg:mt-10 space-y-12">
            <h1 className="text-4xl font-bold dark:text-white text-black">
              A Universe of Books at Your Fingertips :{' '}
              <span className="text-pink-500">Start Your Journey</span>
            </h1>
            <p className="text-xl dark:text-white text-black">
            Get lost in tales that inspire and characters that live beyond the page. Dive deep into genres that excite and stories that linger. BookVerse—where your story adventure begins!
            </p>
            <label className="px-3 py-2 border rounded-md flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 text-black dark:text-white"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow outline-none dark:text-white text-black dark:bg-slate-800 bg-white"
                placeholder="Email"
              />
            </label>
          </div>
          <button className="mt-6 btn text-white btn-secondary">Get Started</button>
        </div>

        <div className="md:order-1 md:w-1/2 mt-20 md:p-1">
  <img src={image} className="w-full h-auto" alt="Banner" />
</div>
      </div>
    </>
  );
};

export default Banner;
