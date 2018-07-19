// import types from '../actions/types';

const initialState = {
  countries: [],
  countriesLoading: false,
  countriesError: null,
}

export const countriesReducer = (state = initialState, action) => {
  // console.log("Countries Reducer", action)
  switch(action.type) {
    case 'GET_COUNTRIES_BEGIN':
      return {
        ...state,
        countriesLoading: true,
        countriesError: null
      }

    case 'GET_COUNTRIES_SUCCESS':
      return {
        ...state,
        countries: action.payload,
        countriesLoading: false,
      }

    case 'GET_COUNTRIES_FAILURE':
      return {
        ...state,
        countriesLoading: false,
        countriesError: true
      }

    default: 
      return state;
  }
}