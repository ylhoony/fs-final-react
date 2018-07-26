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
