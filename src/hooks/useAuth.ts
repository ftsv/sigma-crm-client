import React, {useState, useCallback} from 'react';
import LOCAL_STORAGE from '../constants/index';

export const useAuth = () => {
  let initialToken = null;
  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER_DATA) || '{}');
  if (data && data.token) initialToken = data.token;
  
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [initials, setInitials] = useState('');

  const login = useCallback(async (jwtToken, id, email, initials) => {
    setToken(jwtToken);
    setEmail(email);
    setUserId(id);
    setInitials(initials);

    localStorage.setItem(LOCAL_STORAGE.USER_DATA, JSON.stringify({
      userId: id,
      token: jwtToken,
      email,
      initials,
    }));
  }, []);


  const logout = () => {
    setToken(null);
    setUserId(null);
    setEmail(null);
    setInitials('');
    localStorage.removeItem(LOCAL_STORAGE.USER_DATA);
  }

  // fill authContext from localStorage when login
  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER_DATA) || '{}')

    if (data && data.token) {
      login(data.token, data.userId, data.email, data.initials);
      setReady(true)
    }
  }, [login]);

  React.useEffect(() => {
    
  },[]);

  return { login, email, logout, token, userId, ready, initials, setInitials };
}
