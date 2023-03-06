import { useState } from "react";
import { useRouter } from "next/router";

import SearchBar from "@/components/SearchBar";

export default function Web() {
  const router = useRouter();
  const [search, setSearch] = useState<string>();

  return (
    <div className="justify-center items-center flex flex-col min-h-[100vh]">
      <h1 className="text-6xl md:text-8xl font-bold text-center w-[90%] mb-8">
        NFT Explorer
      </h1>

      <SearchBar />
    </div>
  );
}
