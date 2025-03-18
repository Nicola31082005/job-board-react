import express from "express";
import routes from "./routes.js";
import "dotenv/config";
import db from "./config/db.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(routes);

// Connect with db
db();

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is listening on port: ${PORT}`)
);
