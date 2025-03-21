import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography
} from '@mui/material';

export default function ClaimForm() {
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('westend');
  const [response, setResponse] = useState('');

  const claim = async () => {
    const res = await axios.post('http://localhost:1337/faucet/claim', { secret, token, address, network });
    setResponse(res.data.message);
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Claim Testnet Tokens
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Polkadot Wallet Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />
        <TextField
          label="Google Authenticator OTP"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          fullWidth
        />
        <TextField
          label="TOTP Secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Network"
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          fullWidth
        >
          <MenuItem value="westend">Westend</MenuItem>
          <MenuItem value="paseo">Paseo</MenuItem>
        </TextField>
        <Button variant="contained" onClick={claim}>
          Claim Tokens
        </Button>
        {response && (
          <Typography variant="body2" color="primary">
            {response}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
