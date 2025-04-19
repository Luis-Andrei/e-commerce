import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  TextField,
  Paper,
  Divider,
  Alert
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (getTotalItems() === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Seu carrinho está vazio
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/cardapio')}
          sx={{ mt: 2 }}
        >
          Ver Cardápio
        </Button>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carrinho de Compras
      </Typography>
      {!isAuthenticated && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Você precisa estar logado para finalizar a compra. <Button color="inherit" onClick={() => navigate('/login')}>Fazer Login</Button>
        </Alert>
      )}
      <List>
        {cart.map(item => (
          <React.Fragment key={item._id}>
            <ListItem>
              <ListItemText
                primary={item.name}
                secondary={formatPrice(item.price)}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  size="small"
                  value={item.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      handleQuantityChange(item._id, value);
                    }
                  }}
                  sx={{ width: 60, mx: 1 }}
                  inputProps={{ min: 1, style: { textAlign: 'center' } }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Typography variant="body1" sx={{ minWidth: 100, textAlign: 'right' }}>
                {formatPrice(item.price * item.quantity)}
              </Typography>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => removeFromCart(item._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={clearCart}
        >
          Limpar Carrinho
        </Button>
        <Box>
          <Typography variant="h6">
            Total: {formatPrice(getTotalPrice())}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCheckout}
            sx={{ mt: 1 }}
          >
            Finalizar Compra
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Cart; 