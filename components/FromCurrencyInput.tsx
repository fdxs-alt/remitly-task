import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ICountry } from "../types";
import FlagSelect from "./FlagSelect";

interface InputProps {
  countries: ICountry[];
  setValue: (num: number) => void;
  selectFromCountry: (country: ICountry) => void;
  fromCurrencyCountry: ICountry;
}

const FromCurrencyInput: React.FC<InputProps> = ({
  countries,
  setValue,
  fromCurrencyCountry,
  selectFromCountry,
}) => {
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  return (
    <FormControl padding={5} backgroundColor="white">
      <FormLabel>Select currency to convert from</FormLabel>
      <InputGroup w="30%" size="lg">
        <InputLeftElement
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
          data-testid="from-input"
          value={inputValue.toString()}
          onChange={(e) =>
            setInputValue(Math.abs(parseFloat(e.currentTarget.value)) || 0)
          }
        />
        <InputRightElement
          mr={2}
          children={
            <Text fontWeight="700">{fromCurrencyCountry.currency.code}</Text>
          }
        />
      </InputGroup>
    </FormControl>
  );
};

export default FromCurrencyInput;
