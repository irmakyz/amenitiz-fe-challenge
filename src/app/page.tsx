import { fetchGrandmasters } from "@/api/chessApi";
import HydrateClient from "@/components/HydrateClient";
import { GrandmasterList } from "@/components";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["grandmasters"],
    queryFn: fetchGrandmasters,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HydrateClient />
      <main
        className="flex flex-col min-h-screen p-6"
        role="main"
        aria-label="List of Chess Grandmasters"
      >
        <h1 className="text-3xl font-bold mb-6">Chess Grandmasters</h1>

        <div className="flex-grow flex flex-col" aria-live="polite">
          <GrandmasterList />
        </div>
      </main>
    </HydrationBoundary>
  );
}
