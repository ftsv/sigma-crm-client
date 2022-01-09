import React from 'react';
import { Outlet } from 'react-router-dom';
import cn from 'classnames';
import { ThemeContext } from '../context/ThemeContext';

export const SimpleWrapper: React.FC = (): JSX.Element => {
    const { darkMode } = React.useContext(ThemeContext);
    return (
        <>
            <div
                className={cn({
                    'bg-dark': darkMode,
                    'text-white': darkMode,
                })}
                style={{ minHeight: '100vh', padding: '80px 0' }}
            >
                <div className='container'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};
