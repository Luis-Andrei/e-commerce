import React from 'react';
import { Typography, Container } from '@mui/material';

const PromotionsPage = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Promoções
      </Typography>
      <Typography variant="body1">
        Fique de olho nas nossas promoções especiais!
      </Typography>
    </Container>
  );
};

export default PromotionsPage; 