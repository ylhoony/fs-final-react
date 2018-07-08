import { fetchCountries } from './fetchCountries';
import { signUp, signIn, signOut, authUser } from './userActions';

export const actions = {
  signUp,
  signIn,
  signOut,
  authUser,
  fetchCountries
}