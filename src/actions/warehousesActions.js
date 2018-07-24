import axios from "axios";
// import types from "./types";

export const getWarehouses = params => dispatch => {
  dispatch({ type: "GET_WAREHOUSES_BEGIN" });
  axios
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

export const createWarehouse = (data) => {

}