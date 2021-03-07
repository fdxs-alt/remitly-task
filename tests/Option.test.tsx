import { fireEvent, render, screen } from "./custom-render";
import OptionComponent from "../components/Option";
import { ICountry } from "../types";
import userEvent from "@testing-library/user-event";

const country: ICountry = {
  name: "Poland",
  alpha2Code: "PL",
  alpha3Code: "POL",
  flag: "https://restcountries.eu/data/pol.svg",
  currency: {
    code: "PLN",
  },
};
const selectCountry = jest.fn();

beforeEach(() => {
  render(<OptionComponent country={country} selectCountry={selectCountry} />);
});

describe("Option Component", () => {
  it("Renders component properly", () => {
    const wrapperEl = screen.getByTestId("option-Poland");

    expect(wrapperEl).toBeInTheDocument();
  });

  it("Renders flag image properly", () => {
    const imageEl = screen.getByAltText("Poland");

    expect(imageEl).toBeInTheDocument();
  });

  it("Calls passed function on click", () => {
    const wrapperEl = screen.getByTestId("option-Poland");

    userEvent.click(wrapperEl);

    expect(selectCountry).toBeCalledTimes(1);
  });

  it("Calls passed function on Enter press", () => {
    const wrapperEl = screen.getByTestId("option-Poland");

    fireEvent.keyPress(wrapperEl, {
      key: "Enter",
    });

    expect(selectCountry).toBeCalledTimes(1);
    expect(selectCountry).toHaveBeenCalledWith(country);
  });
});
