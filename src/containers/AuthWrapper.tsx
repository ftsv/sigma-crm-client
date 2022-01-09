import React from 'react';
import { Outlet } from 'react-router-dom';
import cn from 'classnames';
import { ThemeContext } from '../context/ThemeContext';
import NavbarComp from '../components/Navbar';

export const AuthWrapper: React.FC = (): JSX.Element => {
    const { darkMode } = React.useContext(ThemeContext);
    return (
        <>
            <NavbarComp />
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
