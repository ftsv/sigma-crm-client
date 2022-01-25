import React from 'react';
import { Lock, Unlock } from 'react-bootstrap-icons';
import cn from 'classnames';

type HandleFormProps = React.ChangeEvent<HTMLInputElement>;

interface InputGroupWithLockProps {
  label: string;
  name: string;
  value: any; // оставить так, пока не устоится структура
  handleForm: (e: HandleFormProps) => void;
  darkMode?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password';
  autoComplete?: 'off' | 'email' | 'new-password' | 'current-password' | 'family-name' | 'given-name' | 'additional-name';
  locker?: boolean;
  col?: string;
}

export const InputGroupWithLock: React.FC<InputGroupWithLockProps> = (
  {
    name,
    label,
    value = '',
    handleForm,
    darkMode = false,
    disabled = false,
    type = 'text',
    autoComplete = 'off',
    locker = true,
    col = '',
  }): JSX.Element => {
  return (
    <fieldset disabled={ disabled }>
      <div className="input-group input-group-sm mb-3">
        <span className={`input-group-text ${col} justify-content-end`}>
          { label }
        </span>
        <input
          type={ type }
          id={ name }
          name={ name }
          className={ cn( "form-control", {
            "bg-dark": ( darkMode && disabled ),
            "text-white": ( darkMode && disabled ),
          } ) }
          value={ value }
          onChange={ ( e ) => handleForm( e ) }
          autoComplete={autoComplete}
        />
        {locker 
          ? (
            <span className="align-center ps-2 pe-2">
              { disabled ? <Lock /> : <Unlock /> }
            </span>
          )
          : null

        }
        
      </div>
    </fieldset>

  );
}