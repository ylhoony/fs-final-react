import axios from "axios";

export const getCountries = () => async dispatch => {
  try {
    dispatch({ type: "GET_COUNTRIES_BEGIN" });
    const res = await axios.get("/api/v1/countries", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    dispatch({ type: "GET_COUNTRIES_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_COUNTRIES_FAILURE", payload: err });
  }
};
