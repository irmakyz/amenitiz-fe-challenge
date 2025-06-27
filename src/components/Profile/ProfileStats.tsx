'use client';

import { PlayerStats } from './types';

export default function ProfileStats({ stats }: { stats?: PlayerStats }) {
  if (!stats || Object.keys(stats).length === 0) {
    return (
      <div className="w-full overflow-x-auto mb-2">
        <p
          className="text-gray-500 dark:text-gray-400 text-sm sm:text-center"
          role="status"
        >
          No stats available for this player.
        </p>
      </div>
    );
  }

  const totalGames = stats?.chess_daily?.record
    ? stats.chess_daily.record.win +
      stats.chess_daily.record.loss +
      stats.chess_daily.record.draw
    : undefined;

  return (
    <div
      className="w-full overflow-x-auto mb-2"
      role="region"
      aria-label="Chess statistics"
    >
      <table
        className="min-w-full border border-gray-200 dark:border-gray-700 rounded shadow-sm overflow-hidden"
        role="table"
        aria-label="Table of game types and ratings"
      >
        <caption className="sr-only">Chess ratings by game type</caption>
        <thead className="bg-gray-100 dark:bg-gray-700 text-left text-xs sm:text-sm uppercase tracking-wider text-gray-600 dark:text-gray-300">
          <tr>
            <th scope="col" className="px-0.5 sm:px-4 py-2">
              Game Type
            </th>
            <th scope="col" className="px-0.5 sm:px-4 py-2">
              Rating
            </th>
          </tr>
        </thead>
        <tbody className="text-xs sm:text-sm divide-y divide-gray-200 dark:divide-gray-700">
          {[
            { label: 'Blitz', value: stats?.chess_blitz?.last?.rating },
            { label: 'Rapid', value: stats?.chess_rapid?.last?.rating },
            { label: 'Bullet', value: stats?.chess_bullet?.last?.rating },
            { label: 'Daily Games Played', value: totalGames },
          ].map((row) => (
            <tr
              key={row.label}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td
                scope="row"
                className="px-0.5 sm:px-4 py-2 font-medium text-gray-800 dark:text-gray-200"
              >
                {row.label}
              </td>
              <td className="px-0.5 sm:px-4 py-2">{row.value ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
