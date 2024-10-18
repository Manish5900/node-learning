import express from "express";
import {
  createAuthor,
  deleteAuthorById,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from "../controllers/authorController.js";
import { validateAuthor } from "../middlewares/validateData.js";

const router = express.Router();

// GET all authors
router.get("/", getAllAuthors);

// Create author
router.post("/", validateAuthor, createAuthor);

// Update author by Id
router.put("/:id", validateAuthor, updateAuthor);

// Get author by Id
router.get("/:id", getAuthorById);

// Delete author by Id
router.delete("/:id", deleteAuthorById);

export default router;
