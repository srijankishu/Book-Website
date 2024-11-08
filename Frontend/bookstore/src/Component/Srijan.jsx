import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Srijan = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  const [allImage, setAllImage] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:4001/get-files");
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error.response ? error.response.data : error.message);
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    if (!file) {
      alert('Please upload a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('title', title);
    formData.append('file', file);
    formData.append('author', author);
    formData.append('price', price);
    formData.append('image', img);
    formData.append('category', category);

    try {
      await axios.post("http://localhost:4001/book", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      getPdf();  
    } catch (error) {
      console.error("Error uploading file:", error.response ? error.response.data : error.message);
    }
  };

  const showPdf = (pdf) => {
    navigate(`/pdf/${encodeURIComponent(pdf)}`); // Navigate to the PdfViewer route with the PDF path
  };


  const DeleteUser = async (id) => {
    if (typeof id !== 'string' || id.length !== 24) {
      console.error("Invalid ID format");
      return;
    }

    const confirmation = window.confirm("Are you sure you want to delete this book? This action cannot be undone.");
    
    if (!confirmation) {
      console.log("Deletion cancelled");
      return; 
    }
  
    try {
      await axios.post("http://localhost:4001/deleteBook", { id });
      console.log("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting book:", error.response ? error.response.data : error.message);
    }
  
    getPdf(); 
  };
  

  return (
    <div>
      <div className='flex flex-col m-5 justify-center onsub'>
        <form className="flex flex-col items-center gap-3 border border-black p-5 rounded mx-auto" onSubmit={submitImage}>
          <h1 className="text-lg font-bold">Admin Panel</h1>




          <input
            type="text"
            className='border border-black p-2 rounded outline-none w-full'
            placeholder='Id'
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
           
          <input
            type="text"
            className='border border-black p-2 rounded outline-none w-full'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
         
         <input
            type="text"
            className='border border-black p-2 rounded outline-none w-full'
            placeholder='Author name'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          
          <input
            type="text"
            className='border border-black p-2 rounded outline-none w-full'
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          
          <input
            type="text"
            className='border border-black p-2 rounded outline-none w-full'
            placeholder='Image'
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />

          <input
            type="text"
            className='border border-black p-2 rounded outline-none w-full'
            placeholder='Category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
 


          <input
            type="text"
            className='border border-black p-2 rounded outline-none w-full'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="file"
            className='form-control w-full'
            accept='application/pdf'
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit" className='btn btn-primary'>
            Submit
          </button>

          
        </form>

        

        <div className='flex flex-col m-5 mx-auto items-center upload'>
          <h1>Upload Here!</h1>
          <div className='flex flex-row gap-x-6 justify-center'>
            {allImage.length === 0 ? (
              <p>No PDFs available</p>
            ) : (
              allImage.map((data) => (
                <div className="inner" key={data.id}>
                  <h6>Id: {data.id}</h6>
                  <h6>Title: {data.title}</h6>
                  <h6>Author: {data.author}</h6>
                  <h6>Name: {data.name}</h6>
                  <h6>Price: {data.price}</h6>
                  <h6>Category: {data.category}</h6>
                  <h6>Image: {data.img}</h6>
                <div className='space-y-2'>
                  <button type="button" className='btn btn-primary' onClick={() => showPdf(data.pdf)}>
                    View PDF
                  </button>
                  <button type="submit" className='btn bg-red btn-primary' onClick={()=> DeleteUser(data._id)}>
                  DELETE
                 </button>
                 </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Srijan;
