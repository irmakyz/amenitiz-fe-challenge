import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GrandmasterList } from "@/components";
import * as api from "@/api/chessApi";
import "@testing-library/jest-dom";

jest.mock("@/api/chessApi");

const mockedFetchGrandmasters = api.fetchGrandmasters as jest.Mock;

const renderWithQueryProvider = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("GrandmasterList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loader while loading", async () => {
    mockedFetchGrandmasters.mockReturnValue(
      new Promise(() => {}) 
    );

    renderWithQueryProvider(<GrandmasterList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error message on fetch failure", async () => {
    mockedFetchGrandmasters.mockRejectedValue(new Error("API failed"));

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <GrandmasterList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/failed to load grandmasters/i)
      ).toBeInTheDocument();
    });
  });

  it("renders grandmasters on success", async () => {
    mockedFetchGrandmasters.mockResolvedValue([
      "MagnusCarlsen",
      "Hikaru",
      "Firouzja2003",
    ]);

    renderWithQueryProvider(<GrandmasterList />);
    await waitFor(() => {
      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.getByText("MagnusCarlsen")).toBeInTheDocument();
      expect(screen.getByText("Hikaru")).toBeInTheDocument();
      expect(screen.getByText("Firouzja2003")).toBeInTheDocument();
    });
  });
});
