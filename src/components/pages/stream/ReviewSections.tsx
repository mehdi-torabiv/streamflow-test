import { Paper, Typography } from "@mui/material"

function ReviewSections() {
    return (
        <Paper className="p-5 shadow-none border border-gray-300" >
            <Typography>
                Token name: {'Solana'} & Symbol: {'SOL'}
            </Typography>
            <Typography>
                Token Amount: {'1000'}
            </Typography>
            <Typography>
                Recipient Wallet Address: {'0x1234567890'}
            </Typography>
            <Typography>
                Vesting Duration: {'1'} {'Year'}
            </Typography>
            <Typography>
                Unlock Schedule Type: {'Bi-Weekly'}
            </Typography>
            <Typography>
                Who can cancel Contract? {'Recipient'}
            </Typography>
            <Typography>
                Who can transfer Tokens? {'Recipient'}
            </Typography>
        </Paper>
    )
}

export default ReviewSections
