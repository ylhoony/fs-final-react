import axios from "axios";
// import types from "./types";

export const getWarehouses = params => dispatch => {
  dispatch({ type: "GET_WAREHOUSES_BEGIN" });
  return axios
    .get("/api/v1/warehouses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_WAREHOUSES_SUCCESS", payload: res.data })
    );
};

export const createWarehouse = (data, params) => dispatch => {
  dispatch({ type: "CREATE_WAREHOUSE_BEGIN" });
  return axios({
    method: "POST",
    url: "/api/v1/warehouses",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "CREATE_WAREHOUSE_SUCCESS", payload: res.data })
  );
};

export const getWarehouse = (warehouseId, params) => dispatch => {
  dispatch({ type: "GET_WAREHOUSE_BEGIN" });
  return axios
    .get(`/api/v1/warehouses/${warehouseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_WAREHOUSE_SUCCESS", payload: res.data })
    );
};

export const updateWarehouse = (warehouseId, data, params) => dispatch => {
  dispatch({ type: "UPDATE_WAREHOUSE_BEGIN" });
  return axios({
    method: "PUT",
    url: `/api/v1/warehouses/${warehouseId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "UPDATE_WAREHOUSE_SUCCESS", payload: res.data })
  );
};