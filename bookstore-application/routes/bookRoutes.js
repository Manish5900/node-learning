import express from "express";
import { validateBookData } from "../middlewares/validateBook.js";

const router = express.Router();

const books = [
  {
    id: 1,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    publishedYear: "2011",
    category: "Biography",
    summary:
      "Steve Jobs was a charismatic pioneer of the personal computer era. With Steve Wozniak, Jobs founded Apple Inc. in 1976 and transformed the company into a world leader in telecommunications. Widely considered a visionary and a genius, he oversaw the launch of such revolutionary products as the iPod and the iPhone.",
  },
  {
    id: 2,
    title: "The Book Thief",
    author: "Markus Zusak",
    publishedYear: "2005",
    category: "Science Friction",
    summary:
      "The Book Thief is a story narrated by a compassionate Death who tells us about Liesel, a girl growing up in Germany during World War II. She steals books, learns to read, and finds comfort in words. She and Max, the Jew her family protects, are the only main characters that survive the war.",
  },
  {
    id: 3,
    title: "John Adams",
    author: "David McCullough",
    publishedYear: "2001",
    category: "History",
    summary:
      "Stated simply, “John Adams” is an extraordinary epic and a wonderfully told story of John Adams' life. I can only wonder whether McCullough's biographical talents could be similarly effective with the less riveting life of Calvin Coolidge.",
  },
];

router.get("/", (req, res) => {
  res.send(books);
});

router.get("/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  if (!book) res.status(404).send("This book is not available");
  res.send(book);
});

router.post("/", (req, res) => {
  const { error } = validateBookData(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear,
    category: req.body.category,
  };
  books.push(book);
  res.send(books);
});

router.put("/api/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  if (!book) res.status(404).send("This book is not available");

  const { error } = validateBookData(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  book.title = req.body.title;
  book.author = req.body.author;
  book.publishedYear = req.body.publishedYear;
  book.category = req.body.category;
  res.send(book);
});

router.delete("/api/books/:id", (req, res) => {
  const bookIndex = books.findIndex((c) => c.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    res.status(404).send("The book with the given ID was not found");
  }
  const deletedbook = books.splice(bookIndex, 1);
  if (deletedbook[0]) {
    res.send("Book deleted Successfully");
  }
});

export default router;
