import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from '../layouts/MainLayout';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import AddressForm from '../components/AddressForm';
import { Box, Typography, Button } from '@mui/material';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';

const OrderConfirmation = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom>
      Pedido Confirmado!
    </Typography>
    <Typography variant="body1" paragraph>
      Seu pedido foi recebido e está sendo preparado.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={() => window.location.href = '/'}
    >
      Voltar para a Página Inicial
    </Button>
  </Box>
);

const WrappedLayout = () => (
  <AuthProvider>
    <CartProvider>
      <MainLayout />
    </CartProvider>
  </AuthProvider>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <WrappedLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cardapio',
        element: <ProductList />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "checkout",
            element: <AddressForm />
          },
          {
            path: "order-confirmation",
            element: <OrderConfirmation />
          },
          {
            path: "dashboard",
            element: <div>Dashboard</div>
          }
        ]
      },
      {
        path: "*",
        element: <Navigate to="/" replace />
      }
    ],
  }
];

export const router = createBrowserRouter(routes); 