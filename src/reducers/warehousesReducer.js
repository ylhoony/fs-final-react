// import types from '../actions/types';

const initialState = {
  warehouses: [],
  warehousesLoading: false,
  warehousesError: null,

  createWarehouseLoading: false,
  createWarehouseError: null
};

export const warehousesReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    // Get Payment Terms
    case "GET_WAREHOUSES_BEGIN":
      return {
        ...state,
        warehousesLoading: true,
      };

    case "GET_WAREHOUSES_SUCCESS":
      return {
        ...state,
        warehouses: action.payload,
        warehousesLoading: false,
      };

    case "GET_WAREHOUSES_FAILURE":
      return {
        ...state,
        warehouses: null,
        warehousesLoading: false,
        warehousesError: true,
      };


    case "CREATE_WAREHOUSE_BEGIN":
      return {
        ...state,
        createWarehouseLoading: true,
      };

    case "CREATE_WAREHOUSE_SUCCESS":
      return {
        ...state,
        // warehouses: action.payload,
        createWarehouseLoading: false,
      };

    case "CREATE_WAREHOUSE_FAILURE":
      return {
        ...state,
        createWarehouseError: true,
      };

    default:
      return state;
  }
};
