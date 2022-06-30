import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "40mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "40mb", extended: true }));
app.use(cors());

//express middelware to connect to application,set the starting path for routes
app.use("/posts", postRoutes);

const CONNECTION_URL =
  "mongodb+srv://Thato:Thato123@cluster0.ku883.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

await mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running on port:http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
