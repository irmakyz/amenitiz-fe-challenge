"use client";

import React, { useState, useRef, useEffect } from "react";
import { TabsProps } from "./types";

const Tabs = ({ tabs }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentTab = tabRefs.current[activeIndex];
    const indicator = indicatorRef.current;
    if (currentTab && indicator) {
      indicator.style.width = `${currentTab.offsetWidth}px`;
      indicator.style.left = `${currentTab.offsetLeft}px`;
    }
  }, [activeIndex]);

  return (
    <div className='w-full'>
      {/* Tabs Header */}
      <div className=' flex justify-center gap-2 bg-violet-100 rounded-md self-center mx-auto'>
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            onClick={() => setActiveIndex(idx)}
            className={`flex items-center justify-center gap-1 px-2 py-2 font-medium transition-colors duration-200 ease-in-out rounded-t-md hover:bg-violet-600 hover:text-white cursor-pointer
      ${
        activeIndex === idx
          ? "text-violet-600 border-b border-violet-600"
          : "text-gray-500"
      }`}
          >
            <span className='block sm:hidden'>{tab.icon}</span>
            <span className='hidden sm:block'>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className='mt-6 flex flex-col justify-center'>
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}
export default React.memo(Tabs);