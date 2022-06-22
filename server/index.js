import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";

const app = express();

//express middelware to connect to application,set the starting path for routes
app.use("/posts", postRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://Thato:Thato123@cluster0.ku883.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

await mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Server is running on port:${PORT}`))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
