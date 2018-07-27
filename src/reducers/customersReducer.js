// import types from '../actions/types';

const initialState = {
  customers: [],
  customersLoading: true,
  customersError: null,

  createCustomerLoading: false,
  createCustomerError: null,

  updateCustomerLoading: false,
  updateCustomerError: null,

  selectedCustomer: null,
  selectedCustomerLoading: false,
  selectedCustomerError: null
};

export const customersReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    // Get Account Addresses List
    case "GET_CUSTOMERS_BEGIN":
      return {
        ...state,
        customersLoading: true
      };

    case "GET_CUSTOMERS_SUCCESS":
      return {
        ...state,
        customers: action.payload,
        customersLoading: false
      };

    case "GET_CUSTOMERS_FAILURE":
      return {
        ...state,
        customers: null,
        customersLoading: false,
        customersError: true
      };
    // Create Account Address
    case "CREATE_CUSTOMER_BEGIN":
      return {
        ...state,
        createCustomerLoading: true
      };

    case "CREATE_CUSTOMER_SUCCESS":
      return {
        ...state,
        createCustomerLoading: false,
      };

    case "CREATE_CUSTOMER_FAILURE":
      return {
        ...state,
        createCustomerError: true
      };
    // Get One Account Address
    case "GET_CUSTOMER_BEGIN":
      return {
        ...state,
        selectedCustomerLoading: true
      };

    case "GET_CUSTOMER_SUCCESS":
      return {
        ...state,
        selectedCustomer: action.payload,
        selectedCustomerLoading: false
      };

    case "GET_CUSTOMER_FAILURE":
      return {
        ...state,
        selectedCustomerLoading: false,
        selectedCustomerError: true
      };
    // Update Account Address
    case "UPDATE_CUSTOMER_BEGIN":
      return {
        ...state,
        updateCustomerLoading: true
      };

    case "UPDATE_CUSTOMER_SUCCESS":
      return {
        ...state,
        updateCustomerLoading: false
      };

    case "UPDATE_CUSTOMER_FAILURE":
      return {
        ...state,
        updateCustomerError: true
      };

    default:
      return state;
  }
};
