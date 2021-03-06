export interface ICountry {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  flag: string;
  currency: {
    code: string;
  };
}

export interface ICurrency {
  code: string;
  currency: string;
  rates: {
    no: string;
    mid: number;
    effectiveDate: string;
  }[];
}
