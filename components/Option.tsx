import { Box, Img, Text } from "@chakra-ui/react";
import React from "react";
import { ICountry } from "../types";

interface Props {
  country: ICountry;
  selectCountry: (country: ICountry) => void;
}

const Option: React.FC<Props> = ({ selectCountry, country }) => {
  return (
    <Box
      fontSize={12}
      d="flex"
      cursor="pointer"
      p={1}
      alignItems="center"
      tabIndex={0}
      data-testid={`option-${country.name}`}
      onClick={() => {
        selectCountry(country);
      }}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          selectCountry(country);
        }
      }}
    >
      <Img src={country.flag} width={5} alt={country.name} />
      <Text p="0px 4px">{country.name}</Text>
    </Box>
  );
};

export default Option;
