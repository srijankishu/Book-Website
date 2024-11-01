/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReadBook = ({ bookId }) => {
  const [pdfPath, setPdfPath] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBookPDF = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/dpdf/${bookId}/pdf`);
        setPdfPath(res.data.pdfPath); 
      } catch (err) {
        console.error('Error fetching books:', err); 
        setError('Failed to load books. Please try again.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchBookPDF();
  }, [bookId]);

  return (
    <div className="h-screen flex flex-col justify-center items-center"> {/* Full screen container }
      <h1 className="mb-4 text-xl">Read Book</h1>
      {loading ? (
        <p>Loading PDF...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <iframe 
          src={`http://localhost:4001${pdfPath}`} 
          width="100%" 
          height="100%"  // Ensures full height
          className="border-none" // Removes iframe border
          title="PDF Viewer"
        />
      )}
    </div>
  );
};

export default ReadBook; */
