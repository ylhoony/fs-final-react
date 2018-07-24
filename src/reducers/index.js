import { combineReducers } from "redux";

import { accountsReducer } from "./accountsReducer";
import { countriesReducer } from "./countriesReducer";
import { currenciesReducer } from "./currenciesReducer";
import { paymentOptionsReducer } from "./paymentOptionsReducer";
import { paymentTermsReducer } from "./paymentTermsReducer";
import { userReducer } from "./userReducer";
import { warehousesReducer } from "./warehousesReducer";

export const rootReducer = combineReducers({
  accounts: accountsReducer,
  countries: countriesReducer,
  currencies: currenciesReducer,
  paymentOptions: paymentOptionsReducer,
  paymentTerms: paymentTermsReducer,
  user: userReducer,
  warehouses: warehousesReducer,
});
