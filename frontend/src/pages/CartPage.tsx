import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { getTotalItems } = useCart();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Carrinho
      </Typography>
      {getTotalItems() === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body1" paragraph>
            Seu carrinho está vazio
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/produtos"
          >
            Ver Produtos
          </Button>
        </Box>
      ) : (
        <Typography variant="body1">
          Itens no carrinho: {getTotalItems()}
        </Typography>
      )}
    </Container>
  );
};

export default CartPage; 