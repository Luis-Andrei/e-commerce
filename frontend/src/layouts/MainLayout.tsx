import { Outlet } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ p: 2, mt: 4, textAlign: 'center' }}>
        <Typography variant="body2">© {new Date().getFullYear()} Lanche 3 Alianças</Typography>
      </Box>
    </>
  );
};

export default MainLayout; 