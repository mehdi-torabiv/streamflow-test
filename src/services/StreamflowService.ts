import {
  ICreateSolanaExt,
  SolanaStreamClient,
} from '@streamflow/stream/solana';
import {
  ICreateStreamData,
  ICluster,
  StreamType,
  StreamDirection,
  ICreateResult,
} from '@streamflow/stream';

const solanaClient = new SolanaStreamClient(
  'https://api.devnet.solana.com',
  ICluster.Devnet,
);

export const createStream = async (
  streamParams: ICreateStreamData,
  solanaParams: ICreateSolanaExt,
  onSuccess: (stream: ICreateResult) => void,
  onError: (error: unknown) => void,
): Promise<ICreateResult | undefined> => {
  try {
    const stream = await solanaClient.create(streamParams, solanaParams);
    if (stream) {
      onSuccess(stream);
    }
    return stream;
  } catch (error) {
    onError(error);
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
