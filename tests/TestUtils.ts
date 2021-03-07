import { ICountry } from "../types";

export const countries: ICountry[] = [
  {
    name: "Poland",
    alpha2Code: "PL",
    alpha3Code: "POL",
    flag: "https://restcountries.eu/data/pol.svg",
    currency: {
      code: "PLN",
    },
  },
  {
    name: "Afghanistan",
    alpha2Code: "AF",
    alpha3Code: "AFG",
    flag: "https://restcountries.eu/data/afg.svg",
    currency: {
      code: "AFN",
    },
  },
  {
    name: "United Kingdom of Great Britain and Northern Ireland",
    alpha2Code: "GB",
    alpha3Code: "GBR",
    flag: "https://restcountries.eu/data/gbr.svg",
    currency: {
      code: "GBP",
    },
  },
  {
    name: "United States of America",
    alpha2Code: "US",
    alpha3Code: "USA",
    flag: "https://restcountries.eu/data/usa.svg",
    currency: {
      code: "USD",
    },
  },
];
