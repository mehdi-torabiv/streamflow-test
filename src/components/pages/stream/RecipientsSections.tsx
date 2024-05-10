import { TextField } from '@mui/material'

function RecipientsSections() {
    return (
        <div className='flex flex-row justify-between space-x-5'>
            <TextField
                label="Token Amount"
                type="number"
                fullWidth
            />
            <TextField
                label="Recipient Wallet Address"
                fullWidth
            />
        </div>
    )
}

export default RecipientsSections
