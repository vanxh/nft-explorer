import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const appRouter = router({
  nfts: publicProcedure
    .input(
      z.object({
        address: z.string(),
      })
    )
    .query(({ input }) => {
      // TODO: Implement
      return [];
    }),
});

export type AppRouter = typeof appRouter;
