import React, { FormEvent } from 'react';
import cn from 'classnames';
import { IUser } from '../types/User';
import { Lock, Unlock } from 'react-bootstrap-icons';
import { InputGroupWithLock } from './InputGroupWithLock';
// import { useNavigate } from 'react-router-dom';
// import AUTH_ROUTES from '../constants/index';

interface ProfilePageProps {
  user?: IUser;
  setUser: (data: any) => void;
  editUser: (user: IUser) => void;
  darkMode: boolean;
}

export const ProfileForm: React.FC<ProfilePageProps>  = ({
  user,
  setUser,
  editUser,
  darkMode = false,
}): JSX.Element => {
  // const navigate = useNavigate();
  const [disabled, setDisabled] = React.useState(true);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.type) {
      case 'checkbox':
        setUser({...user, [e.target.name]: e.target.checked});
        break;
      case 'text':
      default:
        setUser({...user, [e.target.name]: e.target.value});
        break;
    }
    // console.log({ user });
  }

  const handleDisable = () => setDisabled(!disabled);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: сделать окно подтверждения действия
    user && editUser(user);
    setDisabled(true);
  }

  return (
    <div>
      <form>
        <legend className="mt-3 mb-3">Профиль пользователя <strong>{user?.fullName || ""}</strong></legend>
        <span
          className="btn btn-sm btn-outline-secondary mt-3 mb-3 align-center"
          onClick={handleDisable}
        >
            {disabled ? <span><Unlock />{" Разрешить редактирование"}</span> : <span><Lock />{" Запретить редактирование"}</span>}
            
        </span>
          <InputGroupWithLock
            label='Фамилия'
            name='lastName'
            data={user?.lastName}
            handleForm={handleForm}
            darkMode={darkMode}
            disabled={disabled}
          />
          <InputGroupWithLock
            label='Имя'
            name='name'
            data={user?.name}
            handleForm={handleForm}
            darkMode={darkMode}
            disabled={disabled}
          />
          <InputGroupWithLock
            label='Отчество'
            name='middleName'
            data={user?.middleName}
            handleForm={handleForm}
            darkMode={darkMode}
            disabled={disabled}
          />
          <InputGroupWithLock
            label='Email'
            name='email'
            data={user?.email}
            handleForm={handleForm}
            darkMode={darkMode}
            disabled={disabled}
          />
          <InputGroupWithLock
            type='password'
            label='Пароль'
            name='password'
            data={user?.password}
            handleForm={handleForm}
            darkMode={darkMode}
            disabled={disabled}
          />
        <fieldset disabled={disabled}>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="isBlocked"
              name="isBlocked"
              onChange={(e) => handleForm(e)}
              checked={user?.isBlocked}
            />
            <label className="form-check-label" htmlFor="isBlocked">Блокировка пользователя</label>
          </div>
          <button
            type="submit"
            className={cn("btn btn-sm mt-4", {
              "btn-outline-primary": disabled,
              "btn-primary": !disabled,
            })}
            onClick={(e) => handleSubmit(e)}
          >
            Изменить данные
          </button>

        </fieldset>
      </form>
    </div>
  );
}
