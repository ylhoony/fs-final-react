import React from "react";
import { Header } from "semantic-ui-react";

export const buildCountriesOptions = countries => {
  return countries.map(country => {
    return {
      "data-name": "country_id",
      "data-value": country.id,
      key: country.id,
      text: country.name,
      value: country.id
    };
  });
};

export const buildWarehousesOptions = warehouses => {
  if (!warehouses.length) {
    return [];
  } else {
    return warehouses.map(warehouse => {
      return {
        "data-name": "warehouse_id",
        "data-value": warehouse.id,
        key: warehouse.id,
        text: warehouse.name,
        value: warehouse.id
      };
    });
  }
};

export const buildCurrenciesOptions = currencies => {
  return currencies.map(currency => {
    return {
      "data-name": "currency_id",
      "data-value": currency.id,
      key: currency.id,
      text: currency.name,
      value: currency.id
    };
  });
};

export const buildPaymentTermsOptions = paymentTerms => {
  return paymentTerms.map(term => {
    return {
      "data-name": "payment_term_id",
      "data-value": term.id,
      key: term.id,
      text: term.name,
      value: term.id
    };
  });
};

export const buildProductCategoriesOptions = categories => {
  return categories.map(category => {
    return {
      "data-name": "product_category_id",
      "data-value": category.id,
      key: category.id,
      text: category.name,
      value: category.id
    };
  });
};

export const buildProductBrandsOptions = brands => {
  return brands.map(brand => {
    return {
      "data-name": "product_brand_id",
      "data-value": brand.id,
      key: brand.id,
      text: brand.name,
      value: brand.id
    };
  });
};

export const buildSuppliersOptions = suppliers => {
  return suppliers.map(supplier => {
    return {
      "data-name": "supplier_id",
      "data-value": supplier.id,
      key: supplier.id,
      text: supplier.name,
      value: supplier.id
    };
  });
};

export const buildAddressesOptions = (addressList, dataName) => {
  return addressList.map(address => {
    return {
      "data-name": dataName,
      "data-value": address.id,
      key: address.id,
      text: address.company_name,
      value: address.id
    };
  });
};

export const buildContactsOptions = (contactList, dataName) => {
  return contactList.map(contact => {
    return {
      "data-name": dataName,
      "data-value": contact.id,
      key: contact.id,
      text: `${contact.first_name} ${contact.last_name}`,
      value: contact.id
    };
  });
};

export const buildProductOptions = products => {
  return products.map(product => {
    return {
      "data-name": "product_id",
      "data-value": product.id,
      key: product.id,
      text: product.sku,
      value: product.id,
      content: <Header content={product.sku} subheader={product.name} />
    };
  });
};
