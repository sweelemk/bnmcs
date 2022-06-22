import React from 'react';
import AppRouter from './app-router/app-router';
import { Intermediary, IntermediaryDetail } from '../pages/intermediary';
import { Product, ProductDetail } from '../pages/product';
import { AppRoute } from './interfaces';

export const routeMap: AppRoute[] = [
  {
    id: 'intermediary',
    name: 'Intermediaries',
    route: '/intermediary',
    Component: Intermediary,
    isHeaderNav: true
  },
  {
    id: 'intermediary-detail',
    name: 'IntermediaryDetail',
    route: '/intermediary/:id',
    Component: IntermediaryDetail
  },
  {
    id: 'product',
    name: 'Products',
    route: '/product',
    Component: Product,
    isHeaderNav: true
  },
  {
    id: 'product-detail',
    name: 'ProductDetail',
    route: '/product/:id',
    Component: ProductDetail
  },
  {
    id: 'redirect',
    name: 'Redirect',
    route: '/*',
    Component: (): React.ReactElement => <div />,
    redirect: '/intermediary'
  }
];

export const Router: React.FC = () => <AppRouter routes={routeMap} />;
