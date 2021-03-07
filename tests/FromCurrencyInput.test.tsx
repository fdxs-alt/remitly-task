import { render, screen } from "./custom-render";
import FromCurrencyInputComponent from "../components/FromCurrencyInput";
import { countries } from "./TestUtils";
import userEvent from "@testing-library/user-event";

const setValue = jest.fn();
const selectFromCountry = jest.fn();
const fromCurrencyCountry = countries[0];

const renderComponent = () => {
  render(
    <FromCurrencyInputComponent
      countries={countries}
      setValue={setValue}
      selectFromCountry={selectFromCountry}
      fromCurrencyCountry={fromCurrencyCountry}
    />
  );
};

describe("Renders FromCurrencyInputComponent", () => {
  it("Renders component correctly", () => {
    renderComponent();

    const codeEl = screen.getByText("PLN");
    const inputEl = screen.getByTestId("from-input");

    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveValue(0);
    expect(codeEl).toBeInTheDocument();
  });

  it("Updates input value after typing", () => {
    renderComponent();
    const inputEl = screen.getByTestId("from-input");

    userEvent.type(inputEl, "123");

    expect(inputEl).toHaveValue(123);
    expect(setValue).toHaveBeenCalled();
  });
});
