import React from 'react';
export interface AppRoute {
  id: string;
  route: string;
  Component: React.ComponentClass | React.FC ;
  exact?: boolean;
  name?: string;
  redirect?: string;
}
