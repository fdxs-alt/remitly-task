import { render } from "./custom-render";
import ErrorComponent from "../components/Error";

const exampleError = "Error occured";

describe("Error component", () => {
  it("Renders component with error string", () => {
    const { getByText } = render(<ErrorComponent error={exampleError} />);

    const el = getByText(exampleError);

    expect(el).toBeInTheDocument();
  });
});
