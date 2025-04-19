import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Divider,
  Paper,
  useTheme
} from '@mui/material';
import { Search as SearchIcon, ShoppingCart as CartIcon } from '@mui/icons-material';
import { useCart, Product } from '../contexts/CartContext';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();
  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Erro ao carregar produtos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(new Set(products.map(product => product.category))).sort();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedProducts = categories.reduce((acc, category) => {
    acc[category] = filteredProducts.filter(product => product.category === category);
    return acc;
  }, {} as Record<string, Product[]>);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h5">Carregando cardápio...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h5" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            mb: 2
          }}
        >
          Nosso Cardápio
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              fullWidth
              label="Buscar produtos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: 'white' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Categoria</InputLabel>
              <Select
                value={selectedCategory}
                label="Categoria"
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{ backgroundColor: 'white' }}
              >
                <MenuItem value="">Todas as Categorias</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {categories.map(category => {
        const categoryProducts = groupedProducts[category];
        if (!categoryProducts || categoryProducts.length === 0) return null;

        return (
          <Box key={category} sx={{ mb: 4 }}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 1.5, 
                mb: 2, 
                backgroundColor: theme.palette.primary.main,
                color: 'white'
              }}
            >
              <Typography 
                variant="h5" 
                component="h2"
                sx={{ 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {category}
              </Typography>
            </Paper>

            <Grid container spacing={2}>
              {categoryProducts.map(product => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    {product.image && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.image}
                        alt={product.name}
                        sx={{ objectFit: 'cover' }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        component="h3"
                        sx={{ 
                          fontWeight: 'bold',
                          color: theme.palette.primary.main,
                          mb: 1
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        sx={{ 
                          height: '2.5em',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          fontSize: '1.1rem',
                          lineHeight: 1.4,
                          mb: 1.5,
                          fontWeight: 600
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: theme.palette.success.main,
                          fontWeight: 'bold',
                          fontSize: '1.25rem'
                        }}
                      >
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(product.price)}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => addToCart(product)}
                        startIcon={<CartIcon />}
                        sx={{ 
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '0.875rem'
                        }}
                      >
                        Adicionar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      })}
    </Container>
  );
};

export default ProductList; 