"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { FiUser, FiBarChart2 } from "react-icons/fi";

import type { ProfileCardProps } from "./types";
import { ProfileInfo, ProfileStats, Loader } from "@/components";


const Tabs = dynamic(() => import("@/components/Profile/Tabs"), {
  loading: () => <Loader />,
});

export default function ProfileCard({ player, stats }: ProfileCardProps) {
  const displayName = player.name || player.username;

  return (
    <div
      className='p-1 sm:p-8 bg-white dark:bg-neutral-800 rounded shadow flex flex-col items-center space-y-4 w-full max-w-2xl m-auto'
      role='region'
      aria-label={`Profile card for ${displayName}`}
    >
      <h1 className='text-1xl sm:text-3xl font-bold text-center'>
        {displayName}
      </h1>

      {player.avatar && (
        <div className='relative w-18 h-18 sm:w-32 sm:h-32'>
          <Image
            src={player.avatar}
            alt={`Avatar of ${displayName}`}
            className='rounded-full'
            fill
          />
        </div>
      )}

      <Tabs
        tabs={[
          {
            label: "Personal Info",
            icon: <FiUser size={14} />,
            content: <ProfileInfo player={player} />,
          },
          {
            label: "Game Stats",
            icon: <FiBarChart2 size={14} />,
            content: <ProfileStats stats={stats} />,
          },
        ]}
      />
    </div>
  );
}
