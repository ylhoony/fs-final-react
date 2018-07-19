import { getCountries } from './countriesActions';
import { getCurrencies } from './currenciesActions';
import { authUser, signUp, signIn, signOut, changeCurrentAccount } from './userActions';
import { getAccounts, createAccount } from './accountsActions';

export const actions = {
  // Authentication
  signUp,
  signIn,
  signOut,
  authUser,
  changeCurrentAccount,
  // Organization Accounts
  getAccounts,
  createAccount,
  // Countries
  getCountries,
  // Currencies
  getCurrencies,
}