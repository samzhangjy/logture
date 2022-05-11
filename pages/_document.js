import { Html, Head, Main, NextScript } from "next/document";
import config from "../config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/logo.png" />
        <meta name="theme-color" content="#4f46e5" />
        <meta
          name="description"
          content={config.site.subtitle}
        />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link href="https://fonts.googlefonts.cn/css?family=Roboto:300,400,500,700" rel="stylesheet" />
      </Head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
