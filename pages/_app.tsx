import config from "config";
import consoleLogger from "@/lib/consoleLogger";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.scss";
import "katex/dist/katex.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  if (config.showPoweredBy === undefined || config.showPoweredBy)
    consoleLogger();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
