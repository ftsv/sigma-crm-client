import { Navigate, useRoutes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";
import { UsersPage } from "./pages/UsersPage";
import { ClientsPage } from "./pages/ClientsPage";
import { CategoryPage } from "./pages/CategoryPage";
import { Todos } from "./pages/Todos";
import React from 'react';
import { SimpleWrapper } from "./containers/SimpleWrapper";
import { CasePage } from "./pages/CasePage";
import { CasesPage } from "./pages/CasesPage";
import { AuthWrapper } from "./containers/AuthWrapper";

interface RoutingProps {
  auth: boolean;
}

export const Routing: React.FC<RoutingProps> = ({auth}): JSX.Element => {
  let authLayout = {
      path: '/',
      element: <SimpleWrapper />,
      children: [
        {path: "/auth", element: <AuthPage />},
        {path: '/', element: <Navigate to="/auth" />},
        {path: '*', element: <Navigate to="/auth" />},
      ]
    }

  if (auth) {
    authLayout = {
      path: '/',
      element: <AuthWrapper />,
      children: [
        {path: '/todos', element: <Todos />},
        {path: '/profile', element: <ProfilePage />},
        {path: '/users', element: <UsersPage />},
        {path: '/category', element: <CategoryPage />},
        {path: '/clients', element: <ClientsPage />},
        {path: '/cases', element: <CasesPage />},
        {path: '/case/:id', element: <CasePage />},
        {path: '/auth', element: <Navigate to="/profile" />},
        {path: '/', element: <Navigate to="/profile" />},
        {path: '*', element: <Navigate to="/profile" />},
      ]
    }
  }
  const router = useRoutes([authLayout]);

  return (
    <>
    {router}
    </>
  )
};
