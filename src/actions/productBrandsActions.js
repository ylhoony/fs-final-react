import axios from "axios";
import { authToken } from "../helpers/auth";

export const getProductBrands = params => dispatch => {
  dispatch({ type: "GET_PRODUCT_BRANDS_BEGIN" });
  axios
    .get("/api/v1/product_brands", {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_PRODUCT_BRANDS_SUCCESS", payload: res.data })
    );
};

export const createProductBrand = (data, params) => dispatch => {
  dispatch({ type: "CREATE_PRODUCT_BRAND_BEGIN" });
  axios({
    method: "POST",
    url: "/api/v1/product_brands",
    headers: {
      Authorization: authToken,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "CREATE_PRODUCT_BRAND_SUCCESS", payload: res.data })
  );
};

export const getProductBrand = (productBrandId, params) => dispatch => {
  dispatch({ type: "GET_PRODUCT_BRAND_BEGIN" });
  axios
    .get(`/api/v1/product_brands/${productBrandId}`, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "GET_PRODUCT_BRAND_SUCCESS", payload: res.data })
    );
};

export const updateProductBrand = (
  productBrandId,
  data,
  params
) => dispatch => {
  dispatch({ type: "UPDATE_PRODUCT_BRAND_BEGIN" });
  axios({
    method: "PUT",
    url: `/api/v1/product_brands/${productBrandId}`,
    headers: {
      Authorization: authToken,
      "Content-Type": "application/json"
    },
    data: data,
    params: params
  }).then(res =>
    dispatch({ type: "UPDATE_PRODUCT_BRAND_SUCCESS", payload: res.data })
  );
};

export const deleteProductBrand = (productBrandId, params) => dispatch => {
  dispatch({ type: "DELETE_PRODUCT_BRAND_BEGIN" });
  axios
    .delete(`/api/v1/product_brands/${productBrandId}`, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      },
      params: params
    })
    .then(res =>
      dispatch({ type: "DELETE_PRODUCT_BRAND_SUCCESS", payload: res.data })
    );
};
