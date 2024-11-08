// PdfViewer.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Pdfcomp from './Pdfcomp';

const PdfViewer = () => {
  const { pdfPath } = useParams(); // Get the PDF path from the URL
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    if (pdfPath) {
      setPdfFile(`http://localhost:4001/files/${decodeURIComponent(pdfPath)}`); // Construct the PDF URL
    }
  }, [pdfPath]);

  return (
    <div>
      <h1 className="text-lg font-bold text-center dark:bg-gray-900 dark:text-white text-black dark:border-white">Enjoy!</h1>
      <Pdfcomp pdfFile={pdfFile} />
    </div>
  );
};

export default PdfViewer;
