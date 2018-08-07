import axios from "axios";
import { authToken } from "../helpers/auth";

export const getProducts = params => dispatch => {
  dispatch({ type: "GET_PRODUCTS_BEGIN" });
  axios
    .get("/api/v1/products", {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data })
    );
};

export const createProduct = (data, params) => dispatch => {
  dispatch({ type: "CREATE_PRODUCT_BEGIN" });
  axios({
    method: "POST",
    url: "/api/v1/products",
    headers: {
      Authorization: authToken,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "CREATE_PRODUCT_SUCCESS", payload: res.data })
  );
};

export const getProduct = (productId, params) => dispatch => {
  dispatch({ type: "GET_PRODUCT_BEGIN" });
  axios
    .get(`/api/v1/products/${productId}`, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_PRODUCT_SUCCESS", payload: res.data })
    );
};

export const updateProduct = (
  productId,
  data,
  params
) => dispatch => {
  dispatch({ type: "UPDATE_PRODUCT_BEGIN" });
  axios({
    method: "PUT",
    url: `/api/v1/products/${productId}`,
    headers: {
      Authorization: authToken,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: res.data })
  );
};

export const deleteProduct = (productId, params) => dispatch => {
  dispatch({ type: "DELETE_PRODUCT_BEGIN" });
  axios
    .delete(`/api/v1/products/${productId}`, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: res.data })
    );
};
