import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "40mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "40mb", extended: true }));
app.use(cors());

//express middelware to connect to application,set the starting path for routes
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello to memories api");
});

const PORT = process.env.PORT || 5000;

await mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running on port:http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
