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
