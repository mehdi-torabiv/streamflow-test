import { Paper, Typography } from "@mui/material"

function ReviewSections({ reviewTransaction }: { reviewTransaction: any }) {
    console.log({ reviewTransaction });

    return (
        <Paper className="p-5 shadow-none border border-gray-300" >
            <Typography>
                Token name: {'Solana'} & Symbol: {'SOL'}
            </Typography>
            <Typography>
                Token Amount: {reviewTransaction.tokenAmount}
            </Typography>
            <Typography>
                Recipient Wallet Address: {reviewTransaction.recipient}
            </Typography>
            <Typography>
                Vesting Duration: {reviewTransaction.vestingDuration}
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
    )
}

export default ReviewSections
