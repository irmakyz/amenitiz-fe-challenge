import dynamic from "next/dynamic";

import { fetchPlayer, fetchPlayerStats } from "@/api/chessApi";
import { ErrorHandler, Loader,  } from "@/components";
import { PlayerStats } from "@/components/Profile/types";
import Link from "next/link";

const ProfileCard = dynamic(() => import("@/components/Profile/ProfileCard"), {
  loading: () => <Loader />,
});

export default async function GrandmasterProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const player = await fetchPlayer(username).catch(() => null);

  if (!player) {
    return (
      <main
        role='main'
        aria-label='Grandmaster Profile'
        className='flex flex-col items-center justify-center min-h-screen p-6'
      >
        <ErrorHandler message='Failed to load player.' />
      </main>
    );
  }

  const stats: PlayerStats = await fetchPlayerStats(username).catch(() => ({}));

  return (
    <main
      role='main'
      aria-label={`Profile for ${player.name || player.username}`}
      className='p-6 w-full my-auto flex flex-col min-h-screen'
    >
      <Link
        href='/'
        aria-label='Go back to the list of Grandmasters'
        className='block m-0 w-max px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition self-start'
      >
        ← Back to list
      </Link>

      <ProfileCard player={player} stats={stats} />
    </main>
  );
}
