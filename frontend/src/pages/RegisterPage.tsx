import { Box, Button, TextField, Typography } from "@mui/material";

const RegisterPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de registro
    window.location.href = "/login";
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 1,
        borderRadius: 1
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Criar Conta
      </Typography>
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
        label="Senha"
        type="password"
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Confirmar Senha"
        type="password"
        margin="normal"
        required
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
      >
        Registrar
      </Button>
    </Box>
  );
};

export default RegisterPage; 