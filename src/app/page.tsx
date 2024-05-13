'use client';

import { useAllStreams } from '@/hooks/useAllStreams';
import { Stream } from '@streamflow/stream';
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { getCurrentTimestampInSeconds } from '@/helpers';
import TextWithCopyToClipboard from '@/components/shared/TextWithCopyToClipboard';
import { cancelStream } from '@/services/StreamflowService';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSnackbar } from '@/context/SnackbarContext';
import Seo from '@/components/shared/Seo';
import { useState } from 'react';
import { Keypair } from '@solana/web3.js';

export default function Home() {
  const wallet = useWallet();
  const { streams, fetchStreams, loading, error } = useAllStreams();
  const [cancelLoading, setCancelLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const { showMessage } = useSnackbar();

  const handleCancelStream = (id: string) => async () => {
    if (!wallet || !wallet.publicKey) {
      showMessage('Wallet not connected.', 'error');
      return;
    }

    setCancelLoading((prev) => ({ ...prev, [id]: true }));
    await cancelStream(
      {
        id: id,
      },
      {
        invoker: wallet as unknown as Keypair,
      },
      (stream) => {
        showMessage(`${stream.txId} canceled successfully.`, 'success');
        fetchStreams();
        setCancelLoading((prev) => ({ ...prev, [id]: false }));
      },
      (error) => {
        showMessage(`${error}`, 'error');
        setCancelLoading((prev) => ({ ...prev, [id]: false }));
      },
    );
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!streams || streams.length === 0) {
    return <div>No streams found.</div>;
  }

  return (
    <>
      <Seo titleTemplate="Streams" />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Completed</TableCell>
              <TableCell>Contract ID/Subject</TableCell>
              <TableCell>Stream Name</TableCell>
              <TableCell>Sender Wallet Address</TableCell>
              <TableCell>Recipient Wallet Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {streams.map(([id, stream]: [string, Stream]) => (
              <TableRow key={id}>
                <TableCell>
                  {stream.canceledAt > 0 ? (
                    <Typography
                      className="rounded-lg bg-red-500 p-1 text-white"
                      variant="caption"
                    >
                      CANCELED
                    </Typography>
                  ) : stream.end <= getCurrentTimestampInSeconds() ? (
                    <Typography
                      className="rounded-lg bg-green-400 p-1 text-black"
                      variant="caption"
                    >
                      COMPLETED
                    </Typography>
                  ) : (
                    <Typography
                      className="rounded-lg bg-blue-400 p-1 text-black"
                      variant="caption"
                    >
                      ON GOING
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <TextWithCopyToClipboard text={id} />
                </TableCell>
                <TableCell>{stream.name}</TableCell>
                <TableCell>
                  <TextWithCopyToClipboard text={stream.sender} />
                </TableCell>
                <TableCell>
                  <TextWithCopyToClipboard text={stream.recipient} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleCancelStream(id)}
                    disabled={
                      stream.canceledAt > 0 ||
                      stream.end <= getCurrentTimestampInSeconds() ||
                      stream.cancelableByRecipient
                    }
                  >
                    {cancelLoading[id] ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Cancel'
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
