import axios from "axios";
// import types from "./types";

export const getSuppliers = params => dispatch => {
  dispatch({ type: "GET_SUPPLIERS_BEGIN" });
  axios
    .get("/api/v1/suppliers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_SUPPLIERS_SUCCESS", payload: res.data })
    );
};

export const createSupplier = (data, params) => dispatch => {
  dispatch({ type: "CREATE_SUPPLIER_BEGIN" });
  axios({
    method: "POST",
    url: "/api/v1/suppliers",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "CREATE_SUPPLIER_SUCCESS", payload: res.data })
  );
};

export const getSupplier = (supplierId, params) => dispatch => {
  dispatch({ type: "GET_SUPPLIER_BEGIN" });
  axios
    .get(`/api/v1/suppliers/${supplierId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_SUPPLIER_SUCCESS", payload: res.data })
    );
};

export const updateSupplier = (supplierId, data, params) => dispatch => {
  dispatch({ type: "UPDATE_SUPPLIER_BEGIN" });
  axios({
    method: "PUT",
    url: `/api/v1/suppliers/${supplierId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "UPDATE_SUPPLIER_SUCCESS", payload: res.data })
  );
};