// import types from '../actions/types';

const initialState = {
  accountAddresses: [],
  accountAddressesLoading: true,
  accountAddressesError: null,

  createAccountAddressLoading: false,
  createAccountAddressError: null,

  updateAccountAddressLoading: false,
  updateAccountAddressError: null,

  selectedAccountAddress: null,
  selectedAccountAddressLoading: false,
  selectedAccountAddressError: null
};

export const accountAddressesReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    // Get Account Addresses List
    case "GET_ACCOUNT_ADDRESSES_BEGIN":
      return {
        ...state,
        accountAddressesLoading: true
      };

    case "GET_ACCOUNT_ADDRESSES_SUCCESS":
      return {
        ...state,
        accountAddresses: action.payload,
        accountAddressesLoading: false
      };

    case "GET_ACCOUNT_ADDRESSES_FAILURE":
      return {
        ...state,
        accountAddresses: null,
        accountAddressesLoading: false,
        accountAddressesError: true
      };
    // Create Account Address
    case "CREATE_ACCOUNT_ADDRESS_BEGIN":
      return {
        ...state,
        createAccountAddressLoading: true
      };

    case "CREATE_ACCOUNT_ADDRESS_SUCCESS":
      return {
        ...state,
        createAccountAddressLoading: false
      };

    case "CREATE_ACCOUNT_ADDRESS_FAILURE":
      return {
        ...state,
        createAccountAddressError: true
      };
    // Get One Account Address
    case "GET_ACCOUNT_ADDRESS_BEGIN":
      return {
        ...state,
        selectedAccountAddressLoading: true
      };

    case "GET_ACCOUNT_ADDRESS_SUCCESS":
      return {
        ...state,
        selectedAccountAddress: action.payload,
        selectedAccountAddressLoading: false
      };

    case "GET_ACCOUNT_ADDRESS_FAILURE":
      return {
        ...state,
        selectedAccountAddressLoading: false,
        selectedAccountAddressError: true
      };
    // Update Account Address
    case "UPDATE_ACCOUNT_ADDRESS_BEGIN":
      return {
        ...state,
        updateAccountAddressLoading: true
      };

    case "UPDATE_ACCOUNT_ADDRESS_SUCCESS":
      return {
        ...state,
        updateAccountAddressLoading: false
      };

    case "UPDATE_ACCOUNT_ADDRESS_FAILURE":
      return {
        ...state,
        updateAccountAddressError: true
      };

    default:
      return state;
  }
};
