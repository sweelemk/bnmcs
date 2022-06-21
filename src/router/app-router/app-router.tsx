import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { AppRoute } from "../interfaces";


type RouterProps = { routes: AppRoute[] };
const AppRouter: React.FC<RouterProps> = ({ routes }) => {
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map(({ id, route, Component, redirect }: AppRoute) => (
            <Route
              key={id}
              path={route}
              element={redirect ? <Navigate to={redirect} replace /> : <Component />}
            />
          ))
        }
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;
