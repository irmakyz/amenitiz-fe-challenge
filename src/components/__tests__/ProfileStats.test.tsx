import { render, screen } from '@testing-library/react';
import {ProfileStats} from '@/components';
import type { PlayerStats } from '@/components/Profile/types';
import '@testing-library/jest-dom';

describe('ProfileStats', () => {
  it('renders fallback when stats are missing or empty', () => {
    render(<ProfileStats />);
    expect(
      screen.getByText(/no stats available for this player/i)
    ).toBeInTheDocument();
  });

  it('renders stats table with correct values', () => {
    const mockStats: PlayerStats = {
      chess_blitz: { last: { rating: 2500 } },
      chess_rapid: { last: { rating: 2400 } },
      chess_bullet: { last: { rating: 2600 } },
      chess_daily: {
        record: { win: 10, loss: 5, draw: 5 },
      },
    };

    render(<ProfileStats stats={mockStats} />);

    expect(
      screen.getByRole('region', { name: /chess statistics/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('table', { name: /table of game types/i })
    ).toBeInTheDocument();

    expect(screen.getByText('Blitz')).toBeInTheDocument();
    expect(screen.getByText('2500')).toBeInTheDocument();

    expect(screen.getByText('Rapid')).toBeInTheDocument();
    expect(screen.getByText('2400')).toBeInTheDocument();

    expect(screen.getByText('Bullet')).toBeInTheDocument();
    expect(screen.getByText('2600')).toBeInTheDocument();

    expect(screen.getByText('Daily Games Played')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument(); 
  });

  it('renders em-dash when stat rating is missing', () => {
    const mockStats: PlayerStats = {
      chess_blitz: {},
      chess_rapid: {},
      chess_bullet: {},
      chess_daily: { record: { win: 0, loss: 0, draw: 0 } },
    };

    render(<ProfileStats stats={mockStats} />);

    expect(screen.getAllByText('—')).toHaveLength(3);
    expect(screen.getByText('0')).toBeInTheDocument(); 
  });
});
