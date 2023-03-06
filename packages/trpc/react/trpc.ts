import superjson from "superjson";

import { httpBatchLink } from "../client/links/httpBatchLink";
import { httpLink } from "../client/links/httpLink";
import { loggerLink } from "../client/links/loggerLink";
import { splitLink } from "../client/links/splitLink";
import { createTRPCNext } from "../next";
import type { TRPCClientErrorLike } from "../react";
import type { inferRouterInputs, inferRouterOutputs, Maybe } from "../server";
import type { AppRouter } from "../server/routers/_app";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    const url =
      typeof window !== "undefined"
        ? "/api/trpc"
        : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/trpc`
        : `http://${process.env.NEXT_PUBLIC_WEBAPP_URL}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            opts.direction === "down" && opts.result instanceof Error,
        }),
        splitLink({
          condition: (op) => {
            return op.context.skipBatch === true;
          },
          true: httpLink({ url }),
          false: httpBatchLink({
            url,
          }),
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 1000,
            retry(failureCount, _err) {
              const err = _err as never as Maybe<
                TRPCClientErrorLike<AppRouter>
              >;
              const code = err?.data?.code;
              if (code === "BAD_REQUEST") {
                return false;
              }
              const MAX_QUERY_RETRIES = 3;
              return failureCount < MAX_QUERY_RETRIES;
            },
          },
        },
      },
      transformer: superjson,
    };
  },
  ssr: false,
});

export const transformer = superjson;

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
