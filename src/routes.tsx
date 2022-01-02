import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";
import { UsersPage } from "./pages/UsersPage";
import { CategoryPage } from "./pages/CategoryPage";
import { Todos } from "./pages/Todos";
import React from 'react';

export const useRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <>
        <Routes>
          <Route path="/todos" element={<Todos />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/profile" />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </>
  );
};
