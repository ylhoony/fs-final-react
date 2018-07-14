import axios from 'axios';
import types from './types';

export const getAccounts = () => {
  return function(dispatch) {
    fetch('/api/v1/accounts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((accountsList) => {
        dispatch({ type: types.GET_ACCOUNTS, payload: accountsList })
      })
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

