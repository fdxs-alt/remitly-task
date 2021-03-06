import { Img, Text, Box, Input, Flex } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ICountry } from "../types";
import useClickOutside from "../utils/useClickOutside";
import Option from "./Option";
export interface Props {
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
  const [filterValue, setFilterValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>();
  const containerRef = useRef<HTMLDivElement | null>();
  const filteredCountries = useMemo(
    () =>
      countries.filter((el) =>
        el.name.toLowerCase().includes(filterValue.toLowerCase())
      ),
    [filterValue]
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setFilterValue("");
  }, [selectOpen]);

  useClickOutside(containerRef, () => {
    setSelectOpen(false);
  });

  return (
    <Box position="relative" ref={containerRef}>
      <Flex
        justifyContent="space-between"
        align="center"
        w="40px"
        onClick={() => setSelectOpen(true)}
        cursor="pointer"
      >
        <Img src={selectedCountry.flag} width={25} cursor="pointer" />
        <Img src="/expand-button.svg" w="10px" />
      </Flex>
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
          <Input
            ref={inputRef}
            type="text"
            fontSize="12px"
            height={25}
            value={filterValue}
            borderRadius={0}
            mb={2}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          {filteredCountries.map((el, i) => (
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
