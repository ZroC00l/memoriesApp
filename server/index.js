import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const express = express();

const CONNECTION_URL =
  "mongodb+srv://Thato:Thato123@cluster0.ku883.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 6000;
mongoose
  .connect(CONNECTION_URL)
  .then(() => console.log("Server is running on port:${PORT}"))
  .catch((error) => console.log(error.message));
