import "../styles/typography.scss";
import "../styles/variables.scss";
import "../styles/globals.scss";
import "../styles/gridlex.min.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import consoleLogger from "../lib/consoleLogger";
import config from "../config";

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
