import { ReviewTransaction } from '@/interfaces';
import { Grid, Paper, Typography } from '@mui/material';

interface ReviewSectionsProps {
  reviewTransaction: ReviewTransaction;
}

function ReviewSections({ reviewTransaction }: ReviewSectionsProps) {
  return (
    <Paper className="border border-gray-300 p-5 shadow-none">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography>
            Token name: {'Solana'} & Symbol: {'SOL'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Token Amount: {reviewTransaction.tokenAmount}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            Recipient Wallet Address: {reviewTransaction.recipient}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            Vesting Duration: {reviewTransaction.vestingDuration}{' '}
            {reviewTransaction.vestingDurationUnit}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            Unlock Schedule Type: {reviewTransaction.unlockSchedule}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            Who can cancel Contract? {reviewTransaction.cancellationRights}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>
            Who can transfer Tokens? {reviewTransaction.transferableRights}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ReviewSections;
