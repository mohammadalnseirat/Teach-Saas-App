"use client";

import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { getSubjectColor } from "@/lib/utils";

const FilterInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get("subject") || "";

  const [subject, setSubject] = useState<string>(query);

  //! useEffect to update subject when query changes:
  useEffect(() => {
    //! Add delay to the subject:
    const delayInputTimeout = setTimeout(() => {
      let newUrl = "";
      if (subject === "all") {
        if (pathname === "/companions") {
          newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["subject"],
          });
        }
        router.push(newUrl, { scroll: false });
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "subject",
          value: subject,
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    //! Cleanup the timeout:
    return () => clearTimeout(delayInputTimeout);
  }, [subject]);
  return (
    <div className="w-full md:w-64 flex justify-end sm:block">
    <Select value={subject} onValueChange={setSubject}>
      <SelectTrigger className="relative border border-indigo-700 rounded-lg  px-2 py-2 h-fit focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-200">
        <SelectValue placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent className="bg-black md:w-64 shadow  flex flex-col gap-2 border " style={{
      }}>
        <div className="flex flex-col gap-4 py-2">
        <SelectItem value="all" className="cursor-pointer bg-indigo-700 text-white hover:bg-indigo-600 capitalize">All</SelectItem>
        {subjects.map((subject) => {
          const backgroundColorSubject = getSubjectColor(subject);
          return (
            <SelectItem
              className={`capitalize cursor-pointer`}
              style={{ backgroundColor: backgroundColorSubject }}
              key={subject}
              value={subject}
            >
              {subject}
            </SelectItem>
          );
        })}
        </div>
      </SelectContent>
      </Select>
    </div>
  );
};

export default FilterInput;
