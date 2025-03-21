import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export default function QRSetup() {
  const [email, setEmail] = useState('');
  const [qr, setQr] = useState('');
  const [secret, setSecret] = useState('');
  const canvasRef = useRef(null);

  const setup = async () => {
    const res = await axios.post('http://localhost:1337/faucet/setup', { email });
    setSecret(res.data.secret);
    setQr(res.data.otpauth_url);
  };

  useEffect(() => {
    if (qr && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qr, { width: 200 }, (error: any) => {
        if (error) console.error(error);
      });
    }
  }, [qr]);

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Set Up Google Authenticator
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={setup}>
          Generate QR Code
        </Button>
        {qr && (
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <canvas ref={canvasRef} />
            <Typography variant="body2">Secret: {secret}</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}