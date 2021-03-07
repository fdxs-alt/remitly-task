import { render, screen } from "./custom-render";
import FlagSelectComponent from "../components/FlagSelect";
import userEvent from "@testing-library/user-event";
import { countries } from "./TestUtils";

const displayListComponent = () => {
  const flagSelectorEl = screen.getByTestId("flag-selector");

  userEvent.click(flagSelectorEl);

  const listEl = screen.getByTestId("list");

  return listEl;
};

let selectedCountry = countries[0];
const selectCountry = jest.fn();

beforeEach(() => {
  render(
    <FlagSelectComponent
      countries={countries}
      selectedCountry={selectedCountry}
      selectCountry={selectCountry}
    />
  );
});

describe("Flag Select", () => {
  it("renders properly", () => {
    const imgEl = screen.getByAltText(selectedCountry.name);

    expect(imgEl).toBeInTheDocument();
  });
  it("Does not render list component initally", () => {
    const listEl = screen.queryByTestId("list");

    expect(listEl).not.toBeInTheDocument();
  });
  it("Displays component after clicking", () => {
    const listEl = displayListComponent();

    expect(listEl).toBeInTheDocument();
  });
  it("Add focus on inital render", () => {
    displayListComponent();

    const inputEl = screen.getByPlaceholderText("Type country name");

    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveFocus();
  });

  it("Has proper child length", () => {
    const listEl = displayListComponent();

    expect(listEl.childNodes).toHaveLength(5);
  });

  it("Fliters results", () => {
    const listEl = displayListComponent();

    const inputEl = screen.getByPlaceholderText("Type country name");

    userEvent.type(inputEl, "Pol");

    expect(listEl.childNodes).toHaveLength(2);
  });
  it("Does not show any results when no matching country name", () => {
    const listEl = displayListComponent();

    const inputEl = screen.getByPlaceholderText("Type country name");

    userEvent.type(inputEl, "randomletters");

    expect(listEl.childNodes).toHaveLength(1);
  });

  it("Calls selectCountry on click", () => {
    displayListComponent();

    const countryEl = screen.getByTestId("option-Afghanistan");

    expect(countryEl).toBeInTheDocument();

    userEvent.click(countryEl);

    expect(selectCountry).toHaveBeenCalled();
    expect(selectCountry).toHaveBeenCalledWith(countries[1]);
  });

  it("Hides element on selectCounrty", () => {
    const listEl = displayListComponent();

    const countryEl = screen.getByTestId("option-Afghanistan");

    expect(countryEl).toBeInTheDocument();

    userEvent.click(countryEl);

    expect(listEl).not.toBeInTheDocument();
  });
});
