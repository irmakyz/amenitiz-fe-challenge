import { render, screen } from "@testing-library/react";
import { ProfileInfo } from "@/components";
import type { Player } from "@/components/Profile/types";
import "@testing-library/jest-dom";

jest.mock('@/components/Profile/LiveClock', () => ({
  __esModule: true,
  default: () => <span data-testid="live-clock">Mocked LiveClock</span>,
}));

const mockPlayer: Player = {
  username: "MagnusCarlsen",
  name: "Magnus Carlsen",
  avatar: "https://example.com/avatar.png",
  location: "Norway",
  joined: 1577836800,
  status: "online",
  last_online: Math.floor(Date.now() / 1000) - 3600,
  url: "https://www.chess.com/member/magnuscarlsen",
};

describe("ProfileInfo", () => {
  it("renders username, location, joined date, status, and profile link", () => {
    render(<ProfileInfo player={mockPlayer} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText(/magnuscarlsen/i)).toBeInTheDocument();
    expect(screen.getByText(/norway/i)).toHaveTextContent("Norway");
    expect(screen.getByText(/Jan 1, 2020/i)).toBeInTheDocument();
    expect(screen.getByText(/online/i)).toHaveTextContent("Online now");

    const profileLink = screen.getByRole("link", {
      name: `View ${mockPlayer.username}'s profile on Chess.com`,
    });
    expect(profileLink).toHaveAttribute("href", mockPlayer.url);

    expect(screen.getByTestId("live-clock")).toBeInTheDocument();
  });
});
