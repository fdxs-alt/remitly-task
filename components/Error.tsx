import { Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import React from "react";

interface Props {
  error: string;
}
const Error: React.FC<Props> = ({ error }) => {
  return (
    <Alert status="error" mt="30px" w="30%">
      <AlertIcon />
      <AlertTitle mr={2}>{error}</AlertTitle>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  );
};

export default Error;
