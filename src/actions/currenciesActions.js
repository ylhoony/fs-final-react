import axios from "axios";

export const getCurrencies = () => async dispatch => {
  dispatch({ type: "GET_CURRENCIES_BEGIN" });
  return axios
    .get("/api/v1/currencies", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res =>
      dispatch({ type: "GET_CURRENCIES_SUCCESS", payload: res.data })
    );
};
