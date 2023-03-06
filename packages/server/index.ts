import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY as string,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

export const getNftsForOwner = async (owner: string) => {
  const nfts = await alchemy.nft.getNftsForOwner(owner);

  return {
    total: nfts.totalCount,
    nfts: nfts.ownedNfts,
    prevPage: owner,
    nextPage: nfts.pageKey,
  };
};
