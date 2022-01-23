import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { ThemeContext } from '../context/ThemeContext';
import NavbarComponent from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import SIMPLE_ROUTES from '../constants/index';

export const AuthWrapper: React.FC = (): JSX.Element => {
    const { darkMode } = React.useContext(ThemeContext);
    const auth = React.useContext(AuthContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if(!auth.token) {
            auth.logout();
            navigate(`/${SIMPLE_ROUTES.AUTH}`, {replace: true});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.token]);
    return (
        <>
            <NavbarComponent />
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
