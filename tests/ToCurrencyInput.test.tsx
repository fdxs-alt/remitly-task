import { render, screen } from "./custom-render";
import ToCurrencyInputComponent from "../components/ToCurrencyInput";
import { countries } from "./TestUtils";
import { ICurrency } from "../types";

const toCurrency: ICurrency = {
  code: "GBP",
  currency: "GBP",
  mid: 5.5,
};

const fromCurrency: ICurrency = {
  code: "USD",
  currency: "USD",
  mid: 3.5,
};

const selectToCountry = jest.fn();

const renderComponent = () => {
  render(
    <ToCurrencyInputComponent
      countries={countries}
      loading={false}
      value={123}
      key={1}
      toCurrencyCountry={countries[2]}
      selectToCountry={selectToCountry}
      toCurrency={toCurrency}
      fromCurrency={fromCurrency}
    />
  );
};

describe("ToCurrencyInput component", () => {
  it("Renders properly", () => {
    renderComponent();
    const codeEl = screen.getByText("GBP");
    const inputEl = screen.getByTestId("to-input");

    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveProperty("disabled");
    expect(codeEl).toBeInTheDocument();
  });
  it("Count value properly", () => {
    renderComponent();
    const inputEl = screen.getByTestId("to-input");

    expect(inputEl).toHaveValue(78.27);
  });
});
