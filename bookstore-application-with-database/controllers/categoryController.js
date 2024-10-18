import Category from "../models/categoryModel.js";

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res
        .status(400)
        .json({ error: "Book category with same name already exists." });
    }

    const category = new Category({
      name,
      description,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res
        .status(400)
        .json({ error: "Book category with same name already exists." });
    }

    const category = await Category.findById(id);

    if (!category)
      return res.status(404).json({ message: "Book category not found!" });

    // Update category details
    category.name = name || category.name;
    category.description = description || category.description;

    await category.save(); // Save updated category
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ message: "Book category not found !" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category)
      return res.status(404).json({
        message: "This book category with the given ID was not found",
      });

    res.status(200).json({ message: "Book category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
