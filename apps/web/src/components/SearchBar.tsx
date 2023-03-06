import { useState } from "react";
import { useRouter } from "next/router";
import { Search } from "lucide-react";
import { Input } from "@nft-explorer/ui";
import clsx from "clsx";

type SearchBarProps = {
  className?: string;
};

export default function SearchBar({ className }: SearchBarProps) {
  const router = useRouter();
  const [search, setSearch] = useState<string>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        router.push(`/nfts/${search}`);
      }}
      className={clsx(
        "flex flex-row items-center justify-center gap-x-4 w-[90%] lg:w-[60%] rounded-2xl bg-white/30 px-3 py-2 shadow-[20px_20px_60px_#0000000D]",
        className
      )}
    >
      <Search className="text-slate-400" />
      <Input
        className="w-full py-0 px-0 font-medium"
        placeholder="Search any ENS or Ethereum Address"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </form>
  );
}
