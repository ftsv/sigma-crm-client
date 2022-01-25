import React from 'react';
import { EyeFill, EyeSlashFill, Lock, Unlock } from 'react-bootstrap-icons';
import VALIDATION from '../../constants/index';
import cn from 'classnames';

type HandleFormProps = React.ChangeEvent<HTMLInputElement>;

interface InputPassGroupProps {
  label: string;
  name: string;
  data: any;
  handleForm: (e: HandleFormProps) => void;
  darkMode?: boolean;
  disabled?: boolean;
  setFormDisabled: (formDisabled: boolean) => void;
  col?: string;
}

export const InputPassGroup: React.FC<InputPassGroupProps> = (
  {
    label,
    name,
    data,
    handleForm,
    darkMode = false,
    disabled = false,
    setFormDisabled,
    col = '',
  }): JSX.Element => {
    const [showPass, setShowPass] = React.useState(false);
    const [type, setType] = React.useState('password');
    const [validator, setValidator] = React.useState('');

    const handlePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!showPass) {
        setType('text');
      }
      if (showPass) {
        setType('password');
      }

      setShowPass(!showPass);
    }

    const handleFormValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValidator(e.target.value);
      if (typeof data === 'string' && data.length >= VALIDATION.USER_PASS_LENGTH && data === e.target.value) {
        setFormDisabled(false);
      }
    }

  React.useEffect(() => {
    if (data !== validator) {
      setFormDisabled(true);
    }
  }, [data, validator]);

  React.useEffect(() => {
      setFormDisabled(disabled);
  },[disabled])
  return (
    <div>
      <fieldset disabled={disabled}>
        <div className="input-group input-group-sm mb-3">
          <span className={`input-group-text ${col} justify-content-end`}>
            {label}
          </span>
          <input 
            type={type}
            id={name} 
            name={name}
            autoComplete="new-password"
            className={cn("form-control", {
              "bg-dark": (darkMode && disabled),
              "text-white": (darkMode && disabled),
            })}
            value={data}
            onChange={(e) => handleForm(e)}
          />
          <button
              className="input-group-text"
              type="button"
              onClick={handlePassword}
              disabled={disabled}
            >
              {showPass ? <EyeSlashFill /> : <EyeFill />}
            </button>
          <span className="align-center ps-2 pe-2">
            {disabled ? <Lock /> : <Unlock />}
          </span>
        </div>
      </fieldset>
      <fieldset disabled={disabled}>
        <div className="input-group input-group-sm mb-3">
          <span className={`input-group-text ${col} justify-content-end`}>
            {`${label} (проверка)`}
          </span>
          <input 
            type={type}
            id={`${name}-validator`} 
            name={`${name}-validator`}
            autoComplete="new-password"
            className={cn("form-control", {
              "bg-dark": (darkMode && disabled),
              "text-white": (darkMode && disabled),
            })}
            value={validator}
            onChange={(e) => handleFormValidation(e)}
          />
          <button
              className="input-group-text"
              type="button"
              onClick={handlePassword}
              disabled={disabled}
            >
              {showPass ? <EyeSlashFill /> : <EyeFill />}
            </button>
          <span className="align-center ps-2 pe-2">
            {disabled ? <Lock /> : <Unlock />}
          </span>
        </div>
      </fieldset>
    </div>
  )
}