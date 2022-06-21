import {AppRoute} from "./interfaces";
import {Intermediary, IntermediaryDetail} from "../pages/intermediary";
import {Product, ProductDetail} from "../pages/product";
import React from "react";
import AppRouter from "./app-router/app-router";

export const routeMap: AppRoute[] = [
  {
    id: 'intermediary',
    name: 'Intermediary',
    route: '/intermediary',
    exact: true,
    Component: Intermediary,
  },
  {
    id: 'intermediary-detail',
    name: 'IntermediaryDetail',
    route: '/intermediary/:id',
    exact: true,
    Component: IntermediaryDetail,
  },
  {
    id: 'product',
    name: 'Product',
    route: './product',
    exact: true,
    Component: Product,
  },
  {
    id: 'product-detail',
    name: 'ProductDetail',
    route: './product/:id',
    exact: true,
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


export const Router: React.FC = () => <AppRouter routes={routeMap} />
