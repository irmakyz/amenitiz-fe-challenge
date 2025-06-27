"use client";

import Image from "next/image";

import { ErrorHandlerProps } from "./types";

export default function ErrorHandler({ message }: ErrorHandlerProps) {
  return (
    <div
      role='alert'
      aria-live='assertive'
      className='flex flex-col justify-center items-center flex-1 text-center gap-4 p-4'
    >
      <Image
        src='/error.png'
        alt='Illustration of an error state'
        width={40}
        height={40}
        className='h-auto'
      />
      <h2 className='text-red-600 font-semibold text-lg'>
        {message || "Failed to load items."}
      </h2>
      <p className='text-gray-500 text-sm'>Please try again later.</p>
    </div>
  );
}
