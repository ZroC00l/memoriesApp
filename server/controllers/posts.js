import express from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

const router = express.Router();

//Handlers for all our routes
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  //paramter to get our user info from the from
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  //we are checking if the id is valid meaning is it a moongoose id
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id:${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post successfully deleted" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  //check if user is authenticated before they can perform as specific action
  if (!req.userId) {
    return res
      .status(401)
      .json({ message: "You must be logged in to perform this action" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  /*check if user id is in the like section or not if the user already 
  liked the post clicking on it negates the like action*/
  const index = post.likes.findIndex((id) => id === String(req.userId));

  //means the user has not liked the post yet so we add the user id to the likes section
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    //means the user has liked the post so we remove the user id from the likes section
    //post.likes.splice(index, 1);
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export default router;
