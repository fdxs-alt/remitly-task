import { ICountry, ICurrency } from "../types";

export const fetchCountriesByCountryCode = async (
  country: ICountry
): Promise<ICurrency> => {
  return (await fetch(`/api/${country.currency.code}`)).json();
};
