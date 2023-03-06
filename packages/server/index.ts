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
    nfts: nfts.ownedNfts
      .map((n) => ({
        tokenId: n.tokenId,
        title: n.title,
        description: n.description,
        contractAddress: n.contract.address,
        collectionName: n.contract.name ?? "Unknown",
        collectionImageUrl: n.contract.openSea?.imageUrl ?? null,
        imageUrl: n.media[0]?.gateway ?? null,
        balance: n.balance,
        attributes: n.rawMetadata?.attributes ?? [],
      }))
      .filter((n) => n.imageUrl),
    nextPage: nfts.pageKey,
  };
};
