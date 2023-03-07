import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { appRouter } from "@nft-explorer/trpc/server/routers/_app";
import { trpc } from "@nft-explorer/trpc/react";

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
  const { data, fetchNextPage, hasNextPage, isLoading, isInitialLoading } =
    trpc.nfts.useInfiniteQuery(
      {
        address: props.owner,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const nfts = Array.from(
    new Set(
      data?.pages.reduce(
        (acc, page) => [...acc, ...page.nfts],
        [] as typeof props.nfts
      ) || []
    )
  ).sort((a, b) => b.title.localeCompare(a.title));

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

        {nfts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%]">
              {nfts.map((nft) => (
                <NFTCard key={nft.contractAddress + nft.tokenId} nft={nft} />
              ))}
            </div>
            {hasNextPage && (
              <button
                className="mt-5 font-medium active:scale-90 ease-in-out transition-all"
                onClick={() => fetchNextPage()}
                disabled={isLoading || isInitialLoading}
              >
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
