import { combineReducers } from "redux";

import { accountsReducer } from "./accountsReducer";
import { countriesReducer } from "./countriesReducer";
import { currenciesReducer } from "./currenciesReducer";
import { paymentOptionsReducer } from "./paymentOptionsReducer";
import { paymentTermsReducer } from "./paymentTermsReducer";
import { userReducer } from "./userReducer";
import { warehousesReducer } from "./warehousesReducer";
import { accountAddressesReducer } from "./accountAddressesReducer";

export const rootReducer = combineReducers({
  accounts: accountsReducer,
  accountAddresses: accountAddressesReducer,
  countries: countriesReducer,
  currencies: currenciesReducer,
  paymentOptions: paymentOptionsReducer,
  paymentTerms: paymentTermsReducer,
  user: userReducer,
  warehouses: warehousesReducer,
});
