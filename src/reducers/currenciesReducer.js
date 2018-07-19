// import types from '../actions/types';

const initialState = {
  currencies: [],
  currenciesLoading: false,
  currenciesError: null,
}

export const currenciesReducer = (state = initialState, action) => {
  // console.log("Currencies Reducer", action)
  switch(action.type) {
    case 'GET_CURRENCIES_BEGIN':
      return {
        ...state,
        currenciesLoading: true,
        currenciesError: null
      }

    case 'GET_CURRENCIES_SUCCESS':
      return {
        ...state,
        currencies: action.payload,
        currenciesLoading: false,
      }

    case 'GET_CURRENCIES_FAILURE':
      return {
        ...state,
        currenciesLoading: false,
        currenciesError: true
      }

    default: 
      return state;
  }
}