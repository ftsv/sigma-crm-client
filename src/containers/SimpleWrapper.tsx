import React from 'react';
import { Outlet } from 'react-router-dom';
import cn from 'classnames';
import { ThemeContext } from '../context/ThemeContext';

export const SimpleWrapper: React.FC = (): JSX.Element => {
    const { darkMode } = React.useContext(ThemeContext);
    return (
        <>
            <div
                className={cn('pt-5', 'pb-5', {
                    'bg-dark': darkMode,
                    'text-white': darkMode,
                })}
                style={{ minHeight: '100vh'}}
            >
                <div className='mt-4 mb-4 container'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};
