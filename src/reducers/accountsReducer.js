import types from '../actions/types';

const initialState = {
  accounts: [],
  accountsLoading: true,
  accountsError: null,
  currentAccount: {},
}

export const accountsReducer = (state = initialState, action) => {
  // console.log("Accounts Reducer", action);
  switch(action.type) {
    case types.GET_ACCOUNTS_BEGIN:
    return {
      ...state,
      accountsLoading: true,
      accountsError: null,
    }

    case types.GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accounts: action.payload,
        accountsLoading: false
      }

    case types.GET_ACCOUNTS_FAILURE:
      return {
        ...state,
        accountsLoading: false,
        accountsError: true
      }

    case types.CREATE_ACCOUNT:
      return {
        ...state,
        currentAccount: action.payload
      }

    default: 
      return state;
  }
}