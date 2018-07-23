import types from '../actions/types';

const initialState = {
  currentAccount: null,
  currentAccountLoading: true,
  currentAccountError: null,

  currentUser: null,
  currentUserLoading: false,
  currentUserError: null
}

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.AUTH_USER:
      return {
        ...state,
        currentUser: action.payload || false
      }

    // SIGN_UP_USER
    case types.SIGN_UP_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    
    // SIGN_IN_USER
    case 'SIGN_IN_USER_BEGIN':
    return {
      ...state,
      currentUserLoading: true
    }

    case 'SIGN_IN_USER_SUCCESS':
    return {
      ...state,
      currentUser: action.payload,
      currentUserLoading: false
    }

    // SIGN_OUT_USER
    case types.SIGN_OUT_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    // GET_CURRENT_ACCOUNT
    case 'GET_CURRENT_ACCOUNT_BEGIN':
    return {
      ...state,
      currentAccountLoading: true
    }

    case 'GET_CURRENT_ACCOUNT_SUCCESS':
      return {
        ...state,
        currentAccountLoading: false,
        currentAccount: action.payload
      }

    case 'GET_CURRENT_ACCOUNT_FAILURE':
    return {
      ...state,
      currentAccountLoading: false,
      currentAccountError: true
    } 

    // CHANGE_CURRENT_ACCOUNT
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