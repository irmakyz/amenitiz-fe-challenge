import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { FiUser, FiBarChart2 } from "react-icons/fi";

import { Tabs } from "@/components";
import type { TabsProps } from "@/components/Profile/types";

describe("Tabs", () => {
  const tabs: TabsProps["tabs"] = [
    {
      label: "Info",
      icon: <FiUser data-testid='icon-user' />,
      content: <div data-testid='tab-content'>Info content</div>,
    },
    {
      label: "Stats",
      icon: <FiBarChart2 data-testid='icon-stats' />,
      content: <div data-testid='tab-content'>Stats content</div>,
    },
  ];

  it("renders tab buttons with icons and labels", () => {
    render(<Tabs tabs={tabs} />);

    expect(screen.getByRole("button", { name: /info/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /stats/i })).toBeInTheDocument();

    expect(screen.getByTestId("icon-user")).toBeInTheDocument();
    expect(screen.getByTestId("icon-stats")).toBeInTheDocument();
  });

  it("displays the first tab content by default", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText("Info content")).toBeInTheDocument();
  });

  it("updates active tab and displays correct content on click", () => {
    render(<Tabs tabs={tabs} />);

    fireEvent.click(screen.getByRole("button", { name: /stats/i }));
    expect(screen.getByText("Stats content")).toBeInTheDocument();
    expect(screen.queryByText("Info content")).not.toBeInTheDocument();
  });

  it("visually highlights the active tab", () => {
    render(<Tabs tabs={tabs} />);

    const infoTab = screen.getByRole("button", { name: /info/i });
    const statsTab = screen.getByRole("button", { name: /stats/i });

    expect(infoTab).toHaveClass("text-violet-600");
    expect(statsTab).not.toHaveClass("text-violet-600");

    fireEvent.click(statsTab);
    expect(statsTab).toHaveClass("text-violet-600");
    expect(infoTab).not.toHaveClass("text-violet-600");
  });
});
