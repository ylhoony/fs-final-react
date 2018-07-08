import types from '../actions/types';

export const userReducer = (state = null, action) => {
  switch(action.type) {
    case types.AUTH_USER:
      return action.payload || false;

    case types.SIGN_UP_USER:
      return action.payload;

    case types.SIGN_IN_USER:
      return action.payload;

    case types.SIGN_OUT_USER:
      return action.payload;

    default:
      return state;
  }
}