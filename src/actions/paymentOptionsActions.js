import axios from "axios";
// import types from "./types";

// check to get token with helper method
// import auth from '../helpers/auth';

export const getPaymentOptions = () => (dispatch) => {
  dispatch({ type: "GET_PAYMENT_OPTIONS_BEGIN" });
  // debugger;
  axios
    .get("/api/v1/payment_options", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    })
    .then(res =>
      dispatch({ type: "GET_PAYMENT_OPTIONS_SUCCESS", payload: res.data })
    );
};

