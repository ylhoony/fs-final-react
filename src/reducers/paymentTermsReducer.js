// import types from '../actions/types';

const initialState = {
  paymentTerms: [],
  paymentTermsLoading: false,
  paymentTermsError: null,

  createPaymentTermLoading: false,
  createPaymentTermError: null
};

export const paymentTermsReducer = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    // Get Payment Terms
    case "GET_PAYMENT_TERMS_BEGIN":
      return {
        ...state,
        paymentTermsLoading: true,
      };

    case "GET_PAYMENT_TERMS_SUCCESS":
      return {
        ...state,
        paymentTerms: action.payload,
        paymentTermsLoading: false,
      };

    case "GET_PAYMENT_TERMS_FAILURE":
      return {
        ...state,
        paymentTerms: null,
        paymentTermsLoading: false,
        paymentTermsError: true,
      };


    case "CREATE_PAYMENT_TERMS_BEGIN":
      return {
        ...state,
        createPaymentTermLoading: true,
      };

    case "CREATE_PAYMENT_TERMS_SUCCESS":
      return {
        ...state,
        // paymentTerms: action.payload,
        createPaymentTermLoading: false,
      };

    case "CREATE_PAYMENT_TERMS_FAILURE":
      return {
        ...state,
        createPaymentTermError: true,
      };

    default:
      return state;
  }
};
