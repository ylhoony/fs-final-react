// import types from '../actions/types';

const initialState = {
  paymentOptions: [],
  paymentOptionsLoading: false,
  paymentOptionsError: null,
};

export const paymentOptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PAYMENT_OPTIONS_BEGIN":
      return {
        ...state,
        paymentOptionsLoading: true,
      };

    case "GET_PAYMENT_OPTIONS_SUCCESS":
      return {
        ...state,
        paymentOptions: action.payload,
        paymentOptionsLoading: false,
      };

    case "GET_PAYMENT_OPTIONS_FAILURE":
      return {
        ...state,
        paymentOptions: null,
        paymentOptionsLoading: false,
        paymentOptionsError: true,
      };

    default:
      return state;
  }
};
