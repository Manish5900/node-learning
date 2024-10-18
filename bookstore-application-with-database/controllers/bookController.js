import Book from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author category");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBook = async (req, res) => {
  const { title, author, category, publishedYear, summary } = req.body;

  try {
    const existingBook = await Book.findOne({ title });

    if (existingBook) {
      return res
        .status(400)
        .json({ error: "Book with same title already exists." });
    }

    const book = new Book({
      title,
      author,
      category,
      publishedYear,
      summary,
    });

    await book.save();

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, category, publishedYear, summary } = req.body;

  try {
    const existingBook = await Book.findOne({ title });

    if (existingBook) {
      return res
        .status(400)
        .json({ error: "Book with same title already exists." });
    }

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found!" });

    book.title = title || book.title;
    book.author = author || book.author;
    book.category = category || book.category;
    book.publishedYear = publishedYear || book.publishedYear;
    book.summary = summary || book.summary;

    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).populate("author category");
    if (!book) return res.status(404).json({ message: "Book not found!" });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: "Book not found!" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
