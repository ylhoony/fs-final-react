import axios from 'axios';
import types from './types';

export const createCompany = (data) => {
  return function(dispatch) {
    axios.post('/api/v1/companies',{
      headers: {
        'Content-Type': 'application/json',
      },
      body: data      
    })
      .then((res) => {
        dispatch({ type: types.CREATE_COMPANAY, payload: res.data.companies });
      })
  }
}

