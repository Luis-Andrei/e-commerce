import React from 'react';
import { Typography, Container } from '@mui/material';

const AboutPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Sobre Nós
      </Typography>
      <Typography variant="body1" paragraph>
        Bem-vindo ao Lanche 3 Alianças! Somos uma lanchonete dedicada a trazer os melhores sabores para você.
      </Typography>
      <Typography variant="body1">
        Nossa história começou com a paixão por comida de qualidade e atendimento excepcional.
      </Typography>
    </Container>
  );
};

export default AboutPage; 