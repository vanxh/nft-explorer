export type NFT = {
  tokenId: string;
  title: string;
  description: string;
  contractAddress: string;
  collectionName: string;
  collectionImageUrl: string | null;
  imageUrl: string;
  balance: number;
};
