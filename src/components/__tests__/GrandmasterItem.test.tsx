import { render, screen } from "@testing-library/react";
import { GrandmasterItem } from "@/components";
import "@testing-library/jest-dom";

describe("GrandmasterItem", () => {
  it("renders a link with the username", () => {
    render(
      <ul>
        <GrandmasterItem username='MagnusCarlsen' />
      </ul>
    );

    const link = screen.getByRole("link", {
      name: "View profile for MagnusCarlsen",
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/profile/MagnusCarlsen");
    expect(link).toHaveTextContent("MagnusCarlsen");
  });
});
