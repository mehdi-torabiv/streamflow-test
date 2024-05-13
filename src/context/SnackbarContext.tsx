import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type SnackbarContextType = {
  showMessage: (
    message: string,
    severity?: 'error' | 'success' | 'info' | 'warning',
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

type SnackbarProviderProps = {
  children: ReactNode;
};

/**
 * SnackbarProvider component that provides snackbar messages for child components.
 *
 * @param {SnackbarProviderProps} props - The props for the SnackbarProvider component.
 * @param {ReactNode} props.children - The child components that will consume the snackbar context.
 * @returns {JSX.Element} The provider component that wraps the children with Snackbar context.
 */
export const SnackbarProvider = ({
  children,
}: SnackbarProviderProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<
    'error' | 'success' | 'info' | 'warning'
  >('success');

  /**
   * Shows a snackbar message with the specified message and severity.
   *
   * @param {string} message - The message to display in the snackbar.
   * @param {'error' | 'success' | 'info' | 'warning'} [severity='info'] - The severity of the message.
   */
  const showMessage = (
    message: string,
    severity: 'error' | 'success' | 'info' | 'warning' = 'info',
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  /**
   * Handles the close event of the snackbar.
   *
   * @param {React.SyntheticEvent | Event} [_event] - The event that triggered the close.
   * @param {string} [reason] - The reason for closing the snackbar.
   */
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

/**
 * Hook to use the Snackbar context.
 *
 * @returns {SnackbarContextType} The snackbar context with the showMessage function.
 * @throws Will throw an error if used outside of a SnackbarProvider.
 */
export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
