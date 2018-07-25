// import types from '../actions/types';

const initialState = {
  warehouses: [],
  warehousesLoading: false,
  warehousesError: null,

  createWarehouseLoading: false,
  createWarehouseError: null,

  updateWarehouseLoading: false,
  updateWarehouseError: null,

  selectedWarehouse: null,
  selectedWarehouseLoading: false,
  selectedWarehouseError: null
};

export const warehousesReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    // Get Payment Terms
    case "GET_WAREHOUSES_BEGIN":
      return {
        ...state,
        warehousesLoading: true
      };

    case "GET_WAREHOUSES_SUCCESS":
      return {
        ...state,
        warehouses: action.payload,
        warehousesLoading: false
      };

    case "GET_WAREHOUSES_FAILURE":
      return {
        ...state,
        warehouses: null,
        warehousesLoading: false,
        warehousesError: true
      };

    case "CREATE_WAREHOUSE_BEGIN":
      return {
        ...state,
        createWarehouseLoading: true
      };

    case "CREATE_WAREHOUSE_SUCCESS":
      return {
        ...state,
        createWarehouseLoading: false
      };

    case "CREATE_WAREHOUSE_FAILURE":
      return {
        ...state,
        createWarehouseError: true
      };

    case "GET_WAREHOUSE_BEGIN":
      return {
        ...state,
        selectedWarehouseLoading: true
      };

    case "GET_WAREHOUSE_SUCCESS":
      return {
        ...state,
        selectedWarehouse: action.payload,
        selectedWarehouseLoading: false
      };

    case "GET_WAREHOUSE_FAILURE":
      return {
        ...state,
        selectedWarehouseLoading: false,
        selectedWarehouseError: true
      };

    case "UPDATE_WAREHOUSE_BEGIN":
      return {
        ...state,
        updateWarehouseLoading: true
      };

    case "UPDATE_WAREHOUSE_SUCCESS":
      return {
        ...state,
        updateWarehouseLoading: false
      };

    case "UPDATE_WAREHOUSE_FAILURE":
      return {
        ...state,
        updateWarehouseError: true
      };

    default:
      return state;
  }
};
