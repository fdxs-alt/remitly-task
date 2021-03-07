import { render } from "@testing-library/react";
import ErrorComponent from "../components/Error";
import TestWrapper from "./TestWrapper";

const exampleError = "Error occured";

describe("Error component", () => {
  it("Renders component with error string", () => {
    const { getByText } = render(
      <TestWrapper>
        <ErrorComponent error={exampleError} />
      </TestWrapper>
    );

    const el = getByText(exampleError);

    expect(el).toBeInTheDocument();
  });
});
