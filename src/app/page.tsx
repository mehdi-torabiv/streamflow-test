"use client";

import WalletBalances from "@/components/WalletBalances";
import useSolanaTokens from "@/hooks/useSolanaTokens";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <WalletBalances />
      <WalletMultiButton style={{}} />
    </main>
  );
}