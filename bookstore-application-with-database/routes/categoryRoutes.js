import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import { validateBookCategory } from "../middlewares/validateData.js";

const router = express.Router();

// GET all Categories
router.get("/", getAllCategory);

// Create category
router.post("/", validateBookCategory, createCategory);

// Update category by Id
router.put("/:id", validateBookCategory, updateCategory);

// Get category by Id
router.get("/:id", getCategoryById);

// Delete category by Id
router.delete("/:id", deleteCategoryById);

export default router;
