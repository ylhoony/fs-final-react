// import types from '../actions/types';

const initialState = {
  products: [],
  productsLoading: true,
  productsError: null,

  createProductLoading: false,
  createProductError: null,

  updateProductLoading: false,
  updateProductError: null,

  selectedProduct: null,
  selectedProductLoading: false,
  selectedProductError: null,

  deleteProductLoading: false,
  deleteProductError: true,
};

export const productsReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    // Get Account Addresses List
    case "GET_PRODUCTS_BEGIN":
      return {
        ...state,
        productsLoading: true
      };

    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload,
        productsLoading: false
      };

    case "GET_PRODUCTS_FAILURE":
      return {
        ...state,
        products: null,
        productsLoading: false,
        productsError: true
      };
    // Create Account Address
    case "CREATE_PRODUCT_BEGIN":
      return {
        ...state,
        createProductLoading: true
      };

    case "CREATE_PRODUCT_SUCCESS":
      return {
        ...state,
        createProductLoading: false
      };

    case "CREATE_PRODUCT_FAILURE":
      return {
        ...state,
        createProductError: true
      };
    // Get One Account Address
    case "GET_PRODUCT_BEGIN":
      return {
        ...state,
        selectedProductLoading: true
      };

    case "GET_PRODUCT_SUCCESS":
      return {
        ...state,
        selectedProduct: action.payload,
        selectedProductLoading: false
      };

    case "GET_PRODUCT_FAILURE":
      return {
        ...state,
        selectedProductLoading: false,
        selectedProductError: true
      };
    // Update Account Address
    case "UPDATE_PRODUCT_BEGIN":
      return {
        ...state,
        updateProductLoading: true
      };

    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        updateProductLoading: false
      };

    case "UPDATE_PRODUCT_FAILURE":
      return {
        ...state,
        updateProductError: true
      };

    // Delete
    case "DELETE_PRODUCT_BEGIN":
      return {
        ...state,
        deleteProductLoading: true
      };

    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        // selectedProduct: action.payload,
        deleteProductLoading: false
      };

    case "DELETE_PRODUCT_FAILURE":
      return {
        ...state,
        deleteProductLoading: false,
        deleteProductError: true
      };

    default:
      return state;
  }
};
