import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import API from '../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await API.post('/auth/login', {
        email,
        password,
      });

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      navigate('/polls');
    } catch (err) {
      setError('Невірний email або пароль');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" gutterBottom align="center">
          Вхід
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Увійти
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
