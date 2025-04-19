import { RouteObject } from 'react-router-dom';

export interface RouterConfig {
  future: {
    v7_startTransition: boolean;
  };
}

export type AppRouteObject = RouteObject & {
  children?: AppRouteObject[];
}; 