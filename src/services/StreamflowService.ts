import { SolanaStreamClient } from '@streamflow/stream/solana';
import {
  ICreateStreamData,
  ICluster,
  StreamType,
  StreamDirection,
} from '@streamflow/stream';

const solanaClient = new SolanaStreamClient(
  'https://api.devnet.solana.com',
  ICluster.Devnet,
);

export const createStream = async (
  streamParams: ICreateStreamData,
  solanaParams: any,
) => {
  try {
    const stream = await solanaClient.create(streamParams, solanaParams);
    return stream;
  } catch (error) {
    console.error(error);
  }
};

export const getAllStreams = async (address: string) => {
  try {
    const streams = await solanaClient.get({
      address,
      type: StreamType.All,
      direction: StreamDirection.All,
    });
    return streams;
  } catch (error) {
    console.error(error);
  }
};
