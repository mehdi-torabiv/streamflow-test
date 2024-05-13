import { useFormContext, Controller } from 'react-hook-form';
import useSolanaTokens from '@/hooks/useSolanaTokens';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
  Grid,
} from '@mui/material';
import {
  unlockScheduleOptions,
  vestingDurationOptions,
  transferableRights,
  cancellationRights,
} from '@/configs/constants';

function ConfigurationSection() {
  const { control } = useFormContext();
  const { tokens } = useSolanaTokens();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Controller
          name="mint"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel id="token-label">Token</InputLabel>
              <Select
                labelId="token-label"
                id="token-select"
                {...field}
                label="Token"
                onChange={(e) => field.onChange(e.target.value)}
                value={field.value || ''}
              >
                {tokens.map((token) => (
                  <MenuItem key={token.mint || ''} value={token.mint || ''}>
                    {token.name}
                  </MenuItem>
                ))}
              </Select>
              {error && <FormHelperText>{error.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="unlockSchedule"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Unlock Schedule</InputLabel>
              <Select
                {...field}
                label="Unlock Schedule"
                value={field.value || ''}
              >
                {unlockScheduleOptions.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {error && <FormHelperText>{error.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="vestingDuration"
          control={control}
          defaultValue={0}
          render={({
            field: { onChange, value, ...fieldProps },
            fieldState: { error },
          }) => (
            <TextField
              {...fieldProps}
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              label="Vesting Duration"
              type="number"
              fullWidth
              error={!!error}
              helperText={error ? error.message : ''}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="vestingDurationUnit"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Vesting Duration Unit</InputLabel>
              <Select
                {...field}
                label="Vesting Duration Unit"
                value={field.value || ''}
              >
                {vestingDurationOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {error && <FormHelperText>{error.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="cancellationRights"
          control={control}
          defaultValue={'Sender'}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Cancellation Rights</InputLabel>
              <Select {...field} label="Cancellation Rights">
                {cancellationRights.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {error && <FormHelperText>{error.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="transferableRights"
          control={control}
          defaultValue={'Sender'}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Transferable Rights</InputLabel>
              <Select {...field} label="Transferable Rights">
                {transferableRights.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {error && <FormHelperText>{error.message}</FormHelperText>}
            </FormControl>
          )}
        />
      </Grid>
    </Grid>
  );
}

export default ConfigurationSection;
