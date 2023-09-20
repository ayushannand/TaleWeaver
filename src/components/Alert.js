import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function CustomAlert({ message, type, time }) {
  const [showAlert, setShowAlert] = React.useState(true);

  // Define a severity based on the 'type' prop, default to 'info'
  const severity = type || 'info';

  React.useEffect(() => {
    if (time && time > 0) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, time);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [time]);

  if (!message) {
    return (
      <Stack spacing={2}>
        <Alert severity="info">Placeholder message</Alert>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      {showAlert && <Alert severity={severity}>{message}</Alert>}
    </Stack>
  );
}
