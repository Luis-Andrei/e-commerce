import { Box, Button, Typography, Paper } from "@mui/material";

const DashboardPage = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Sair
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Bem-vindo!</Typography>
          <Typography>
            Esta é a sua área administrativa. Aqui você poderá gerenciar seus produtos,
            pedidos e configurações da loja.
          </Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Estatísticas</Typography>
          <Typography>
            Em breve você verá aqui gráficos e métricas importantes do seu negócio.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardPage; 