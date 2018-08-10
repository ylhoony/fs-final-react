import { combineReducers } from "redux";

import { accountsReducer } from "./accountsReducer";
import { accountAddressesReducer } from "./accountAddressesReducer";
import { accountContactsReducer } from "./accountContactsReducer";
import { countriesReducer } from "./countriesReducer";
import { currenciesReducer } from "./currenciesReducer";
import { customersReducer } from "./customersReducer";
import { paymentOptionsReducer } from "./paymentOptionsReducer";
import { paymentTermsReducer } from "./paymentTermsReducer";
import { productBrandsReducer } from "./productBrandsReducer";
import { productCategoriesReducer } from "./productCategoriesReducer";
import { productsReducer } from "./productsReducer";
import { purchaseOrdersReducer } from "./purchaseOrdersReducer";
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
  productBrands: productBrandsReducer,
  productCategories: productCategoriesReducer,
  products: productsReducer,
  purchaseOrders: purchaseOrdersReducer,
  suppliers: suppliersReducer,
  user: userReducer,
  warehouses: warehousesReducer,
});
