import type { AppProps } from "next/app";
import { trpc } from "@nft-explorer/trpc/react";

import "@/styles/globals.css";
import Layout from "@/components/Layout";
import Metatags from "@/components/Metatags";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Metatags />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default trpc.withTRPC(MyApp);
