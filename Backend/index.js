import express from 'express';
import dotenv from 'dotenv';
import serveIndex from 'serve-index';
import mongoose from 'mongoose';
import bookroute from './route/book.route.js';
import userroute from './route/user.route.js';
import cors from 'cors'; 
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import Book from './book.model.js';

dotenv.config(); // Load environment variables
const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", express.static("files"));

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDbURI || "mongodb://localhost:27017/bookstore"; // Fallback for local testing

async function connectToDB() {
  console.log("Attempting to connect to MongoDB at URI:", URI); // Log URI
  try {
    if (!URI) throw new Error("MongoDbURI is not defined");

    await mongoose.connect(URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

connectToDB();

app.get("/get-files", async (req, res) => {
  try {
    const data = await Book.find({});
    res.send({
      status: "ok",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './files';
    
    // Ensure the folder exists or create it
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post("/book", upload.single("file"), async (req, res) => {
  try {
    console.log(req.file); // Log the uploaded file details
    const { id, title, name, author, price, image, category } = req.body;
    const fileName = req.file.filename;
    
    await Book.create({
      id: id,
      name: name,
      author: author,
      title: title,
      price: price,
      image: image,
      category: category,
      pdf: fileName
    });

    res.status(200).send("File uploaded successfully.");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error uploading file");
  }
});

app.post("/deleteBook", async (req, res) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid ID format');
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).send('Book not found');
    }

    res.status(200).send('Book deleted successfully');
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).send('Error deleting book');
  }
});

// Use routes for books and users
app.use("/book/", bookroute);
app.use("/user/", userroute);

app.get("/", (req, res) => {
  res.send("Hello");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});
