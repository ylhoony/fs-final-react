import axios from "axios";

export const getAccountContacts = params => dispatch => {
  dispatch({ type: "GET_ACCOUNT_CONTACTS_BEGIN" });
  return axios
    .get("/api/v1/account_contacts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_ACCOUNT_CONTACTS_SUCCESS", payload: res.data })
    );
};

export const createAccountContact = (data, params) => dispatch => {
  dispatch({ type: "CREATE_ACCOUNT_CONTACT_BEGIN" });
  return axios({
    method: "POST",
    url: "/api/v1/account_contacts",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "CREATE_ACCOUNT_CONTACT_SUCCESS", payload: res.data })
  );
};

export const getAccountContact = (accountContactId, params) => dispatch => {
  dispatch({ type: "GET_ACCOUNT_CONTACT_BEGIN" });
  return axios
    .get(`/api/v1/account_contacts/${accountContactId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_ACCOUNT_CONTACT_SUCCESS", payload: res.data })
    );
};

export const updateAccountContact = (accountContactId, data, params) => dispatch => {
  dispatch({ type: "UPDATE_ACCOUNT_CONTACT_BEGIN" });
  return axios({
    method: "PUT",
    url: `/api/v1/account_contacts/${accountContactId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "UPDATE_ACCOUNT_CONTACT_SUCCESS", payload: res.data })
  );
};