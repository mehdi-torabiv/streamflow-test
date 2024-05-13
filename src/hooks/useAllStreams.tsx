import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { getAllStreams } from '@/services/StreamflowService';
import { Stream } from '@streamflow/stream';

/**
 * returns all streams of user walllet on solana blockchain
 *
 * @export
 * @returns {{ streams: [string, Stream][] | undefined; loading: boolean; error: Error|undefined; }}
 */
export function useAllStreams(): { streams: [string, Stream][] | undefined; loading: boolean; error: Error | undefined; } {
    const wallet = useWallet();
    const [streams, setStreams] = useState<[string, Stream][] | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
        const fetchStreams = async () => {
            if (!wallet.publicKey) {
                setError(new Error("Wallet not connected or public key not found"));
                return;
            }

            const publicKeyString = wallet.publicKey.toString();

            try {
                setLoading(true);
                const streamData = await getAllStreams(publicKeyString);
                setStreams(streamData);
            } catch (error) {
                setError(new Error("Failed to fetch streams"));
            } finally {
                setLoading(false);
            }
        };

        fetchStreams();
        return () => {
            setStreams(undefined);
            setLoading(true);
            setError(undefined);
        }
    }, [wallet.publicKey]);

    return { streams, loading, error };
}
