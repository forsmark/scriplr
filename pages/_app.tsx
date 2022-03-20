import "../styles/globals.css";
import type { AppProps } from "next/app";

function Scriplr({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default Scriplr;
