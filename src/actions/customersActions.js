import axios from "axios";
// import types from "./types";

export const getCustomers = params => dispatch => {
  dispatch({ type: "GET_CUSTOMERS_BEGIN" });
  return axios
    .get("/api/v1/customers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_CUSTOMERS_SUCCESS", payload: res.data })
    );
};

export const createCustomer = (data, params) => dispatch => {
  dispatch({ type: "CREATE_CUSTOMER_BEGIN" });
  return axios({
    method: "POST",
    url: "/api/v1/customers",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "CREATE_CUSTOMER_SUCCESS", payload: res.data })
  );
};

export const getCustomer = (customerId, params) => dispatch => {
  dispatch({ type: "GET_CUSTOMER_BEGIN" });
  return axios
    .get(`/api/v1/customers/${customerId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_CUSTOMER_SUCCESS", payload: res.data })
    );
};

export const updateCustomer = (customerId, data, params) => dispatch => {
  dispatch({ type: "UPDATE_CUSTOMER_BEGIN" });
  return axios({
    method: "PUT",
    url: `/api/v1/customers/${customerId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "UPDATE_CUSTOMER_SUCCESS", payload: res.data })
  );
};