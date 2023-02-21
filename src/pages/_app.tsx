import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../components/ThemeContext";
import "aos/dist/aos.css";
import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "../components/stateManager/store";
import { Fragment } from "react";

const filChain = {
  id: 3141,
  name: "Filecoin - Hyperspace testnet",
  network: "hyperspace",
  nativeCurrency: {
    decimals: 18,
    name: "Filecoin",
    symbol: "tFIL",
  },
  rpcUrls: {
    default: "https://api.hyperspace.node.glif.io/rpc/v1",
  },
  blockExplorers: {
    default: { name: "FilFox Scan", url: "https://hyperspace.filfox.info/en/" },
  },
  testnet: true,
};

const { chains, provider, webSocketProvider } = configureChains(
  [filChain],
  [
    // @ts-ignore
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://api.hyperspace.node.glif.io/rpc/v1`,
      }),
    }),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <WagmiConfig client={client}>
        <StoreProvider>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </StoreProvider>
      </WagmiConfig>

      <div id="app-bottom-sheet" />
      <div id="app-modal-root" />
    </Fragment>
  );
}

export default MyApp;
