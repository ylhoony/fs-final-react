import axios from "axios";
// import types from "./types";

export const getPurchaseOrders = params => dispatch => {
  dispatch({ type: "GET_PURCHASE_ORDERS_BEGIN" });
  axios
    .get("/api/v1/purchase_orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_PURCHASE_ORDERS_SUCCESS", payload: res.data })
    );
};

export const createPurchaseOrder = (data, params) => dispatch => {
  dispatch({ type: "CREATE_PURCHASE_ORDER_BEGIN" });
  axios({
    method: "POST",
    url: "/api/v1/purchase_orders",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "CREATE_PURCHASE_ORDER_SUCCESS", payload: res.data })
  );
};

export const getPurchaseOrder = (purchase_orderId, params) => dispatch => {
  dispatch({ type: "GET_PURCHASE_ORDER_BEGIN" });
  axios
    .get(`/api/v1/purchase_orders/${purchase_orderId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_PURCHASE_ORDER_SUCCESS", payload: res.data })
    );
};

export const updatePurchaseOrder = (purchase_orderId, data, params) => dispatch => {
  dispatch({ type: "UPDATE_PURCHASE_ORDER_BEGIN" });
  axios({
    method: "PUT",
    url: `/api/v1/purchase_orders/${purchase_orderId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "UPDATE_PURCHASE_ORDER_SUCCESS", payload: res.data })
  );
};