"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";

const SearchInput = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState("");

  //! useEffect to update searchQuery when query changes:
  useEffect(() => {
    //! Add delay to the search query:
    const delayInputTimeout = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        //! remove topic from url:
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    //! Cleanup the timeout:
    return () => clearTimeout(delayInputTimeout);
  }, [searchParams, searchQuery, pathname]);
  return (
    <div className="relative w-full md:w-fit border border-indigo-700 rounded-lg flex items-center gap-2 px-2 py-[8px] h-fit focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-200">
      <Image
        src={"/icons/search.svg"}
        alt="search-icon"
        width={16}
        height={16}
      />
      <input
        type="text"
        placeholder="Search Companion..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
      />
    </div>
  );
};

export default SearchInput;
