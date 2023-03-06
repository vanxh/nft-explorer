import { z } from "zod";
import { getNftsForOwner } from "@nft-explorer/server";

import { router, publicProcedure } from "../trpc";

export const appRouter = router({
  nfts: publicProcedure
    .input(
      z.object({
        address: z.string(),
      })
    )
    .query(({ input }) => {
      return getNftsForOwner(input.address);
    }),
});

export type AppRouter = typeof appRouter;
