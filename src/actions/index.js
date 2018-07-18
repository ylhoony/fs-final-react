import { getCountries } from './countriesActions';
import { getCurrencies } from './currenciesActions';
import { signUp, signIn, signOut, authUser } from './userActions';
import { getAccounts, createAccount } from './accountsActions';

export const actions = {
  // Authentication
  signUp,
  signIn,
  signOut,
  authUser,
  // Organization Accounts
  getAccounts,
  createAccount,
  // Countries
  getCountries,
  // Currencies
  getCurrencies,
}