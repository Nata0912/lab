import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPolls = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await API.get('/polls', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPolls(response.data);
    } catch (err) {
      console.error(err);
      alert('Помилка при отриманні опитувань');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box mt={4} display="flex" justifyContent="space-between">
        <Typography variant="h4">Опитування</Typography>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Вийти
        </Button>
      </Box>
      {polls.length === 0 ? (
        <Typography mt={4}>Опитувань поки що немає.</Typography>
      ) : (
        polls.map((poll) => (
          <Card key={poll.id} sx={{ my: 2 }}>
            <CardContent>
              <Typography variant="h6">{poll.title}</Typography>
              <Typography color="textSecondary">{poll.description}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Polls;
