import React from 'react';
import { Lock, Unlock } from 'react-bootstrap-icons';
import cn from 'classnames';

type HandleFormProps = React.ChangeEvent<HTMLInputElement>;

interface InputGroupWithLockProps {
  label: string;
  name: string;
  data: any; // оставить так, пока не устоится структура
  handleForm: (e: HandleFormProps) => void;
  darkMode?: boolean;
  disabled?: boolean;
  type?: 'text' | 'password';
}

export const InputGroupWithLock: React.FC<InputGroupWithLockProps> = (
  {
    name,
    label,
    data,
    handleForm,
    darkMode = false,
    disabled = false,
    type = 'text',
  }): JSX.Element => {
    return (
      <fieldset disabled={disabled}>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text">
            {label}
          </span>
          <input 
            type={type}
            id={name} 
            name={name}
            className={cn("form-control", {
              "bg-dark": (darkMode && disabled),
              "text-white": (darkMode && disabled),
            })}
            value={data}
            onChange={(e) => handleForm(e)}
          />
          <span className="align-center ps-2 pe-2">
            {disabled ? <Lock /> : <Unlock />}
          </span>
        </div>
      </fieldset>
        
    )
}