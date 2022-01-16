import React, { FormEvent } from 'react';
import cn from 'classnames';
import { IUser } from '../types/User';
import { Lock, Unlock } from 'react-bootstrap-icons';
import { InputGroupWithLock } from './InputGroupWithLock';

interface ProfilePageProps {
  user?: IUser;
  setUser: (data: any) => void;
  darkMode: boolean;
}

export const ProfileForm: React.FC<ProfilePageProps>  = ({
  user,
  setUser,
  darkMode = false,
}): JSX.Element => {
  const [disabled, setDisabled] = React.useState(true);
  console.log({ user });

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleDisable = () => setDisabled(!disabled);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('форма отработала');
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
        <fieldset disabled={disabled}>
          <button
            type="submit"
            className={cn("btn btn-sm", {
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