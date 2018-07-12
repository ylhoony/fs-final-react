import { combineReducers } from 'redux';

import { companiesReducer } from './companiesReducer';
import { countriesReducer } from './countriesReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  companies: companiesReducer,
  countries: countriesReducer,
  user: userReducer
})
