'use client';

import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, PublicKey } from '@solana/web3.js';
import configs from '@/configs';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

interface WalletProps {
  children?: ReactNode;
}

const Wallet: FC<WalletProps> = ({ children }: WalletProps) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [
    new PhantomWalletAdapter()
  ], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContent>{children}</WalletContent>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const WalletContent: FC<{ children: ReactNode }> = ({ children }) => {
  const { connected, publicKey, disconnect } = useWallet();
  const [currentPublicKey, setCurrentPublicKey] = useState(publicKey);

  useEffect(() => {
    const provider = (window as any).phantom?.solana;

    if (!provider) {
      disconnect();
      return;
    }

    const handleAccountChange = (newPublicKey: PublicKey | null) => {
      if (
        newPublicKey &&
        newPublicKey.toBase58() !== currentPublicKey?.toBase58()
      ) {
        disconnect();
        setCurrentPublicKey(null);
      }
    };

    provider.on('accountChanged', handleAccountChange);

    return () => {
      provider.off('accountChanged', handleAccountChange);
    };
  }, [currentPublicKey, disconnect]);

  useEffect(() => {
    setCurrentPublicKey(publicKey);
  }, [publicKey]);

  return (
    <>
      {connected ? (
        children
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <WalletMultiButton
            style={{
              background: configs.theme.palette.primary.main,
            }}
          />
        </div>
      )}
    </>
  );
};

export default Wallet;
