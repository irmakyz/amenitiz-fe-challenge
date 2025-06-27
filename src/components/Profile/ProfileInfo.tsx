'use client';

import { LiveClock } from '@/components';
import { formatDate } from '@/utils/time';
import { Player } from './types';

export default function ProfileInfo({ player }: { player: Player }) {
  const joinedDate = formatDate(player.joined * 1000);

  return (
    <ul
      className="space-y-2 text-center text-xs sm:text-lg"
      role="list"
      aria-label={`Profile information for ${player.username}`}
    >
      <li>
        <strong>Username:</strong> {player.username}
      </li>
      <li>
        <strong>Location:</strong> {player.location || 'Unknown'}
      </li>
      <li>
        <strong>Joined:</strong> {joinedDate}
      </li>
      <li>
        <strong>Status:</strong>{' '}
        {player.status === 'online' ? (
          <>
            Online now <span role="img" aria-label="online">🟢</span>
          </>
        ) : (
          player.status
        )}
      </li>
      <li>
        <LiveClock lastOnline={player.last_online} />
      </li>
      <li>
        <strong>Profile:</strong>{' '}
        <a
          href={player.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
          aria-label={`View ${player.username}'s profile on Chess.com`}
        >
          View on Chess.com
        </a>
      </li>
    </ul>
  );
}
