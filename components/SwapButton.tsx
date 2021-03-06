import React from "react";
import { UpDownIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
interface Props {
  handleClick: () => void;
}

const SwapButton: React.FC<Props> = ({ handleClick }): JSX.Element => {
  return (
    <Button onClick={() => handleClick()}>
      <UpDownIcon />
    </Button>
  );
};

export default SwapButton;
