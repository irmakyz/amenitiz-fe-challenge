import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ErrorHandler } from "@/components";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

describe("ErrorHandler", () => {
  it("renders with default message when none is provided", () => {
    render(<ErrorHandler />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Failed to load items."
    );
    expect(screen.getByText("Please try again later.")).toBeInTheDocument();
  });

  it("renders with a custom error message", () => {
    render(<ErrorHandler message='Something went wrong.' />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Something went wrong."
    );
  });

  it("includes error image with accessible alt text", () => {
    render(<ErrorHandler />);
    const image = screen.getByRole("img", {
      name: /illustration of an error state/i,
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/error.png");
  });

  it("has appropriate accessibility attributes", () => {
    const alert = render(<ErrorHandler />).getByRole("alert");
    expect(alert).toHaveAttribute("aria-live", "assertive");
  });
});
