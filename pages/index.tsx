import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Error from "../components/Error";
import { reducer } from "../utils/reducer";
import { ICountry, ICurrency } from "../types/.";
import FlagSelect from "../components/FlagSelect";
import { fetchCountriesByUrl, getUrl } from "../utils/api";

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
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    (country: ICountry) => {
      dispatch({ type: "UPDATE_TO_CURR", payload: { curr: null } });
      if (country.alpha2Code !== "PL") {
        dispatch({
          type: "HANDLE_ERROR",
          payload: { error: "No data about such country" },
        });
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
        handleError(fromCurrencyCountry);
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
        handleError(toCurrencyCountry);
      }
      stopFetching();
    };

    if (toCurrencyCountry) {
      fetchCurrency();
    }
  }, [toCurrencyCountry]);

  useEffect(() => {
    if (value === 0) {
      inputRef.current.value = String(0);
    }

    if (fromCurrency && !loading) {
      if (!toCurrency) {
        inputRef.current.value = String(fromCurrency.rates[0].mid * value);
      } else {
        inputRef.current.value = String(
          (fromCurrency.rates[0].mid * value) / toCurrency.rates[0].mid
        );
      }
    }
  }, [value, toCurrencyCountry, fromCurrency, loading]);

  return (
    <Box w="100%" p="20px">
      <FormControl padding={5} backgroundColor="white">
        <FormLabel>Click on flag to select currency from</FormLabel>
        <InputGroup w="30%">
          <InputLeftElement
            padding={1}
            children={
              <FlagSelect
                countries={countries}
                selectedCountry={fromCurrencyCountry}
                selectCountry={selectFromCountry}
              />
            }
          />
          <Input
            type="number"
            placeholder="From currency"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
          />
          <InputRightElement
            mr={2}
            children={
              <Text fontWeight="700">{fromCurrencyCountry.currency.code}</Text>
            }
          />
        </InputGroup>
      </FormControl>
      <FormControl padding={5} mt={10} backgroundColor="white">
        <FormLabel>Click on flag to select currency to</FormLabel>
        <InputGroup w="30%">
          <InputLeftElement
            padding={1}
            children={
              <FlagSelect
                countries={countries}
                selectedCountry={toCurrencyCountry}
                selectCountry={selectToCountry}
              />
            }
          />
          <Input type="number" ref={inputRef} min={0} isReadOnly={true} />
          <InputRightElement
            mr={2}
            children={
              <Text fontWeight="700">{toCurrencyCountry.currency.code}</Text>
            }
          />
        </InputGroup>
      </FormControl>

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
