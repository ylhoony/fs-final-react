import axios from 'axios';
import types from './types';

export const getAccounts = () => async dispatch => {
  dispatch({ type: types.GET_ACCOUNTS_BEGIN })
  try {
    const res = await fetch('/api/v1/accounts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    const accountsList = await res.json();
    dispatch({ type: types.GET_ACCOUNTS_SUCCESS, payload: accountsList })
  } catch(err) {
    console.log(err);
  }
}

export const createAccount = (data) => {
  return function(dispatch) {
    axios.post('/api/v1/accounts',{
      headers: {
        'Content-Type': 'application/json',
      },
      body: data      
    })
      .then((res) => {
        dispatch({ type: types.CREATE_ACCOUNT, payload: res.data.companies });
      })
  }
}

