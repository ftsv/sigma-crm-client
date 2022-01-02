import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
  //======= залипуха, чтобы не редиректило в страницу по умолчанию
  let initialToken = null;
  const data = JSON.parse(localStorage.getItem('userData') || '{}');
    if (data && data.token) {
      initialToken = data.token;
    }
  // залипуха окончена

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback(async (jwtToken, id, email) => {
    setToken(jwtToken);
    setEmail(email);
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, email: email,
    }));
  }, [token]);


  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, [])

  // fill authContext from localStorage when login
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) || '{}')

    if (data && data.token) {
      login(data.token, data.userId, data.email)
      setReady(true)
    }
  }, [login])

  return { login, email, logout, token, userId, ready }
}
