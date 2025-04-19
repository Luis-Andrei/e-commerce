import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

/**
 * Página inicial da aplicação.
 * Exibe uma mensagem de boas-vindas, destaques e chamadas para ação.
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
      title: 'Compra Fácil',
      description: 'Navegue por nossa seleção de produtos e encontre exatamente o que procura.'
    },
    {
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      title: 'Sua Conta',
      description: 'Gerencie seus pedidos e preferências em um só lugar.'
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Entrega Rápida',
      description: 'Acompanhe seus pedidos em tempo real com nossa entrega otimizada.'
    }
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 4, md: 8 },
        minHeight: '100vh',
      }}
    >
      {/* Hero Section */}
      <Box
        component="header"
        sx={{
          textAlign: 'center',
          mb: 8
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
            fontWeight: 'bold',
            mb: 3
          }}
        >
          Bem-vindo à Nossa Loja
        </Typography>
        
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Descubra uma nova experiência em compras online
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCartIcon />}
          onClick={() => navigate('/produtos')}
          sx={{ mr: 2 }}
        >
          Começar a Comprar
        </Button>
        
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/cadastro')}
        >
          Criar Conta
        </Button>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" component="h2" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box
        sx={{
          mt: 8,
          textAlign: 'center',
          bgcolor: 'primary.light',
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Pronto para começar?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Junte-se a milhares de clientes satisfeitos.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => navigate('/produtos')}
          sx={{ 
            bgcolor: 'primary.dark',
            '&:hover': {
              bgcolor: 'primary.main',
            }
          }}
        >
          Explorar Produtos
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage; 