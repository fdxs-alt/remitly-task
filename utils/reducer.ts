import { ICountry, ICurrency } from "../types";

interface State {
  error: string;
  toCurrencyCountry: ICountry;
  fromCurrencyCountry: ICountry;
  fromCurrency?: ICurrency;
  toCurrency?: ICurrency;
  loading: boolean;
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

type HANDLE_LOADING = {
  type: "HANDLE_LOADING";
  payload: { isLoading: boolean };
};

type SWITCH_VALUES = {
  type: "SWITCH_VALUES";
};

type ACTION =
  | UPDATE_TO_COUNTRY
  | UPDATE_FROM_COUNTRY
  | UPDATE_TO_CURR
  | UPDATE_FROM_CURR
  | HANDLE_ERROR
  | HANDLE_LOADING
  | SWITCH_VALUES;

export const reducer = (state: State, action: ACTION) => {
  switch (action.type) {
    case "HANDLE_ERROR":
      return { ...state, error: action.payload.error };
    case "UPDATE_FROM_COUNTRY":
      return { ...state, fromCurrencyCountry: action.payload.country };
    case "UPDATE_FROM_CURR":
      return { ...state, fromCurrency: action.payload.curr };
    case "UPDATE_TO_COUNTRY":
      return { ...state, toCurrencyCountry: action.payload.country };
    case "UPDATE_TO_CURR":
      return { ...state, toCurrency: action.payload.curr };
    case "HANDLE_LOADING":
      return { ...state, loading: action.payload.isLoading };
    case "SWITCH_VALUES":
      let fromCopy = { ...state.fromCurrencyCountry };
      let toCopy = { ...state.toCurrencyCountry };
      return {
        ...state,
        toCurrencyCountry: fromCopy,
        fromCurrencyCountry: toCopy,
      };
    default:
      return { ...state };
  }
};
