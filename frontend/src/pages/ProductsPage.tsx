import React from 'react';
import { Typography, Container } from '@mui/material';

const ProductsPage = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Cardápio
      </Typography>
      <Typography variant="body1">
        Em breve, nosso delicioso cardápio estará disponível aqui!
      </Typography>
    </Container>
  );
};

export default ProductsPage; 