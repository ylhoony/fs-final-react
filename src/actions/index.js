import { getCountries } from "./countriesActions";
import { getCurrencies } from "./currenciesActions";
import {
  authUser,
  signUp,
  signIn,
  signOut,
  getCurrentAccount,
  changeCurrentAccount
} from "./userActions";
import { getAccounts, createAccount } from "./accountsActions";
import { getPaymentOptions } from "./paymentOptionsActions";
import { getPaymentTerms, createPaymentTerm } from "./paymentTermsActions";
import {
  getWarehouses,
  createWarehouse,
  getWarehouse,
  updateWarehouse
} from "./warehousesActions";
import {
  getAccountAddresses,
  createAccountAddress,
  updateAccountAddress
} from "./accountAddressesActions";

export const actions = {
  // Authentication
  signUp,
  signIn,
  signOut,
  authUser,
  getCurrentAccount,
  changeCurrentAccount,
  // Organization Accounts
  getAccounts,
  createAccount,
  // Countries
  getCountries,
  // Currencies
  getCurrencies,
  // Payment Options
  getPaymentOptions,
  // Payment Terms
  getPaymentTerms,
  createPaymentTerm,
  // Warehouse Locations
  getWarehouses,
  createWarehouse,
  getWarehouse,
  updateWarehouse,
  // Account Addresses
  getAccountAddresses,
  createAccountAddress,
  updateAccountAddress
};
