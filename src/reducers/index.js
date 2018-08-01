import { combineReducers } from "redux";

import { accountsReducer } from "./accountsReducer";
import { accountAddressesReducer } from "./accountAddressesReducer";
import { accountContactsReducer } from "./accountContactsReducer";
import { countriesReducer } from "./countriesReducer";
import { currenciesReducer } from "./currenciesReducer";
import { customersReducer } from "./customersReducer";
import { paymentOptionsReducer } from "./paymentOptionsReducer";
import { paymentTermsReducer } from "./paymentTermsReducer";
import { suppliersReducer } from "./suppliersReducer";
import { userReducer } from "./userReducer";
import { warehousesReducer } from "./warehousesReducer";

export const rootReducer = combineReducers({
  accounts: accountsReducer,
  accountAddresses: accountAddressesReducer,
  accountContacts: accountContactsReducer,
  countries: countriesReducer,
  currencies: currenciesReducer,
  customers: customersReducer,
  paymentOptions: paymentOptionsReducer,
  paymentTerms: paymentTermsReducer,
  suppliers: suppliersReducer,
  user: userReducer,
  warehouses: warehousesReducer,
});
