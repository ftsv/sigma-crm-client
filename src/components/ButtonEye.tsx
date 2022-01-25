import React from 'react';
import cn from 'classnames';
import { EyeFill } from 'react-bootstrap-icons';


interface ButtonEyeProps {
    darkMode?: boolean;
    disabled?: boolean;
}

export const ButtonEye: React.FC<ButtonEyeProps> = ({darkMode = false, disabled = false}): JSX.Element => {
    return(
        <button 
            className={cn("btn", "btn-sm", {
                "btn-outline-primary": !darkMode,
                "btn-primary": darkMode,
            })}
            disabled={disabled}
        >
            <EyeFill />
        </button>
)
}