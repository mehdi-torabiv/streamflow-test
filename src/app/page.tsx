"use client";

import WalletBalances from "@/components/shared/WalletBalances";
import { getAllStreams } from "@/services/StreamflowService";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";

export default function Home() {
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet.connected) {
      wallet.connect();
    }

    const data = getAllStreams('26ifKCEZvtPm99wbxpvZcU8Y3swHfpaRFBBt2f3jsxNU');
    console.log({ data });

  }, [wallet])
  return (
    <div>
      <WalletBalances />
    </div>
  );
}