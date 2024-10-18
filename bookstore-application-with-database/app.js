import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { log } from "./middlewares/logger.js";
import applicationRoutes from "./routes/index.js";

import connectDB from "./config/db.js";

dotenv.config();
// Dtaabase URL
const mongoURI = process.env.DATABASE_URL;

// Connect to MongoDB
connectDB(mongoURI);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));
app.use(log);

/* routes */
applicationRoutes(app);

app.listen(PORT, () =>
  console.log(`============ App is running on port ${PORT}.============`)
);
