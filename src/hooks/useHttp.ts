import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AUTH_ROUTES from '../constants';

export const useHttp = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    navigate('/', {replace: true});
  }

  const request = React.useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);

    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }

      setLoading(false)

      return data

      
    } catch (e: any) {
      setLoading(false)
      e.message === 'Нет авторизации' && logout();
      e.message === 'Пользователь не найден' && navigate(`/${AUTH_ROUTES.USERS}`, {replace: true});;
      setError(e.message)
      throw e
    }
  }, []);

  const clearError = React.useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}