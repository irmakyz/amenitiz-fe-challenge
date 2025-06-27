import { ReactNode } from "react";

export interface Player {
  username: string;
  name?: string;
  location?: string;
  status?: string;
  avatar?: string;
  url?: string;
  last_online: number;
  joined: number;
}

export interface PlayerStats {
  chess_blitz?: {
    last?: { rating: number };
  };
  chess_rapid?: {
    last?: { rating: number };
  };
  chess_bullet?: {
    last?: { rating: number };
  };
  chess_daily?: {
    record?: {
      win: number;
      loss: number;
      draw: number;
    };
  };
}

export interface ProfileCardProps {
  player: Player;
  stats?: PlayerStats;
}

export interface LiveClockProps {
  lastOnline: number;
}

export interface Tab {
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
}
