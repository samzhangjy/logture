import "../styles/typography.scss";
import "../styles/variables.scss";
import "../styles/globals.scss";
import "../styles/gridlex.min.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
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
