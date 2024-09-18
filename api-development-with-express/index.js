import express from "express";
import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

const books = [
  {
    id: 1,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    year: "2011",
    genre: "Biography",
  },
  {
    id: 2,
    title: "The Book Thief",
    author: "Markus Zusak",
    year: "2005",
    genre: "Fiction",
  },
  {
    id: 3,
    title: "John Adams",
    author: "David McCullough",
    year: "2001",
    genre: "History",
  },
];

function validateBookData(book) {
  const schema = Joi.object({
    title: Joi.string().max(100).required(),
    author: Joi.string().max(50).required(),
    year: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required(),
    genre: Joi.string().max(30),
  });

  return schema.validate(book);
}

app.get("/api/books", (req, res) => {
  res.send(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  if (!book) res.status(404).send("This book is not available");
  res.send(book);
});

app.post("/api/books", (req, res) => {
  const { error } = validateBookData(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    genre: req.body.genre,
  };
  books.push(book);
  res.send(books);
});

app.put("/api/books/:id", (req, res) => {
  const book = books.find((c) => c.id === parseInt(req.params.id));
  if (!book) res.status(404).send("This book is not available");

  const { error } = validateBookData(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  book.title = req.body.title;
  book.author = req.body.author;
  book.year = req.body.year;
  book.genre = req.body.genre;
  res.send(book);
});

app.delete("/api/books/:id", (req, res) => {
  const bookIndex = books.findIndex((c) => c.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    res.status(404).send("The book with the given ID was not found");
  }
  const deletedbook = books.splice(bookIndex, 1);
  res.send(deletedbook[0]);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
