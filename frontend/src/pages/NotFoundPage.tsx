import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4">Página não encontrada</Typography>
      <Button onClick={() => navigate('/')}>Voltar para a página inicial</Button>
    </Container>
  );
};

export default NotFoundPage; 