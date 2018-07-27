import { combineReducers } from "redux";

import { accountsReducer } from "./accountsReducer";
import { countriesReducer } from "./countriesReducer";
import { currenciesReducer } from "./currenciesReducer";
import { customersReducer } from "./customersReducer";
import { paymentOptionsReducer } from "./paymentOptionsReducer";
import { paymentTermsReducer } from "./paymentTermsReducer";
import { userReducer } from "./userReducer";
import { warehousesReducer } from "./warehousesReducer";
import { accountAddressesReducer } from "./accountAddressesReducer";
import { accountContactsReducer } from "./accountContactsReducer"

export const rootReducer = combineReducers({
  accounts: accountsReducer,
  accountAddresses: accountAddressesReducer,
  accountContacts: accountContactsReducer,
  countries: countriesReducer,
  currencies: currenciesReducer,
  customers: customersReducer,
  paymentOptions: paymentOptionsReducer,
  paymentTerms: paymentTermsReducer,
  user: userReducer,
  warehouses: warehousesReducer,
});
