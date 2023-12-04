import React from 'react';
import { AlertColor } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface ExpandSnackbarProps {
  isOpen: boolean;
  severity: AlertColor | undefined;
  message: string;
  onClose: () => void;
}

const ExpandSnackbar: React.FC<ExpandSnackbarProps> = ({ isOpen, severity, message, onClose }) => (
  <Snackbar
    open={isOpen}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
  >
    <Alert elevation={6} variant="filled" onClose={onClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);

export default ExpandSnackbar;
