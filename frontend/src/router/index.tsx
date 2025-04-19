import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './config';

export const Router = () => {
  return <RouterProvider router={router} />;
}; 