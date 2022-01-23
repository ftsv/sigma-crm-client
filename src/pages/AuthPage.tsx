import React from 'react';
import { useHttp } from '../hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastsContext } from '../context/ToastsContext';
import AUTH_ROUTES from '../constants';

export const AuthPage = () => {
  const auth = React.useContext(AuthContext);
  const { addToast } = React.useContext(ToastsContext);
  const navigate = useNavigate();
  const {request} = useHttp();
  const [form, setForm] = React.useState({
    email: "",
    password: ""
  });

  const handleChangeForm = (e:React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleRegister = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      addToast('Выполнено', `${data.message}`, 'success', 7000);

    } catch (e: any) {
      addToast('Ошибка', `${e.message}`, 'danger', 7000);
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await request('/api/auth/login', 'POST', {...form});

      auth.login(data.token, data.userId, data.email, data.initials);
      navigate(AUTH_ROUTES.PROFILE, {replace: true});
    } catch (e: any) {
        addToast('Ошибка', `${e.message}`, 'danger', 7000);
    }
    
  }

    React.useEffect(() => {
        document.title = "Авторизация";
    }, []);
  return (
    <div className="container d-flex align-middle justify-content-center" style={{height: "100vh"}}>
      <div className="col-6 ">
        <form  onSubmit={e => handleLogin(e)}>
          <div className="mb-3">
            <label htmlFor="InputEmail1" className="form-label">Email адрес</label>
            <input 
              type="email"
              className="form-control"
              id="InputEmail1"
              name="email"
              autoComplete="email"
              value={form.email} 
              onChange={e => handleChangeForm(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputPassword1" className="form-label">Пароль</label>
            <input 
              type="password"
              className="form-control"
              id="InputPassword1"
              autoComplete="current-password"
              aria-describedby="passwordHelp"
              name="password"
              value={form.password}
              onChange={e => handleChangeForm(e)}
            />
            <div id="passwordHelp" className="form-text">Не менее 3 символов</div>
          </div>
          <button type="submit" className="btn btn-primary">Войти</button>
          <button
            className="btn btn-light"
            type="button"
            style={{marginLeft: "10px"}}
            onClick={() => handleRegister()}
          >
            Регистрация
          </button>
        </form>
      </div>
    </div>
  )
} 