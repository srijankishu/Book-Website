import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import list from "../Component/List/list.json";
import './Css/Style.css';
import axios from 'axios';

const Freebook = () => {
  const[book,setbook] = useState([]);
  useEffect(() =>{
    const getBook = async () => {
    try{
      const res = await axios.get('http://localhost:4001/book');
     
      const xx = res.data.filter((data) => data.category === "Free");
      console.log(xx);
      setbook(xx);

    }catch(error){
       console.log(error);
    }
  };
  getBook();
  },[])
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
    const filterData = list.filter((data) => data.category === "Free");
  return (
    <>
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
      <div>
      <h1 className='mt-5 font-semibold text-xl pb-2 dark:text-white text-black'>Free offered courses</h1>
      <p className='text-black dark:text-white p-2'>Access a wide range of books at no cost. Your learning adventure awaits! </p>
      </div>
      <div>
      <Slider {...settings}>
        {book.map((item) =>(
          <Cards item = {item} key = {item.id}/>
        ))}
      </Slider>
      </div>
       
    </div>
    
    </>
    
  )
}

export default Freebook;
