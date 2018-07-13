import axios from 'axios';
import types from './types';

export const authUser = () => async dispatch => {
  const res = await axios.get('/api/v1/current_user', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }});
  dispatch({ type: types.AUTH_USER, payload: res.data });
};

export const signUp = (data) => async dispatch => {
  const res = await axios.post('/api/v1/sign_up', data);
  localStorage.setItem('token', res.data.token);
  dispatch({ type: types.SIGN_UP_USER, payload: res.data.user });
}

export const signIn = (data) => async dispatch => {
  const res = await axios.post('/api/v1/sign_in', data);
  localStorage.setItem('token', res.data.token);
  dispatch({ type: types.SIGN_IN_USER, payload: res.data.user });
}


export const signOut = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: types.SIGN_OUT_USER, payload: null });
}