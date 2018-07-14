import { fetchCountries } from './fetchCountries';
import { signUp, signIn, signOut, authUser } from './userActions';
import { getAccounts } from './accountsActions';

export const actions = {
  // Authentication
  signUp,
  signIn,
  signOut,
  authUser,
  // Organization Accounts
  getAccounts,

  // test
  fetchCountries
}