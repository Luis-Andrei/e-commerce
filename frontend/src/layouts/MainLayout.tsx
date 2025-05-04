import { Outlet } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: '#f5f5f5'
    }}>
      <Header />
      <Container 
        component="main" 
        sx={{ 
          mt: 4, 
          mb: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Outlet />
      </Container>
      <Box 
        component="footer" 
        sx={{ 
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" align="center">
            © {new Date().getFullYear()} Lanche 3 Alianças
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Todos os direitos reservados
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout; 