import axios from "axios";
// import { authToken } from "../helpers/auth";

export const getAccountAddresses = params => dispatch => {
  dispatch({ type: "GET_ACCOUNT_ADDRESSES_BEGIN" });
  
  return axios
    .get("/api/v1/account_addresses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_ACCOUNT_ADDRESSES_SUCCESS", payload: res.data })
    );
};

export const createAccountAddress = (data, params) => dispatch => {
  dispatch({ type: "CREATE_ACCOUNT_ADDRESS_BEGIN" });
  return axios({
    method: "POST",
    url: "/api/v1/account_addresses",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "CREATE_ACCOUNT_ADDRESS_SUCCESS", payload: res.data })
  );
};

export const getAccountAddress = (accountAddressId, params) => dispatch => {
  dispatch({ type: "GET_ACCOUNT_ADDRESS_BEGIN" });
  return axios
    .get(`/api/v1/account_addresses/${accountAddressId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_ACCOUNT_ADDRESS_SUCCESS", payload: res.data })
    );
};

export const updateAccountAddress = (
  accountAddressId,
  data,
  params
) => dispatch => {
  dispatch({ type: "UPDATE_ACCOUNT_ADDRESS_BEGIN" });
  return axios({
    method: "PUT",
    url: `/api/v1/account_addresses/${accountAddressId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "UPDATE_ACCOUNT_ADDRESS_SUCCESS", payload: res.data })
  );
};
