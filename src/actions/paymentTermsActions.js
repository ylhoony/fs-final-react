import axios from "axios";
// import types from "./types";

export const getPaymentTerms = params => dispatch => {
  dispatch({ type: "GET_PAYMENT_TERMS_BEGIN" });
  axios
    .get("/api/v1/payment_terms", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_PAYMENT_TERMS_SUCCESS", payload: res.data })
    );
};

export const createPaymentTerm = (data, params) => dispatch => {
  dispatch({ type: "CREATE_PAYMENT_TERM_BEGIN" });
  axios({
    method: "POST",
    url: "/api/v1/payment_terms",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params,
  }).then(res =>
    dispatch({ type: "CREATE_PAYMENT_TERM_SUCCESS", payload: res.data })
  );
};
