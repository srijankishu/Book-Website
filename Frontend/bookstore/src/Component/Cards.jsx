import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Cards = ({ item }) => {
  const [pdfName, setPdfName] = useState(null); // Store the PDF for this card
  const [allImage, setAllImage] = useState([]); // Store all PDFs from backend
  const navigate = useNavigate();

  useEffect(() => {
    const getPdf = async () => {
      try {
        const result = await axios.get("http://localhost:4001/get-files");
        setAllImage(result.data.data); // Assuming the response contains an array of PDFs
      } catch (error) {
        console.error("Error fetching PDFs:", error.response ? error.response.data : error.message);
      }
    };

    getPdf();
  }, []);

  useEffect(() => {
    // Find the assigned PDF for the current card (item)
    const associatedPdf = allImage.find((pdf) => pdf.id === item.id); // Assuming both item and PDF have an `id` field
    if (associatedPdf) {
      setPdfName(associatedPdf.pdf); // Set the PDF name for the card
    }
  }, [allImage, item.id]); // Re-run this whenever the list of PDFs or the item ID changes

  const showPdf = () => {
    if (pdfName) {
      navigate(`/pdf/${encodeURIComponent(pdfName)}`); // Navigate to the PDF view page
    } else {
      console.error("No PDF available for this item.");
    }
  };

  return (
    <div className='mt-4'>
      <div className="card bg-base-100 w-90 m-2 shadow-xl hover:scale-105 duration-200 bg-white text-black dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img src={item.image} alt="Book Cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
           
          </h2>
          <p>Genre: {item.title}</p>
          <p> Author: <span className="italic">{item.author}</span> </p>
          <div className="card-actions justify-between">
            <div className="cursor-pointer px-7 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-300 badge-outline">
              ${item.price}
            </div>
            <div>
              {pdfName ? (
                <div 
                  className="cursor-pointer px-4 py-1 rounded-full border-[2px] hover:bg-pink-500 
                  hover:text-white duration-300 badge-outline"
                  onClick={showPdf}>
                  Read
                </div>
              ) : (
                <p>No PDF available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
