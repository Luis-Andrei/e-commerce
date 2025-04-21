import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from '@mui/material';
import { useCart } from '../contexts/CartContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Box mt={2}>
          <Typography variant="h6" color="primary">
            R$ {product.price.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary" 
          variant="contained"
          fullWidth
          onClick={() => addToCart(product)}
        >
          Adicionar ao Carrinho
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard; 