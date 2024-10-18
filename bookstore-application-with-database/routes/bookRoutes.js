import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/bookController.js";
import { validateBookData } from "../middlewares/validateData.js";

const router = express.Router();

// Get all books
router.get("/", getAllBooks);

// Create book
router.post("/", validateBookData, createBook);

// Get book by Id
router.get("/:id", getBookById);

// Update a book by Id
router.put("/:id", validateBookData, updateBook);

// Delete a book by Id
router.delete("/:id", deleteBook);

export default router;
