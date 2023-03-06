import type { GetServerSidePropsContext } from "next";

import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

type CreateContextOptions =
  | CreateNextContextOptions
  | GetServerSidePropsContext;

type CreateInnerContextOptions = Partial<CreateContextOptions>;

export async function createContextInner(opts: CreateInnerContextOptions) {
  return {
    ...opts,
  };
}

export const createContext = async ({ req, res }: CreateContextOptions) => {
  const contextInner = await createContextInner({});
  return {
    ...contextInner,
    req,
    res,
  };
};
