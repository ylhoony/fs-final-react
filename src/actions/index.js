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
  getAccountAddress,
  createAccountAddress,
  updateAccountAddress
} from "./accountAddressesActions";
import {
  getAccountContacts,
  getAccountContact,
  createAccountContact,
  updateAccountContact
} from "./accountContactsActions";
import {
  getCustomers,
  createCustomer,
  getCustomer,
  updateCustomer
} from "./customersActions";
import {
  getSuppliers,
  createSupplier,
  getSupplier,
  updateSupplier
} from "./suppliersActions";
import {
  getProductCategories,
  createProductCategory,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
} from "./productCategoriesActions";
import {
  getProductBrands,
  createProductBrand,
  getProductBrand,
  updateProductBrand,
  deleteProductBrand,
} from "./productBrandsActions";
import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "./productsActions";
import {
  getPurchaseOrders,
  createPurchaseOrder,
  getPurchaseOrder,
  updatePurchaseOrder,
} from "./purchaseOrdersActions";

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
  getAccountAddress,
  createAccountAddress,
  updateAccountAddress,
  // Account Contacts
  getAccountContacts,
  getAccountContact,
  createAccountContact,
  updateAccountContact,
  // Customers
  getCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  // Suppliers
  getSuppliers,
  createSupplier,
  getSupplier,
  updateSupplier,
  // Product Category
  getProductCategories,
  createProductCategory,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
  // Product Brands
  getProductBrands,
  createProductBrand,
  getProductBrand,
  updateProductBrand,
  deleteProductBrand,
  // Products
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  // Purchase Order
  getPurchaseOrders,
  createPurchaseOrder,
  getPurchaseOrder,
  updatePurchaseOrder,
};
