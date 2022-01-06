import { Navigate, useRoutes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";
import { UsersPage } from "./pages/UsersPage";
import { ClientsPage } from "./pages/ClientsPage";
import { CategoryPage } from "./pages/CategoryPage";
import { Todos } from "./pages/Todos";
import React from 'react';
import { SimpleWrapper } from "./containers/SimpleWrapper";
import { useAuth } from "./hooks/useAuth";

export const Routing: React.FC = (): JSX.Element => {
  const { token } = useAuth();
  const isAuth = !!token;

  let authLayout = {
      path: '/',
      element: <SimpleWrapper />,
      children: [
        {path: "/auth", element: <AuthPage />},
        {path: '*', element: <Navigate to="/auth" />},
      ]
    }

  if (isAuth) {
    authLayout = {
      path: '/',
      element: <SimpleWrapper />,
      children: [
        {path: '/todos', element: <Todos />},
        {path: '/profile', element: <ProfilePage />},
        {path: '/users', element: <UsersPage />},
        {path: '/category', element: <CategoryPage />},
        {path: '/clients', element: <ClientsPage />},
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

  // return (
  //   <>
  //     <Routes>
  //       {/* <Route path="/auth" element={<AuthPage />} ?
  //     </Routes>
  //   </>
  // );
};
