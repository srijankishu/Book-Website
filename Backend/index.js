import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookroute from './route/book.route.js';
import userroute from './route/user.route.js';
import cors from 'cors'; 
import multer from 'multer';
import fs from 'fs';
import Book from './book.model.js';

const app = express();
dotenv.config(); // Load environment variables
app.use(cors());
app.use(express.json());
app.use("/files", express.static("files"));

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDbURI || "mongodb://localhost:27017/bookstore"; // Default URI if env variable fails

console.log("Connecting to MongoDB at URI:", URI);

async function connectToDB() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

connectToDB();

// Define your routes and other middleware below as you have
app.get("/get-files", async (req, res) => {
  // Existing code for this route
});

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

app.post("/book", upload.single("file"), async (req, res) => {
  // Existing code for this route
});

app.post("/deleteBook", async (req, res) => {
  // Existing code for this route
});

app.use("/book/", bookroute);
app.use("/user/", userroute);

app.get("/", async (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});
