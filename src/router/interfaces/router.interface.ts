import React from 'react';

export interface AppRoute {
  id: string;
  route: string;
  Component: React.ComponentClass | React.FC ;
  name?: string;
  redirect?: string;
  isHeaderNav?: boolean;
}
