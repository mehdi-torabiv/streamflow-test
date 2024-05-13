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

export default function Home() {
  const wallet = useWallet()
  const { streams, fetchStreams, loading, error } = useAllStreams();

  const { showMessage } = useSnackbar();

  const handleCancelStream = (id: string) => async () => {
    cancelStream({
      id: id
    }, {
      invoker: wallet
    },
      (stream) => {
        showMessage(`${stream.txId} canceled successfully.`, 'success');
        fetchStreams();
      },
      (error) => {
        showMessage(`${error}`, 'error');
      })
  }

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
      <Seo titleTemplate='Streams' />
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
                  {stream.canceledAt > 0 ?
                    <Typography
                      className="rounded-lg bg-red-500 text-white p-1"
                      variant="caption"
                    >
                      CANCELED
                    </Typography> : stream.end <= getCurrentTimestampInSeconds() ? (
                      <Typography
                        className="rounded-lg bg-green-400 text-black p-1"
                        variant="caption"
                      >
                        COMPLETED
                      </Typography>
                    ) : (
                      <Typography
                        className="rounded-lg bg-blue-400 text-black p-1"
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
                  <Button variant='contained' color='error' size='small' onClick={handleCancelStream(id)} disabled={
                    stream.canceledAt > 0 || stream.end <= getCurrentTimestampInSeconds()
                  }>
                    Cancel
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
