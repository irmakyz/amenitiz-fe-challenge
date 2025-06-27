import { render, screen } from "@testing-library/react";
import { ProfileCard } from "@/components";
import "@testing-library/jest-dom";
import type { ProfileCardProps } from "@/components/Profile/types";

const mockProps: ProfileCardProps = {
  player: {
    username: "MagnusCarlsen",
    name: "Magnus Carlsen",
    avatar: "https://example.com/avatar.png",
    location: "Norway",
    joined: 1577836800,
    status: "online",
    last_online: Math.floor(Date.now() / 1000) - 3600,
    url: "https://www.chess.com/member/magnuscarlsen",
  },
  stats: {
    chess_blitz: { last: { rating: 2900 } },
    chess_rapid: { last: { rating: 2850 } },
    chess_bullet: { last: { rating: 2950 } },
    chess_daily: { record: { win: 10, loss: 2, draw: 1 } },
  },
};

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentProps<"img"> & { fill?: unknown }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, ...rest } = props;
    return <img {...rest} />;
  },
}));

describe("ProfileCard", () => {
  it("renders player name and avatar", () => {
    render(<ProfileCard {...mockProps} />);

    const heading = screen.getByRole("heading", {
      name: mockProps.player.name,
    });

    expect(heading).toBeInTheDocument();

    const avatar = screen.getByAltText(`Avatar of ${mockProps.player.name}`);
    expect(avatar).toHaveAttribute("src", mockProps.player.avatar);
  });

  it("renders Personal Info and Game Stats tabs", () => {
    render(<ProfileCard {...mockProps} />);

    expect(
      screen.getByRole("region", { name: /profile card/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /personal info/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /game stats/i })
    ).toBeInTheDocument();
  });
});
