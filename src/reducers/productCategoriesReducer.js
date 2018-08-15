// import types from '../actions/types';

const initialState = {
  productCategories: [],
  productCategoriesLoading: true,
  productCategoriesError: null,

  createProductCategoryLoading: false,
  createProductCategoryError: null,

  updateProductCategoryLoading: false,
  updateProductCategoryError: null,

  selectedProductCategory: null,
  selectedProductCategoryLoading: false,
  selectedProductCategoryError: null,

  deleteProductCategoryLoading: false,
  deleteProductCategoryError: null,
};

export const productCategoriesReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    // Get Account Addresses List
    case "GET_PRODUCT_CATEGORIES_BEGIN":
      return {
        ...state,
        productCategoriesLoading: true
      };

    case "GET_PRODUCT_CATEGORIES_SUCCESS":
      return {
        ...state,
        productCategories: action.payload,
        productCategoriesLoading: false
      };

    case "GET_PRODUCT_CATEGORIES_FAILURE":
      return {
        ...state,
        productCategories: null,
        productCategoriesLoading: false,
        productCategoriesError: true
      };
    // Create Account Address
    case "CREATE_PRODUCT_CATEGORY_BEGIN":
      return {
        ...state,
        createProductCategoryLoading: true
      };

    case "CREATE_PRODUCT_CATEGORY_SUCCESS":
      return {
        ...state,
        createProductCategoryLoading: false
      };

    case "CREATE_PRODUCT_CATEGORY_FAILURE":
      return {
        ...state,
        createProductCategoryError: true
      };
    // Get One Account Address
    case "GET_PRODUCT_CATEGORY_BEGIN":
      return {
        ...state,
        selectedProductCategoryLoading: true
      };

    case "GET_PRODUCT_CATEGORY_SUCCESS":
      return {
        ...state,
        selectedProductCategory: action.payload,
        selectedProductCategoryLoading: false
      };

    case "GET_PRODUCT_CATEGORY_FAILURE":
      return {
        ...state,
        selectedProductCategoryLoading: false,
        selectedProductCategoryError: true
      };
    // Update Account Address
    case "UPDATE_PRODUCT_CATEGORY_BEGIN":
      return {
        ...state,
        updateProductCategoryLoading: true
      };

    case "UPDATE_PRODUCT_CATEGORY_SUCCESS":
      return {
        ...state,
        updateProductCategoryLoading: false
      };

    case "UPDATE_PRODUCT_CATEGORY_FAILURE":
      return {
        ...state,
        updateProductCategoryError: true
      };

    // Delete
    case "DELETE_PRODUCT_CATEGORY_BEGIN":
      return {
        ...state,
        deleteProductCategoryLoading: true
      };

    case "DELETE_PRODUCT_CATEGORY_SUCCESS":
      return {
        ...state,
        // selectedProductCategory: action.payload,
        deleteProductCategoryLoading: false
      };

    case "DELETE_PRODUCT_CATEGORY_FAILURE":
      return {
        ...state,
        deleteProductCategoryLoading: false,
        deleteProductCategoryError: true
      };

    default:
      return state;
  }
};
