import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/",
});

//const url = "https://memory-silo.herokuapp.com/posts";

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = () =>
  axios.post("http://localhost:3000/auth", {
    email: "",
    password: "",
  });

export const signup = () =>
  axios.post("http://localhost:3000/auth", {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
