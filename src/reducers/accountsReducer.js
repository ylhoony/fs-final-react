import types from '../actions/types';

export const accountsReducer = (state = [], action) => {
  switch(action.type) {
    case types.GET_ACCOUNTS:
      return action.payload

    default: 
      return state;
  }
}