import useSolanaTokens from '@/hooks/useSolanaTokens';
import { Box, Autocomplete, TextField, InputAdornment, Avatar, Typography, Select, MenuItem } from '@mui/material'
import { useState } from 'react'

const VestingDurationOptions = ['per second', 'per minute', 'per hour', 'per day', 'per week', 'bi-week', 'per month', 'per quarter', 'per year']

const cancelationsRights = ['Recipient', 'Sender', 'Both', 'Neither'];
const transferableRights = ['Recipient', 'Sender', 'Both', 'Neither'];

function ConfigurationSection() {
    const [value, setValue] = useState<any>(null);
    const { tokens, loading } = useSolanaTokens();

    return (
        <div className='flex flex-col space-y-5'>
            <Autocomplete
                fullWidth
                disablePortal
                id="token-select"
                options={tokens}
                loading={loading}
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Token"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    {value && (
                                        <Avatar src={value.logoURI} alt={value.name} sx={{ width: 24, height: 24, margin: '0 auto' }} />
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
                getOptionLabel={(option) => option.name ?? ''}
                renderOption={(props, option) => (
                    <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={option.logoURI} alt={option.name} sx={{ width: 24, height: 24, marginRight: 2 }} />
                            <Typography variant="body2">{option.name}</Typography>
                        </Box>
                        <Typography variant="caption" sx={{ marginLeft: 2 }}>{option.balance}</Typography>
                    </Box>
                )}
            />
            <div className='flex flex-row items-center justify-between space-x-5'>
                <TextField
                    label="Vesting Duration"
                    type="number"
                    fullWidth
                />
                <Select fullWidth>
                    {
                        VestingDurationOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))
                    }
                </Select>
            </div>
            <Select fullWidth>
                {
                    VestingDurationOptions.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))
                }
            </Select>
            <div className='flex justify-between space-x-5'>
                <Select fullWidth>
                    {
                        cancelationsRights.map((option, index) => (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))
                    }
                </Select>
                <Select fullWidth>
                    {
                        transferableRights.map((option, index) => (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))
                    }
                </Select>
            </div>
        </div>
    )
}

export default ConfigurationSection
