import axios from "axios";
import { authToken } from "../helpers/auth";

export const getProductCategories = params => dispatch => {
  dispatch({ type: "GET_PRODUCT_CATEGORIES_BEGIN" });
  return axios
    .get("/api/v1/product_categories", {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_PRODUCT_CATEGORIES_SUCCESS", payload: res.data })
    );
};

export const createProductCategory = (data, params) => dispatch => {
  dispatch({ type: "CREATE_PRODUCT_CATEGORY_BEGIN" });
  return axios({
    method: "POST",
    url: "/api/v1/product_categories",
    headers: {
      Authorization: authToken,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "CREATE_PRODUCT_CATEGORY_SUCCESS", payload: res.data })
  );
};

export const getProductCategory = (productCategoryId, params) => dispatch => {
  dispatch({ type: "GET_PRODUCT_CATEGORY_BEGIN" });
  return axios
    .get(`/api/v1/product_categories/${productCategoryId}`, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_PRODUCT_CATEGORY_SUCCESS", payload: res.data })
    );
};

export const updateProductCategory = (
  productCategoryId,
  data,
  params
) => dispatch => {
  dispatch({ type: "UPDATE_PRODUCT_CATEGORY_BEGIN" });
  return axios({
    method: "PUT",
    url: `/api/v1/product_categories/${productCategoryId}`,
    headers: {
      Authorization: authToken,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "UPDATE_PRODUCT_CATEGORY_SUCCESS", payload: res.data })
  );
};

export const deleteProductCategory = (productCategoryId, params) => dispatch => {
  dispatch({ type: "DELETE_PRODUCT_CATEGORY_BEGIN" });
  return axios
    .delete(`/api/v1/product_categories/${productCategoryId}`, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "DELETE_PRODUCT_CATEGORY_SUCCESS", payload: res.data })
    );
};
