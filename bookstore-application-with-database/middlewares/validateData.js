import Joi from "joi";

export function validateBookData(req, res, next) {
  const bookSchema = Joi.object({
    title: Joi.string().max(100).required(),
    author: Joi.string().max(50).required(),
    publishedYear: Joi.number()
      .integer()
      .max(new Date().getFullYear())
      .required(),
    category: Joi.string().max(30),
    summary: Joi.string().max(200),
  });
  const { error } = bookSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
}

export function validateAuthor(req, res, next) {
  const authorSchema = Joi.object({
    name: Joi.string().max(100).required(),
    biography: Joi.string().max(250),
  });

  const { error } = authorSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  next();
}

export function validateBookCategory(req, res, next) {
  const bookCategorySchema = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(200),
  });

  const { error } = bookCategorySchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  next();
}
