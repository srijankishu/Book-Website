import express from 'express';
import dotenv from 'dotenv';
import serveIndex from 'serve-index';
import mongoose from 'mongoose';
import bookroute from './route/book.route.js';
import userroute from './route/user.route.js';
import cors from 'cors';
import multer from 'multer';
import pdfDetails from './pdf.model.js';
import fs from 'fs';
import path from 'path';
import Book from './book.model.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", express.static("files"));

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDbURI;

// MongoDB connection
async function connectToDB() {
  try {
    if (!URI) throw new Error("MongoDbURI is not defined in .env file");

    // Connect to MongoDB without deprecated options
    await mongoose.connect(URI);
    console.log('Connected to MongoDB at URI:', URI);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

connectToDB();

// Route to get files
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

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './files';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to upload a book
app.post("/book", upload.single("file"), async (req, res) => {
  try {
    const { id, title, name, author, price, image, category } = req.body;
    const fileName = req.file.filename;

    await Book.create({
      id,
      name,
      author,
      title,
      price,
      image,
      category,
      pdf: fileName
    });

    res.status(200).send("File uploaded successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error uploading file");
  }
});

// Route to delete a book by ID
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

// Additional routes
app.use("/book/", bookroute);
app.use("/user/", userroute);

app.get("/", (req, res) => {
  res.send("Hello");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});
