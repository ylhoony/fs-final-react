import { combineReducers } from 'redux';

import { accountsReducer } from './accountsReducer';
import { countriesReducer } from './countriesReducer';
import { currenciesReducer } from './currenciesReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  accounts: accountsReducer,
  countries: countriesReducer,
  currencies: currenciesReducer,
  user: userReducer
})
