// import types from '../actions/types';

const initialState = {
  purchaseOrders: [],
  purchaseOrdersLoading: true,
  purchaseOrdersError: null,

  createPurchaseOrderLoading: false,
  createPurchaseOrderError: null,

  updatePurchaseOrderLoading: false,
  updatePurchaseOrderError: null,

  selectedPurchaseOrder: null,
  selectedPurchaseOrderLoading: false,
  selectedPurchaseOrderError: null,

  deletePurchaseOrderLoading: false,
  deletePurchaseOrderError: true,
};

export const purchaseOrdersReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    // Get Account Addresses List
    case "GET_PURCHASE_ORDERS_BEGIN":
      return {
        ...state,
        purchaseOrdersLoading: true
      };

    case "GET_PURCHASE_ORDERS_SUCCESS":
      return {
        ...state,
        purchaseOrders: action.payload,
        purchaseOrdersLoading: false
      };

    case "GET_PURCHASE_ORDERS_FAILURE":
      return {
        ...state,
        purchaseOrders: null,
        purchaseOrdersLoading: false,
        purchaseOrdersError: true
      };
    // Create Account Address
    case "CREATE_PURCHASE_ORDER_BEGIN":
      return {
        ...state,
        createPurchaseOrderLoading: true
      };

    case "CREATE_PURCHASE_ORDER_SUCCESS":
      return {
        ...state,
        createPurchaseOrderLoading: false
      };

    case "CREATE_PURCHASE_ORDER_FAILURE":
      return {
        ...state,
        createPurchaseOrderError: true
      };
    // Get One Account Address
    case "GET_PURCHASE_ORDER_BEGIN":
      return {
        ...state,
        selectedPurchaseOrderLoading: true
      };

    case "GET_PURCHASE_ORDER_SUCCESS":
      return {
        ...state,
        selectedPurchaseOrder: action.payload,
        selectedPurchaseOrderLoading: false
      };

    case "GET_PURCHASE_ORDER_FAILURE":
      return {
        ...state,
        selectedPurchaseOrderLoading: false,
        selectedPurchaseOrderError: true
      };
    // Update Account Address
    case "UPDATE_PURCHASE_ORDER_BEGIN":
      return {
        ...state,
        updatePurchaseOrderLoading: true
      };

    case "UPDATE_PURCHASE_ORDER_SUCCESS":
      return {
        ...state,
        updatePurchaseOrderLoading: false
      };

    case "UPDATE_PURCHASE_ORDER_FAILURE":
      return {
        ...state,
        updatePurchaseOrderError: true
      };

    // Delete
    case "DELETE_PURCHASE_ORDER_BEGIN":
      return {
        ...state,
        deletePurchaseOrderLoading: true
      };

    case "DELETE_PURCHASE_ORDER_SUCCESS":
      return {
        ...state,
        // selectedPurchaseOrder: action.payload,
        deletePurchaseOrderLoading: false
      };

    case "DELETE_PURCHASE_ORDER_FAILURE":
      return {
        ...state,
        deletePurchaseOrderLoading: false,
        deletePurchaseOrderError: true
      };

    default:
      return state;
  }
};
