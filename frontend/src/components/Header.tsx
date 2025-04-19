import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge,
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    handleMenuClose();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Início', path: '/' },
    { label: 'Cardápio', path: '/produtos' },
    { label: 'Promoções', path: '/promocoes' },
    { label: 'Sobre Nós', path: '/sobre' },
    { label: 'Contato', path: '/contato' }
  ];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
    >
      <Box sx={{ width: 250, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.path}
              component={Link}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <Divider />
          {user.email ? (
            <>
              <ListItem>
                <ListItemText 
                  primary={`Olá, ${user.name}`} 
                  secondary={user.email}
                />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Sair" />
              </ListItem>
            </>
          ) : (
            <ListItem 
              button 
              component={Link}
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ListItemText primary="Entrar" />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );

  const renderDesktopMenu = () => (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {menuItems.map((item) => (
          <Button
            key={item.path}
            color="inherit"
            component={Link}
            to={item.path}
            sx={{ mr: 2 }}
          >
            {item.label}
          </Button>
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {user.email ? (
          <>
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              startIcon={<PersonIcon />}
              sx={{ mr: 2 }}
            >
              {user.name}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            startIcon={<PersonIcon />}
            sx={{ mr: 2 }}
          >
            Entrar
          </Button>
        )}
        
        <IconButton 
          color="inherit" 
          component={Link} 
          to="/cart"
        >
          <Badge badgeContent={getTotalItems()} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            Lanche 3 Alianças
          </Link>
        </Typography>
        
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            {renderMobileMenu()}
          </>
        ) : (
          renderDesktopMenu()
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 