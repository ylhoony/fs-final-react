// import types from '../actions/types';

const initialState = {
  productBrands: [],
  productBrandsLoading: true,
  productBrandsError: null,

  createProductBrandLoading: false,
  createProductBrandError: null,

  updateProductBrandLoading: false,
  updateProductBrandError: null,

  selectedProductBrand: null,
  selectedProductBrandLoading: false,
  selectedProductBrandError: null,

  deleteProductBrandLoading: false,
  deleteProductBrandError: true
};

export const productBrandsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Product Brands List
    case "GET_PRODUCT_BRANDS_BEGIN":
      return {
        ...state,
        productBrandsLoading: true
      };

    case "GET_PRODUCT_BRANDS_SUCCESS":
      return {
        ...state,
        productBrands: action.payload,
        productBrandsLoading: false
      };

    case "GET_PRODUCT_BRANDS_FAILURE":
      return {
        ...state,
        productBrands: null,
        productBrandsLoading: false,
        productBrandsError: true
      };
    // Create Product Brands
    case "CREATE_PRODUCT_BRAND_BEGIN":
      return {
        ...state,
        createProductBrandLoading: true
      };

    case "CREATE_PRODUCT_BRAND_SUCCESS":
      return {
        ...state,
        productBrands: state.productBrands.concat(action.payload),
        createProductBrandLoading: false
      };

    case "CREATE_PRODUCT_BRAND_FAILURE":
      return {
        ...state,
        createProductBrandError: true
      };
    // Get One Product Brands
    case "GET_PRODUCT_BRAND_BEGIN":
      return {
        ...state,
        selectedProductBrandLoading: true
      };

    case "GET_PRODUCT_BRAND_SUCCESS":
      return {
        ...state,
        selectedProductBrand: action.payload,
        selectedProductBrandLoading: false
      };

    case "GET_PRODUCT_BRAND_FAILURE":
      return {
        ...state,
        selectedProductBrandLoading: false,
        selectedProductBrandError: true
      };
    // Update Product Brands
    case "UPDATE_PRODUCT_BRAND_BEGIN":
      return {
        ...state,
        updateProductBrandLoading: true
      };

    case "UPDATE_PRODUCT_BRAND_SUCCESS":
      return {
        ...state,
        productBrands: state.productBrands
          .filter(brand => brand.id !== action.payload.id)
          .concat(action.payload),
        updateProductBrandLoading: false
      };

    case "UPDATE_PRODUCT_BRAND_FAILURE":
      return {
        ...state,
        updateProductBrandError: true
      };

    // Delete
    case "DELETE_PRODUCT_BRAND_BEGIN":
      return {
        ...state,
        deleteProductBrandLoading: true
      };

    case "DELETE_PRODUCT_BRAND_SUCCESS":
      return {
        ...state,
        productBrands: state.productBrands.filter(
          brand => brand.id !== action.payload.id
        ),
        deleteProductBrandLoading: false
      };

    case "DELETE_PRODUCT_BRAND_FAILURE":
      return {
        ...state,
        deleteProductBrandLoading: false,
        deleteProductBrandError: true
      };

    default:
      return state;
  }
};
