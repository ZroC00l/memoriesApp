import express, { Router } from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
//router.get("/:id", getPost);
router.patch("/:id", updatePost); //patch is used for updating  existing documents,id parameter is dynamic, it allows for post identification
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;
