import { useState } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { appRouter } from "@nft-explorer/trpc/server/routers/_app";

import { truncateAddress } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";
import NFTCard from "@/components/NFTCard";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const owner = context.params?.owner as string;

  const caller = appRouter.createCaller({});
  const res = await caller.nfts({
    address: owner,
  });

  return {
    props: {
      owner,
      ...res,
    },
  };
};

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function NFTs(props: ServerSideProps) {
  const [page] = useState(props.owner);
  const [nfts, setNfts] = useState(props.nfts);

  return (
    <div className="justify-start items-center flex flex-col min-h-[100vh] py-6 gap-y-6">
      <SearchBar />

      <div className="flex flex-col items-center justify-start w-full h-full">
        {nfts.length > 0 && (
          <h1 className="text-4xl md:text-6xl font-bold text-center w-[90%] mb-8">
            {truncateAddress(props.owner)} owns {props.total} NFTs.
          </h1>
        )}

        {!nfts.length && (
          <div className="text-center flex flex-col gap-y-2 items-center">
            <span className="text-6xl">😆</span>
            <p className="font-bold text-xl">
              {truncateAddress(props.owner)} has 0 NFTs
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%]">
          {nfts.map((nft) => (
            <NFTCard key={nft.tokenId} nft={nft} />
          ))}
        </div>
      </div>
    </div>
  );
}
