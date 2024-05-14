import { Grid, TextField } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

function RecipientsSections() {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Controller
          name="tokenAmount"
          control={control}
          defaultValue={0}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Token Amount"
              type="number"
              fullWidth
              error={!!error}
              helperText={error ? error.message : ''}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="recipient"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              value={field.value || ''}
              label="Recipient Wallet Address"
              fullWidth
              error={!!error}
              helperText={error ? error.message : ''}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}

export default RecipientsSections;
