"use client";

import { FiLoader } from "react-icons/fi";

export default function Loader() {
  return (
    <div
      className='flex justify-center items-center flex-1 text-gray-500 gap-2'
      role='status'
      aria-live='polite'
    >
      <FiLoader
        className='animate-spin text-2xl'
        aria-hidden='true'
        data-testid='loader-icon'
      />
      <span aria-hidden='true'>Loading...</span>
    </div>
  );
}
