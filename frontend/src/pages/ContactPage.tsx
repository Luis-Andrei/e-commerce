import React from 'react';
import { Typography, Container, Box, TextField, Button } from '@mui/material';

const ContactPage = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Contato
      </Typography>
      <Box component="form" sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <TextField
          fullWidth
          label="Nome"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Mensagem"
          multiline
          rows={4}
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Enviar Mensagem
        </Button>
      </Box>
    </Container>
  );
};

export default ContactPage; 