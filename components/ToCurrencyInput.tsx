import React, { useEffect, useRef } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import FlagSelect from "./FlagSelect";
import { ICountry, ICurrency } from "../types";

interface InputProps {
  countries: ICountry[];
  value: number;
  selectToCountry: (country: ICountry) => void;
  toCurrencyCountry: ICountry;
  fromCurrency: ICurrency;
  loading: boolean;
  toCurrency: ICurrency;
}

const ToCurrencyInput: React.FC<InputProps> = ({
  countries,
  toCurrencyCountry,
  selectToCountry,
  value,
  fromCurrency,
  loading,
  toCurrency,
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (value === 0) {
      inputRef.current.value = String(0);
    }

    if (fromCurrency && toCurrency && !loading) {
      const result =
        (fromCurrency.rates[0].mid * value) / toCurrency.rates[0].mid;
      inputRef.current.value = (
        Math.round((result + Number.EPSILON) * 100000) / 100000
      ).toString();
    }
  }, [value, fromCurrency, toCurrency, loading]);

  return (
    <FormControl padding={5} mt={10} backgroundColor="white">
      <FormLabel>Click on flag to select currency to</FormLabel>
      <InputGroup w="30%" size="lg">
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
  );
};

export default ToCurrencyInput;
