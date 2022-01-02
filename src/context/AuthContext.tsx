import {createContext} from 'react'
import { useAuth } from '../hooks/useAuth';

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  email: null,
  login: (token: string, userId: string, email: string) => {},
  logout: noop,
  isAuth: false,
})

const AuthProvider: React.FC = ({children}) => {
  const { token, email, login, logout, userId, ready } = useAuth();
  const isAuth = !!token;

  return (
    <AuthContext.Provider value={{token, email, login, logout, userId, isAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
