"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const Searchbar = () => {
  const [text, setText] = useState("");
  const [query] = useDebounce(text, 800);
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      router.push("/resources");
    } else {
      router.push(`/resources?search=${query}`);
    }
  }, [query, router]);

  return (
    <div className="relative rounded shadow-sm mb-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 grid place-content-center">
        <Search className="w-5 h-5" />
      </div>
      <input
        value={text}
        placeholder="Search..."
        onChange={(e) => setText(e.target.value)}
        className="block w-1/2 rounded-md border-0 py-1.5 pl-6 bg-transparent ring-0 active:ring-0"
      />
    </div>
  );
};

export default Searchbar;
