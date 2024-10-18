import Author from "../models/authorModel.js";

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAuthor = async (req, res) => {
  const { name, biography } = req.body;
  try {
    const existingAuthor = await Author.findOne({ name });

    if (existingAuthor) {
      return res
        .status(400)
        .json({ error: "Author with this name already exists." });
    }

    const author = new Author({
      name,
      biography,
    });

    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, biography } = req.body;

  try {
    const existingAuthor = await Author.findOne({ name });

    if (existingAuthor) {
      return res
        .status(400)
        .json({ error: "Author with this name already exists." });
    }

    const author = await Author.findById(id);

    if (!author) return res.status(404).json({ message: "Author not found!" });

    // Update author details
    author.name = name || author.name;
    author.biography = biography || author.biography;

    await author.save(); // Save updated author
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findById(id);
    if (!author) return res.status(404).json({ message: "Author not found !" });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findByIdAndDelete(id);

    if (!author)
      return res
        .status(404)
        .json({ message: "This author with the given ID was not found" });

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
