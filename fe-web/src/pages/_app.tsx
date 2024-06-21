import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { WalletContextProvider } from '@/contexts/WalletContextProvider';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useMemo, useState } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  BackpackWalletAdapter,
  SolletWalletAdapter,
  SolletExtensionWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import Layout from '@/components/layout/Layout';
import { AppContextProvider } from '@/contexts/AppProvider';
import { Elusiv } from '@elusiv/sdk';
import { QueryClient, QueryClientProvider } from 'react-query';

require('@solana/wallet-adapter-react-ui/styles.css');

export default function App({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new BackpackWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );
  const [queryClient] = useState(() => new QueryClient());
  const [elusiv, setElusiv] = useState<Elusiv | undefined>();
  return (
    <QueryClientProvider client={queryClient}>
      <WalletContextProvider
        endpoint={endpoint}
        network={network}
        wallets={wallets}
      >
        <AppContextProvider
          wallet={{
            elusiv: elusiv,
            setElusiv: setElusiv,
          }}
        >
          <ChakraProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </AppContextProvider>
      </WalletContextProvider>
    </QueryClientProvider>
  );
}
