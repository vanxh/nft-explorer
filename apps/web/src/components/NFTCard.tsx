import Image from "next/image";

import type { NFT } from "@/lib/types";

type NFTCardProps = {
  nft: NFT;
};

export default function NFTCard({ nft }: NFTCardProps) {
  return (
    <div
      key={nft.tokenId}
      className="flex flex-col gap-y-1 h-full w-full justify-center items-center"
    >
      <Image
        className="rounded-2xl bg-white shadow-[20px_20px_60px_#0000000D] cursor-pointer hover:scale-105 active:scale-90 ease-in-out transition-all transform-gpu"
        src={nft.imageUrl}
        alt="NFT image"
        width={250}
        height={250}
        loading="lazy"
        draggable={false}
      />
      <p className="font-medium">{nft.title}</p>
    </div>
  );
}
