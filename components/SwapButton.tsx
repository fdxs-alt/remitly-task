import React from "react";
import { UpDownIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
interface Props {
  handleClick: () => void;
}

const SwapButton: React.FC<Props> = ({ handleClick }): JSX.Element => {
  return (
    <Button
      onClick={() => handleClick()}
      type="button"
      data-testid="button"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleClick();
        }
      }}
    >
      <UpDownIcon alt="swap-icon" />
    </Button>
  );
};

export default SwapButton;
