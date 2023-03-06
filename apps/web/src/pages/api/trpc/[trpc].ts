import * as trpcNext from "@nft-explorer/trpc/server/adapters/next";
import { createContext } from "@nft-explorer/trpc/server/createContext";
import { appRouter } from "@nft-explorer/trpc/server/routers/_app";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  batching: {
    enabled: true,
  },
});
