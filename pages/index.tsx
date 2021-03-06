import { Box } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import Error from "../components/Error";
import { reducer } from "../utils/reducer";
import { ICountry } from "../types/.";
import { fetchCountriesByUrl } from "../utils/api";
import FromCurrencyInput from "../components/FromCurrencyInput";
import ToCurrencyInput from "../components/ToCurrencyInput";

const PolishCurrency = {
  code: "PLN",
  currency: "PL",
  rates: [
    {
      no: "",
      mid: 1,
      effectiveDate: "",
    },
  ],
};

interface Props {
  countries: ICountry[];
}

const Home: React.FC<Props> = ({ countries }) => {
  const [
    {
      fromCurrencyCountry,
      toCurrencyCountry,
      fromCurrency,
      error,
      toCurrency,
      loading,
    },
    dispatch,
  ] = useReducer(reducer, {
    fromCurrencyCountry: countries[0],
    toCurrencyCountry: countries[0],
    fromCurrency: null,
    toCurrency: null,
    error: "",
    loading: false,
  });

  const [value, setValue] = useState(0);

  const startFetching = useCallback(() => {
    dispatch({ type: "HANDLE_ERROR", payload: { error: "" } });
    dispatch({ type: "HANDLE_LOADING", payload: { isLoading: true } });
  }, [dispatch]);

  const stopFetching = useCallback(() => {
    dispatch({ type: "HANDLE_LOADING", payload: { isLoading: false } });
  }, [dispatch]);

  const selectFromCountry = useCallback(
    (country: ICountry) => {
      dispatch({ type: "UPDATE_FROM_COUNTRY", payload: { country } });
    },
    [dispatch]
  );

  const selectToCountry = useCallback(
    (country: ICountry) => {
      dispatch({ type: "UPDATE_TO_COUNTRY", payload: { country } });
    },
    [dispatch]
  );

  const handleError = useCallback(
    (country: ICountry, type: "UPDATE_TO_CURR" | "UPDATE_FROM_CURR") => {
      if (country.alpha2Code !== "PL") {
        dispatch({ type, payload: { curr: null } });
        dispatch({
          type: "HANDLE_ERROR",
          payload: { error: "No data about such country" },
        });
      } else {
        dispatch({ type, payload: { curr: PolishCurrency } });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchCurrency = async () => {
      startFetching();
      try {
        const response = await fetchCountriesByUrl(fromCurrencyCountry);

        dispatch({ type: "UPDATE_FROM_CURR", payload: { curr: response } });
      } catch (error) {
        handleError(fromCurrencyCountry, "UPDATE_FROM_CURR");
      }
      stopFetching();
    };

    if (fromCurrencyCountry) {
      fetchCurrency();
    }
  }, [fromCurrencyCountry]);

  useEffect(() => {
    const fetchCurrency = async () => {
      startFetching();
      try {
        const response = await fetchCountriesByUrl(toCurrencyCountry);

        dispatch({ type: "UPDATE_TO_CURR", payload: { curr: response } });
      } catch (error) {
        handleError(toCurrencyCountry, "UPDATE_TO_CURR");
      }
      stopFetching();
    };

    if (toCurrencyCountry) {
      fetchCurrency();
    }
  }, [toCurrencyCountry]);

  return (
    <Box w="100%" p="20px">
      <FromCurrencyInput
        countries={countries}
        setValue={(num) => setValue(num)}
        fromCurrencyCountry={fromCurrencyCountry}
        value={value}
        selectFromCountry={selectFromCountry}
      />
      <ToCurrencyInput
        countries={countries}
        value={value}
        loading={loading}
        fromCurrency={fromCurrency}
        selectToCountry={selectToCountry}
        toCurrency={toCurrency}
        toCurrencyCountry={toCurrencyCountry}
      />
      {error && <Error error={error} />}
    </Box>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const response = await fetch("https://restcountries.eu/rest/v2/all");

  if (!response.ok) {
    return { props: { countries: null } };
  }

  const data = await response.json();

  const countries = data.map(
    ({ name, alpha2Code, alpha3Code, flag, currencies }) => ({
      name,
      alpha2Code,
      alpha3Code,
      flag,
      currency: currencies[0],
    })
  );

  return { props: { countries } };
};
