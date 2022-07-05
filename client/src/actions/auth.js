import { AUTH } from "../contants/actionTypes";
import * as api from "../api/index";

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const result = await api.signup(formData);
    dispatch({ type: AUTH, data: result });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const response = await api.signin(formData);
    const { result, token } = response.data;
    dispatch({ type: AUTH, data: { result, token } });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
