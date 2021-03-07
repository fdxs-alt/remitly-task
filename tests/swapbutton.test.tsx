import { fireEvent, render, screen } from "./custom-render";
import SwapButtonComponent from "../components/SwapButton";
import userEvent from "@testing-library/user-event";

const handleClick = jest.fn();

let buttonEl: HTMLElement | null = null;
beforeEach(() => {
  render(<SwapButtonComponent handleClick={handleClick} />);
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
