import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
const TestWrapper: React.FC = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default TestWrapper;
