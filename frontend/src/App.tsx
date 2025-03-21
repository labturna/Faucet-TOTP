import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import QRSetup from './components/QRSetup';
import ClaimForm from './components/ClaimForm';
function App() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Polkadot Faucet
      </Typography>
      <QRSetup />
      <ClaimForm />
    </Container>
  );
}

export default App;
