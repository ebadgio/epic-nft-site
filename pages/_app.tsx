import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { DarkModeProvider } from 'context/DarkModeContext';
import { MintedNFTsProvider } from 'context/MintedNFTsContext';

const RINKEBY_CHAIN_ID = 4;

const chains = defaultChains;

const connectors = ({ chainId }: { chainId?: number}) => {
  if (chainId !== RINKEBY_CHAIN_ID) {
    alert("You are not connected to the Rinkeby Test Network! To continue using this app please switch your network.");
  }
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
  ]
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DarkModeProvider>
      <MintedNFTsProvider>
        <Provider autoConnect connectors={connectors}>
          <Component {...pageProps} />
        </Provider>
      </MintedNFTsProvider>
    </DarkModeProvider>
  )
}

export default MyApp
