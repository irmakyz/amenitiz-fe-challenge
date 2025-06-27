import { render, screen, act } from "@testing-library/react";
import { LiveClock } from "@/components";
import "@testing-library/jest-dom";

describe("LiveClock", () => {
  const mockNow = 1_700_000_000;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Date, "now").mockReturnValue(mockNow * 1000);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('displays the correct initial elapsed time', () => {
    const oneHourAgo = mockNow - 3600;

    render(<LiveClock lastOnline={oneHourAgo} />);
    expect(screen.getByText('01:00:00 ago')).toBeInTheDocument();
  });

  it('updates every second', () => {
    const lastOnline = mockNow - 1; 
    render(<LiveClock lastOnline={lastOnline} />);

    expect(screen.getByText('00:00:01 ago')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText('00:00:03 ago')).toBeInTheDocument();
  });
});