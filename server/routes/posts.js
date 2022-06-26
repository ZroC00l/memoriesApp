import express, { Router } from "express";
import { getPosts, createPost, updatePost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost); //patch is used for updating  existing documents,id parameter is dynamic, it allows for post identification

export default router;
