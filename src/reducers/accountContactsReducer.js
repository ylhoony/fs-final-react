// import types from '../actions/types';

const initialState = {
  accountContacts: [],
  accountContactsLoading: true,
  accountContactsError: null,

  createAccountContactLoading: false,
  createAccountContactError: null,

  updateAccountContactLoading: false,
  updateAccountContactError: null,

  selectedAccountContact: null,
  selectedAccountContactLoading: false,
  selectedAccountContactError: null
};

export const accountContactsReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    // Get Account Contacts List
    case "GET_ACCOUNT_CONTACTS_BEGIN":
      return {
        ...state,
        accountContactsLoading: true
      };

    case "GET_ACCOUNT_CONTACTS_SUCCESS":
      return {
        ...state,
        accountContacts: action.payload,
        accountContactsLoading: false
      };

    case "GET_ACCOUNT_CONTACTS_FAILURE":
      return {
        ...state,
        accountContacts: null,
        accountContactsLoading: false,
        accountContactsError: true
      };
    // Create Account Contact
    case "CREATE_ACCOUNT_ADDRESS_BEGIN":
      return {
        ...state,
        createAccountContactLoading: true
      };

    case "CREATE_ACCOUNT_ADDRESS_SUCCESS":
      return {
        ...state,
        createAccountContactLoading: false
      };

    case "CREATE_ACCOUNT_ADDRESS_FAILURE":
      return {
        ...state,
        createAccountContactError: true
      };
    // Get One Account Contact
    case "GET_ACCOUNT_ADDRESS_BEGIN":
      return {
        ...state,
        selectedAccountContactLoading: true
      };

    case "GET_ACCOUNT_ADDRESS_SUCCESS":
      return {
        ...state,
        selectedAccountContact: action.payload,
        selectedAccountContactLoading: false
      };

    case "GET_ACCOUNT_ADDRESS_FAILURE":
      return {
        ...state,
        selectedAccountContactLoading: false,
        selectedAccountContactError: true
      };
    // Update Account Contact
    case "UPDATE_ACCOUNT_ADDRESS_BEGIN":
      return {
        ...state,
        updateAccountContactLoading: true
      };

    case "UPDATE_ACCOUNT_ADDRESS_SUCCESS":
      return {
        ...state,
        updateAccountContactLoading: false
      };

    case "UPDATE_ACCOUNT_ADDRESS_FAILURE":
      return {
        ...state,
        updateAccountContactError: true
      };

    default:
      return state;
  }
};
