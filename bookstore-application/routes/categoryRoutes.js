import express from "express";
import { validateBookCategory } from "../middlewares/validateBook.js";

const router = express.Router();

const bookCategories = [
  {
    id: 1,
    name: "Science Friction",
    description:
      "Science fiction is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts",
  },
  {
    id: 2,
    name: "Autobiography",
    description: "Autobiography, the biography of oneself narrated by oneself",
  },
];

// GET all authors
router.get("/", (req, res) => {
  res.send(bookCategories);
});

// Create author
router.post("/", (req, res) => {
  const { error } = validateBookCategory(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const category = {
    id: bookCategories.length + 1,
    name: req.body.name,
    description: req.body.description,
  };
  bookCategories.push(category);
  res.send(bookCategories);
});

// Update author by Id
router.put("/:id", (req, res) => {
  const category = bookCategories.find((c) => c.id === parseInt(req.params.id));
  if (!category) res.status(404).send("This category is not exist.");

  const { error } = validateBookCategory(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  category.name = req.body.name;
  category.description = req.body.description;
  res.send(category);
});

// Get author by Id
router.get("/:id", (req, res) => {
  const category = bookCategories.find((c) => c.id === parseInt(req.params.id));
  if (!category) res.status(404).send("This category is not available.");
  res.send(category);
});

// Delete one author by Id
router.delete("/:id", (req, res) => {
  const categoryIndex = bookCategories.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );
  if (categoryIndex === -1) {
    res.status(404).send("This category with the given ID was not found");
  }
  const deletedAuthor = bookCategories.splice(categoryIndex, 1);
  if (deletedAuthor[0]) {
    res.send("Category deleted Successfully");
  }
});

export default router;
