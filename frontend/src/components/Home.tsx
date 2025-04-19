import React from 'react';
import { Box, Button, Container, Typography, Divider, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const mapsUrl = "https://maps.google.com/?q=-29.503806,-51.799833";

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        width: '100%',
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, md: 4 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: 0,
          filter: 'blur(5px)',
        }
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative',
          zIndex: 1,
          py: { xs: 4, md: 8 }
        }}
      >
        <Box
          sx={{
            padding: { xs: 3, md: 6 },
            borderRadius: '30px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            border: '1px solid rgba(255, 255, 255, 0.18)',
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-10px)',
            }
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: '800px',
              width: '100%',
            }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                color: 'white',
                textAlign: 'center',
                textShadow: '2px 4px 8px rgba(0, 0, 0, 0.3)',
                marginBottom: 2,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Lancheria 3 Alianças
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                textAlign: 'center',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: 1.6,
                textShadow: '1px 2px 4px rgba(0, 0, 0, 0.2)',
                fontWeight: 500,
              }} 
              paragraph
            >
              Os melhores lanches da região! Peça agora mesmo.
            </Typography>
          </Box>
          
          <Link 
            href={mapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ 
              textDecoration: 'none',
              color: 'white',
              width: '100%',
              maxWidth: '800px',
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              padding: '24px 40px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              '&:hover': {
                transform: 'translateY(-5px)',
                background: 'rgba(255, 255, 255, 0.2)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
              }
            }}>
              <LocationOnIcon 
                sx={{ 
                  color: 'white',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))'
                }} 
              />
              <Typography 
                variant="h6"
                sx={{ 
                  color: 'white',
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                  fontWeight: 500,
                  textShadow: '1px 2px 4px rgba(0, 0, 0, 0.2)',
                  letterSpacing: '0.5px',
                }}
              >
                R. Osvino Flesch, 328 - Canabarro, Teutônia - RS, 95890-000
              </Typography>
            </Box>
          </Link>

          <Divider 
            sx={{ 
              width: '80%', 
              maxWidth: '400px',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            }} 
          />

          <Button
            variant="contained"
            size="large"
            startIcon={<RestaurantMenuIcon sx={{ fontSize: '1.8rem' }} />}
            onClick={() => navigate('/cardapio')}
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              padding: '20px 60px',
              borderRadius: '50px',
              background: 'linear-gradient(45deg, #3498db 30%, #2c3e50 90%)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 10px 30px rgba(52, 152, 219, 0.4)',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              fontWeight: 600,
              letterSpacing: '0.5px',
              '&:hover': {
                transform: 'translateY(-5px) scale(1.02)',
                boxShadow: '0 15px 40px rgba(52, 152, 219, 0.6)',
                background: 'linear-gradient(45deg, #2c3e50 30%, #3498db 90%)',
              }
            }}
          >
            Ver Cardápio
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 