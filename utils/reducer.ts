import { ICountry, ICurrency } from "../types";

interface State {
  error: string;
  toCurrencyCountry: ICountry;
  fromCurrencyCountry: ICountry;
  fromCurrency?: ICurrency;
  toCurrency?: ICurrency;
}

type UPDATE_TO_COUNTRY = {
  type: "UPDATE_TO_COUNTRY";
  payload: { country: ICountry };
};

type UPDATE_FROM_COUNTRY = {
  type: "UPDATE_FROM_COUNTRY";
  payload: { country: ICountry };
};

type UPDATE_FROM_CURR = {
  type: "UPDATE_FROM_CURR";
  payload: { curr: ICurrency };
};

type UPDATE_TO_CURR = {
  type: "UPDATE_TO_CURR";
  payload: { curr: ICurrency };
};

type HANDLE_ERROR = {
  type: "HANDLE_ERROR";
  payload: { error: string };
};

type ACTION =
  | UPDATE_TO_COUNTRY
  | UPDATE_FROM_COUNTRY
  | UPDATE_TO_CURR
  | UPDATE_FROM_CURR
  | HANDLE_ERROR;

export const reducer = (state: State, action: ACTION) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
