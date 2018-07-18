import axios from 'axios';

export const getCurrencies = () => async dispatch => {
  try {
    dispatch({ type: 'GET_CURRENCIES_BEGIN' })
    const res = await axios.get('/api/v1/currencies', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch({ type: 'GET_CURRENCIES_SUCCESS', payload: res.data })
  } catch (err) {
    dispatch({ type: 'GET_CURRENCIES_FAILURE', payload: err })
  }
};