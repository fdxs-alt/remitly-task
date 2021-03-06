import { ICountry, ICurrency } from "../types";

export const getUrl = (arg: string) => {
  return [
    `http://api.nbp.pl/api/exchangerates/rates/a/${arg}`,
    `http://api.nbp.pl/api/exchangerates/rates/b/${arg}`,
    `http://api.nbp.pl/api/exchangerates/rates/c/${arg}`,
  ];
};

export const fetchCountriesByUrl = async (country: ICountry) => {
  return (await Promise.any(
    getUrl(country.currency.code).map(async (el) => {
      const res = await fetch(el);

      return res.json();
    })
  )) as ICurrency;
};
