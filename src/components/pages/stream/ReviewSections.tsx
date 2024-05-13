import { ReviewTransaction } from '@/interfaces';
import { Paper, Typography } from '@mui/material';

interface ReviewSectionsProps {
  reviewTransaction: ReviewTransaction;
}

function ReviewSections({ reviewTransaction }: ReviewSectionsProps) {
  return (
    <Paper className="border border-gray-300 p-5 shadow-none">
      <Typography>
        Token name: {'Solana'} & Symbol: {'SOL'}
      </Typography>
      <Typography>Token Amount: {reviewTransaction.tokenAmount}</Typography>
      <Typography>
        Recipient Wallet Address: {reviewTransaction.recipient}
      </Typography>
      <Typography>
        Vesting Duration: {reviewTransaction.vestingDuration}{' '}
        {reviewTransaction.vestingDurationUnit}
      </Typography>
      <Typography>
        Unlock Schedule Type: {reviewTransaction.unlockSchedule}
      </Typography>
      <Typography>
        Who can cancel Contract? {reviewTransaction.cancellationRights}
      </Typography>
      <Typography>
        Who can transfer Tokens? {reviewTransaction.transferableRights}
      </Typography>
    </Paper>
  );
}

export default ReviewSections;
