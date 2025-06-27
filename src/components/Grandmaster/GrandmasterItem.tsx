import Link from "next/link";
import { forwardRef } from "react";
import { GrandmasterItemProps } from "./types";

const GrandmasterItem = forwardRef<HTMLLIElement, GrandmasterItemProps>(
  ({ username }, ref) => {
    return (
      <li ref={ref} className="list-none">
        <Link
          href={`/profile/${username}`}
          className="block w-full h-full p-4 bg-white dark:bg-neutral-800 rounded shadow hover:bg-neutral-100 dark:hover:bg-neutral-700 transition text-blue-600 break-words"
          aria-label={`View profile for ${username}`}
        >
          {username}
        </Link>
      </li>
    );
  }
);

GrandmasterItem.displayName = "GrandmasterItem";

export default GrandmasterItem;
