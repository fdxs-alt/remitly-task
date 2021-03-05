import {
  Box,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useEffect, useReducer, useState } from "react";
import Error from "../components/Error";
import { reducer } from "../utils/reducer";
import { ICountry } from "../types/.";
const getUrl = (arg: string) => {
  return [
    `http://api.nbp.pl/api/exchangerates/rates/a/${arg}`,
    `http://api.nbp.pl/api/exchangerates/rates/b/${arg}`,
    `http://api.nbp.pl/api/exchangerates/rates/c/${arg}`,
  ];
};

interface Props {
  countries: ICountry[];
}

const Home: React.FC<Props> = ({ countries }) => {
  const [state, dispatch] = useReducer(reducer, {
    fromCurrencyCountry: countries[0],
    toCurrencyCountry: countries[0],
    fromCurrency: null,
    toCurrency: null,
    error: "",
  });

  const [fromCurrencyCountry, setFromCurrencyCountry] = useState(countries[0]);
  const [toCurrencyCountry, setToCurrencyCountry] = useState(countries[0]);
  const [currencyData, setCurrencyData] = useState(null);
  const [error, setError] = useState("");
  const [value, setValue] = useState(0);
  console.log(currencyData);
  useEffect(() => {
    const fetchCurrency = async () => {
      setError("");
      try {
        const response = await Promise.any(
          getUrl(fromCurrencyCountry.currency.code).map(async (el) => {
            const res = await fetch(el);

            return res.json();
          })
        );

        setCurrencyData(response);
      } catch (error) {
        setCurrencyData(null);
        setError("No data about such a currency in given country");
      }
    };
    if (fromCurrencyCountry) {
      fetchCurrency();
    }
  }, [fromCurrencyCountry]);

  return (
    <Box w="100%" p="20px">
      <Select
        value={JSON.stringify(fromCurrencyCountry)}
        w="30%"
        onChange={(e) => setFromCurrencyCountry(JSON.parse(e.target.value))}
      >
        {countries.map((el, i) => (
          <option
            key={i}
            style={{ display: "flex" }}
            value={JSON.stringify(el)}
          >
            {el.name}
          </option>
        ))}
      </Select>

      {fromCurrencyCountry && currencyData && (
        <>
          <InputGroup mt="20px" w="30%">
            <InputLeftElement
              pointerEvents="none"
              children={
                <Img
                  src={fromCurrencyCountry.flag}
                  width="100%"
                  height={10}
                  p="3px"
                />
              }
            />
            <Input
              ml={10}
              type="number"
              placeholder="Value in given currency"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
            <InputRightElement
              children={<Text fontWeight="700">{currencyData.code}</Text>}
            />
          </InputGroup>
          <InputGroup mt="20px" w="30%">
            <InputLeftElement
              pointerEvents="none"
              children={
                <Img
                  src="https://restcountries.eu/data/pol.svg"
                  width="100%"
                  height={10}
                  p="3px"
                />
              }
            />
            <Input
              ml={10}
              type="number"
              placeholder="Value in given currency"
              value={value}
            />
            <InputRightElement children={<Text fontWeight="700">PLN</Text>} />
          </InputGroup>
        </>
      )}
      {error && <Error error={error} />}
    </Box>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
