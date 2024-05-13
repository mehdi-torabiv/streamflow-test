import { Button, Container, Typography } from '@mui/material';
import React from 'react';

function page() {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Phantom Wallet Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        It looks like you don't have the Phantom wallet installed. Please
        download it to continue.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="https://phantom.app/download"
        target="_blank"
        sx={{
          textTransform: 'none',
        }}
        rel="noopener noreferrer"
      >
        Download Phantom Wallet
      </Button>
    </Container>
  );
}

export default page;
