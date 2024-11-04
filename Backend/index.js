import express from 'express';
// Remove dotenv import for now
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

const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", express.static("files"))

// Use a hard-coded MongoDB URI for testing
const PORT = 4001;
const URI = "mongodb://localhost:27017/bookstore"; // Replace this with your actual MongoDB URI

async function connectToDB() {
  try {
    if (!URI) throw new Error("MongoDbURI is not defined");

    await mongoose.connect(URI, {
      // Deprecated options removed
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

connectToDB();

app.get("/get-files", async (req, res) => {
  try {
    Book.find({}).then((data) => {
      res.send({
        status: "ok",
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// Storage and upload configuration
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
    const uniqueSuffix = Date.now() 
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post("/book", upload.single("file"), async (req, res) => {
  try {
    const { id, title, name, author, price, image, category } = req.body;
    const fileName = req.file.filename;
    res.status(200).send("File uploaded successfully.");

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

app.use("/book/", bookroute);
app.use("/user/", userroute);

app.get("/", async (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});
