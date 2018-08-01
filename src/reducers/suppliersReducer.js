// import types from '../actions/types';

const initialState = {
  suppliers: [],
  suppliersLoading: true,
  suppliersError: null,

  createSupplierLoading: false,
  createSupplierError: null,

  updateSupplierLoading: false,
  updateSupplierError: null,

  selectedSupplier: null,
  selectedSupplierLoading: false,
  selectedSupplierError: null
};

export const suppliersReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    // Get Account Addresses List
    case "GET_SUPPLIERS_BEGIN":
      return {
        ...state,
        suppliersLoading: true
      };

    case "GET_SUPPLIERS_SUCCESS":
      return {
        ...state,
        suppliers: action.payload,
        suppliersLoading: false
      };

    case "GET_SUPPLIERS_FAILURE":
      return {
        ...state,
        suppliers: null,
        suppliersLoading: false,
        suppliersError: true
      };
    // Create Account Address
    case "CREATE_SUPPLIER_BEGIN":
      return {
        ...state,
        createSupplierLoading: true
      };

    case "CREATE_SUPPLIER_SUCCESS":
      return {
        ...state,
        createSupplierLoading: false,
      };

    case "CREATE_SUPPLIER_FAILURE":
      return {
        ...state,
        createSupplierError: true
      };
    // Get One Account Address
    case "GET_SUPPLIER_BEGIN":
      return {
        ...state,
        selectedSupplierLoading: true
      };

    case "GET_SUPPLIER_SUCCESS":
      return {
        ...state,
        selectedSupplier: action.payload,
        selectedSupplierLoading: false
      };

    case "GET_SUPPLIER_FAILURE":
      return {
        ...state,
        selectedSupplierLoading: false,
        selectedSupplierError: true
      };
    // Update Account Address
    case "UPDATE_SUPPLIER_BEGIN":
      return {
        ...state,
        updateSupplierLoading: true
      };

    case "UPDATE_SUPPLIER_SUCCESS":
      return {
        ...state,
        updateSupplierLoading: false
      };

    case "UPDATE_SUPPLIER_FAILURE":
      return {
        ...state,
        updateSupplierError: true
      };

    default:
      return state;
  }
};
