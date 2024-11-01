import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Link } from 'react-router-dom'

function Pdfcomp({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className='flex flex-col justify-center items-center  dark:bg-gray-900 border-none min-h-screen overflow-auto'> {/* Allow scrolling if needed */}
      <Link to="/">
        <button className='bg-pink-500 mt-4 px-4 py-2 rounded-md text-white hover:bg-pink-700 duration-300'>Back</button>
        </Link>
      <p className='text-xl p-4 font-bold text-center dark:text-white text-white'>
        Page {pageNumber} of {numPages || 'Loading...'}
      </p>

      {pdfFile ? (
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {numPages && Array.from({ length: numPages }, (x, i) => (
            <div key={i} className='mb-5 border border-2 border-pink-500 border-large bg-pink w-full max-w-screen-md overflow-hidden  dark:text-white '> {/* Limit width for better responsiveness */}
              <Page
                pageNumber={i + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                width={600}
                className='mx-auto w-full  '
              />
            </div>
          ))}
        </Document>
      ) : (
        <p className='dark:text-white text-black'>No PDF file selected</p>
      )}
    </div>
  );
}

export default Pdfcomp;
