import axios from "axios";

const url = "https://memory-silo.herokuapp.com/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

export const signin = () =>
  axios.post("https://memory-silo.herokuapp.com/auth/signin", {
    email: "",
    password: "",
  });

export const signup = () =>
  axios.post("https://memory-silo.herokuapp.com/auth/signup", {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
