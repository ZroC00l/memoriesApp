import * as api from "../api"; // we import our http calls this way because we have a lot of methods exported from api

//Now are action creators, these are functions that return actions

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log({ message: error.message });
  }
};
