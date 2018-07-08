import axios from 'axios';

export const fetchCountries = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/countries', {
      headers: { 'Authorization': localStorage.getItem('token') }
    });
    dispatch({ type: 'FETCH_COUNTRIES', payload: res.data })
  } catch (err) {
    console.log(err)
  }
};