import types from '../actions/types';

const initialState = {
  accounts: [],
  loading: true,
  error: null
}

export const accountsReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_ACCOUNTS_BEGIN:
    return {
      ...state,
      loading: true,
      error: null
    }

    case types.GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accounts: action.payload,
        loading: false
      }

    default: 
      return state;
  }
}