import { Img, Text, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { ICountry } from "../types";
import Option from "./Option";
interface Props {
  countries: ICountry[];
  selectedCountry: ICountry;
  selectCountry: (country: ICountry) => void;
}

const FlagSelect: React.FC<Props> = ({
  selectedCountry,
  countries,
  selectCountry,
}) => {
  const [selectOpen, setSelectOpen] = useState(false);

  return (
    <Box position="relative">
      <Img
        src={selectedCountry.flag}
        width={50}
        onClick={() => setSelectOpen(true)}
        cursor="pointer"
      />
      {selectOpen && (
        <Box
          w="150px"
          h="100px"
          overflow="auto"
          border="1px solid grey"
          position="absolute"
          zIndex={0}
          backgroundColor="white"
        >
          {countries.map((el, i) => (
            <Option
              key={i}
              country={el}
              selectCountry={(c: ICountry) => {
                selectCountry(c);
                setSelectOpen(false);
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FlagSelect;
