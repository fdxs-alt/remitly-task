import { fireEvent, render, screen } from "@testing-library/react";
import SwapButtonComponent from "../components/SwapButton";
import TestWrapper from "./TestWrapper";
import userEvent from "@testing-library/user-event";

const handleClick = jest.fn();

let buttonEl: HTMLElement | null = null;
beforeEach(() => {
  render(
    <TestWrapper>
      <SwapButtonComponent handleClick={handleClick} />
    </TestWrapper>
  );
  buttonEl = screen.getByTestId("button");
});

describe("SwapButton Component", () => {
  it("Renders button properly", () => {
    expect(buttonEl).toBeInTheDocument();
  });

  it("Calls passed function on click", () => {
    userEvent.click(buttonEl);

    expect(handleClick).toBeCalledTimes(1);
  });

  it("Calls passed function on Enter press", () => {
    fireEvent.keyPress(buttonEl, {
      key: "Enter",
    });

    expect(handleClick).toBeCalledTimes(1);
  });
});
