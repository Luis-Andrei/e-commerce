import { Box, Button, TextField, Typography } from "@mui/material";

const LoginPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login
    localStorage.setItem("token", "fake-token");
    window.location.href = "/dashboard";
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
        Login
      </Typography>
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
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
      >
        Entrar
      </Button>
    </Box>
  );
};

export default LoginPage; 