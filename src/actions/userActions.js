import axios from "axios";
import types from "./types";

export const authUser = () => async dispatch => {
  const res = await axios.get("/api/v1/current_user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  dispatch({ type: types.AUTH_USER, payload: res.data });
};

export const signUp = data => async dispatch => {
  const res = await axios.post("/api/v1/sign_up", data);
  localStorage.setItem("token", res.data.token);
  dispatch({ type: types.SIGN_UP_USER, payload: res.data.user });
};

export const signIn = data => async dispatch => {
  const res = await axios.post("/api/v1/sign_in", data);
  localStorage.setItem("token", res.data.token);
  dispatch({ type: types.SIGN_IN_USER, payload: res.data.user });
};

export const signOut = () => dispatch => {
  localStorage.removeItem("token");
  dispatch({ type: types.SIGN_OUT_USER, payload: null });
};

export const changeCurrentAccount = data =>  async dispatch => {
  try {
    dispatch({ type: "CHANGE_CURRENT_ACCOUNT_BEGIN" });
    const res = await axios({
      method: "PUT",
      url: "/api/v1/current_account",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      data: data
    })
    
    dispatch({ type: "CHANGE_CURRENT_ACCOUNT_SUCCESS", payload: res.data })
  } catch(err) {
    dispatch({ type: "CHANGE_CURRENT_ACCOUNT_FAILURE", payload: err })
  }
};
