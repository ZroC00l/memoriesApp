import { AUTH, LOGOUT } from "../contants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    /*return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };*/
    case LOGOUT:
      /*
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };*/
      return "";
    default:
      return state;
  }
};

export default authReducer;
