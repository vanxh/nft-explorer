import type { AppProps } from "next/app";

import "@/styles/globals.css";
import Layout from "@/components/Layout";
import Metatags from "@/components/Metatags";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Metatags />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
