import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
} from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Layout: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <AppBar 
        position="static"
        sx={{
          background: 'linear-gradient(90deg, #0072ff 0%, #00c6ff 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#ffeb3b',
                transform: 'scale(1.03)',
              }
            }}
          >
            Lancheria 3 Alianças
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/cardapio"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                paddingX: 2,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Cardápio
            </Button>

            {isAuthenticated ? (
              <>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#ffffff', 
                    fontWeight: 500 
                  }}
                >
                  Olá, {user?.name}
                </Typography>
                <Button 
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    paddingX: 2,
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    paddingX: 2,
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/register"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    paddingX: 2,
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Registrar
                </Button>
              </>
            )}

            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{
                ml: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.1)',
                }
              }}
            >
              <Badge badgeContent={getTotalItems()} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3, background: '#f5f7fa', minHeight: 'calc(100vh - 64px)' }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout; 