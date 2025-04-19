import { router } from './config';
import { RouterProvider as ReactRouterProvider } from 'react-router-dom';

/**
 * Componente wrapper para o RouterProvider do react-router-dom.
 * Centraliza a configuração do router em um único local.
 */
export const RouterProvider = () => {
  return <ReactRouterProvider router={router} />;
}; 