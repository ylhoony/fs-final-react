import types from '../actions/types';

const initialState = {
  currentAccount: null,
  currentAccountLoading: false,
  currentAccountError: null,

  currentUser: null
}

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.AUTH_USER:
      return {
        ...state,
        currentUser: action.payload || false
      }

    case types.SIGN_UP_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    case types.SIGN_IN_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    case types.SIGN_OUT_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    case 'CHANGE_CURRENT_ACCOUNT_BEGIN':
      return {
        ...state,
        currentAccountLoading: true
      }

    case 'CHANGE_CURRENT_ACCOUNT_SUCCESS':
      return {
        ...state,
        currentAccountLoading: false,
        currentAccount: action.payload
      }

    case 'CHANGE_CURRENT_ACCOUNT_FAILURE':
    return {
      ...state,
      currentAccountLoading: false,
      currentAccountError: true
    }
    

    default:
      return state;
  }
}