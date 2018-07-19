import axios from "axios";
import types from "./types";

export const getAccounts = () => async dispatch => {
  dispatch({ type: types.GET_ACCOUNTS_BEGIN });
  try {
    const res = await fetch("/api/v1/accounts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    });
    const accountsList = await res.json();
    dispatch({ type: types.GET_ACCOUNTS_SUCCESS, payload: accountsList });
  } catch (err) {
    dispatch({ type: types.GET_ACCOUNTS_FAILURE, payload: err });
  }
};

export const createAccount = data => async dispatch => {
  try {
    const res = await axios({
      method: "post",
      url: "/api/v1/accounts",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      data: data
    });
    dispatch({ type: types.CREATE_ACCOUNT, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
