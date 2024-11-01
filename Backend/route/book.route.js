import express from 'express'; // Import express
import Book from '../book.model.js';
import { getBook } from '../controller/book.controller.js';

const router = express.Router();

router.get("/", getBook);

export default router;
