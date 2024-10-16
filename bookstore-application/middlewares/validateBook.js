import Joi from "joi";

export function validateBookData(book) {
  const schema = Joi.object({
    title: Joi.string().max(100).required(),
    author: Joi.string().max(50).required(),
    publishedYear: Joi.number()
      .integer()
      .max(new Date().getFullYear())
      .required(),
    category: Joi.string().max(30),
    summary: Joi.string().max(200),
  });

  return schema.validate(book);
}

export function validateAuthor(author) {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(200),
  });

  return schema.validate(author);
}

export function validateBookCategory(category) {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    biography: Joi.string().max(200),
  });

  return schema.validate(category);
}
