import express from "express";
import { validateAuthor } from "../middlewares/validateBook.js";

const router = express.Router();

const authors = [
  {
    id: 1,
    name: "Steve Jobs",
    biography:
      "Steve Jobs was a charismatic pioneer of the personal computer era. With Steve Wozniak, Jobs founded Apple Inc. in 1976 and transformed the company into a world leader in telecommunications. Widely considered a visionary and a genius, he oversaw the launch of such revolutionary products as the iPod and the iPhone.",
  },
  {
    id: 2,
    name: "Rabindranath Tagore",
    biography:
      "Rabindranath Tagore is best known as a poet, and in 1913 was the first non-European writer to be awarded the Nobel Prize for Literature.",
  },
];

// GET all authors
router.get("/", (req, res) => {
  res.send(authors);
});

// Create author
router.post("/", (req, res) => {
  const { error } = validateAuthor(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const author = {
    id: authors.length + 1,
    name: req.body.name,
    biography: req.body.biography,
  };
  authors.push(author);
  res.send(authors);
});

// Update author by Id
router.put("/:id", (req, res) => {
  const author = authors.find((c) => c.id === parseInt(req.params.id));
  if (!author) res.status(404).send("This author is not in the list");

  const { error } = validateAuthor(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  author.name = req.body.name;
  author.biography = req.body.biography;
  res.send(author);
});

// Get author by Id
router.get("/:id", (req, res) => {
  const author = authors.find((c) => c.id === parseInt(req.params.id));
  if (!author) res.status(404).send("This author is not available");
  res.send(author);
});

// Delete one author by Id
router.delete("/:id", (req, res) => {
  const authorIndex = authors.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );
  if (authorIndex === -1) {
    res.status(404).send("This author with the given ID was not found");
  }
  const deletedAuthor = authors.splice(authorIndex, 1);
  if (deletedAuthor[0]) {
    res.send("Author deleted Successfully");
  }
});

export default router;
