import { Navigate, useRoutes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";
import { UsersPage } from "./pages/UsersPage";
import { UserPage } from "./pages/UserPage";
import { ClientsPage } from "./pages/ClientsPage";
import { ClientPage } from "./pages/ClientPage";
import { CategoryPage } from "./pages/CategoryPage";
import { Todos } from "./pages/Todos";
import React from 'react';
import { SimpleWrapper } from "./containers/SimpleWrapper";
import { CasePage } from "./pages/CasePage";
import { CasesPage } from "./pages/CasesPage";
import { AuthWrapper } from "./containers/AuthWrapper";
import AUTH_ROUTES from './constants/index';
import SIMPLE_ROUTES from './constants/index';

interface RoutingProps {
  auth: boolean;
}

export const Routing: React.FC<RoutingProps> = ({auth}): JSX.Element => {
  let authLayout = {
      path: '/',
      element: <SimpleWrapper />,
      children: [
        {path: `/${SIMPLE_ROUTES.AUTH}`, element: <AuthPage />},
        {path: '/', element: <Navigate to={`/${SIMPLE_ROUTES.AUTH}`} />},
        {path: '*', element: <Navigate to={`/${SIMPLE_ROUTES.AUTH}`} />},
      ]
    }
// TODO: вынести список роутов в отдельный файл, а здесь только map или forEach перебор в children
  if (auth) {
    authLayout = {
      path: '/',
      element: <AuthWrapper />,
      children: [
        {path: '/todos', element: <Todos />},
        {path: `/${AUTH_ROUTES.PROFILE}`, element: <ProfilePage />},
        {path: `/${AUTH_ROUTES.USERS}`, element: <UsersPage />},
        {path: `/${AUTH_ROUTES.USER}/:id`, element: <UserPage />},
        {path: `/${AUTH_ROUTES.CATEGORY}`, element: <CategoryPage />},
        {path: `/${AUTH_ROUTES.CLIENT}/:id`, element: <ClientPage />},
        {path: `/${AUTH_ROUTES.CLIENTS}`, element: <ClientsPage />},
        {path: `/${AUTH_ROUTES.CASES}`, element: <CasesPage />},
        {path: `/${AUTH_ROUTES.CASE}/:id`, element: <CasePage />},
        {path: `/${SIMPLE_ROUTES.AUTH}`, element: <Navigate to={`/${AUTH_ROUTES.PROFILE}`} />},
        {path: '/', element: <Navigate to={`/${AUTH_ROUTES.PROFILE}`} />},
        {path: '*', element: <Navigate to={`/${AUTH_ROUTES.PROFILE}`} />},
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
