import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ICountry } from "../types";
import FlagSelect from "./FlagSelect";

interface InputProps {
  countries: ICountry[];
  value: number;
  setValue: (num: number) => void;
  selectFromCountry: (country: ICountry) => void;
  fromCurrencyCountry: ICountry;
}

const FromCurrencyInput: React.FC<InputProps> = ({
  countries,
  value,
  setValue,
  fromCurrencyCountry,
  selectFromCountry,
}) => {
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
          value={value.toString()}
          onChange={(e) => setValue(Math.abs(parseFloat(e.target.value)) || 0)}
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
