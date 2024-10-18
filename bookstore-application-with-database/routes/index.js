import express from "express";
import booksRouter from "./bookRoutes.js";
import categoryRouter from "./categoryRoutes.js";
import authorRouter from "./authorRoutes.js";

const app = express();
export default function applicationRoutes(app) {
  app.use("/api/books", booksRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/authors", authorRouter);

  app.get("/", (req, res) => {
    res.send("API is working!");
  });
}
