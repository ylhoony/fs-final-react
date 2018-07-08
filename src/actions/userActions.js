import axios from 'axios';
import types from './types';

export const authUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/current_user', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }})
    dispatch({ type: types.AUTH_USER, payload: res.data })
  } catch(err) {
    console.error(err);
    dispatch({ type: types.AUTH_USER, payload: '' });
  }
};

export const signUp = (data) => {
  return function(dispatch) {
    axios
      .post('/api/v1/sign_up', data)
      .then((res) => {
        debugger;
        localStorage.setItem('token', res.data.token)
        dispatch({ type: types.SIGN_UP_USER, payload: res.data.user })
      })
  }
};

export const signIn = (data) => {
  return function(dispatch) {
    axios
      .post('/api/v1/sign_in', data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        dispatch({ type: types.SIGN_IN_USER, payload: res.data.user });
      })
  }
};


export const signOut = () => {
  return function(dispatch) {
    localStorage.removeItem('token');
    dispatch({ type: types.SIGN_OUT_USER, payload: null });
  }
};