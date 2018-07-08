import { combineReducers } from 'redux';
import { countriesReducer } from './countriesReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  countries: countriesReducer,
  user: userReducer
})
