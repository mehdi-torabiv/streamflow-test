import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { getAllStreams } from '@/services/StreamflowService';
import { Stream } from '@streamflow/stream';

/**
 * Returns all streams of the user's wallet on the Solana blockchain.
 *
 * @export
 * @returns {{ streams: [string, Stream][] | undefined; fetchStreams; loading: boolean; error: Error | undefined; }}
 */
export function useAllStreams(): {
  streams: [string, Stream][] | undefined;
  fetchStreams: () => void;
  loading: boolean;
  error: Error | undefined;
} {
  const wallet = useWallet();
  const [streams, setStreams] = useState<[string, Stream][] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();

  const fetchStreams = async () => {
    if (!wallet.publicKey) {
      setError(new Error('Wallet not connected or public key not found'));
      return;
    }

    const publicKeyString = wallet.publicKey.toString();

    try {
      setLoading(true);
      const streamData = await getAllStreams(publicKeyString);
      setStreams(streamData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreams();
    return () => {
      setStreams(undefined);
      setLoading(true);
      setError(undefined);
    };
  }, [wallet.publicKey]);

  return { streams, fetchStreams, loading, error };
}
