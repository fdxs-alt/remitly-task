import { render, screen } from "@testing-library/react";
import ErrorComponent from "../components/Error";
import TestWrapper from "./TestWrapper";

const exampleError = "Error occured";

it("Error component", () => {
  render(
    <TestWrapper>
      <ErrorComponent error={exampleError} />
    </TestWrapper>
  );

  const el = screen.getByText(exampleError);

  expect(el).toBeInTheDocument();
});
