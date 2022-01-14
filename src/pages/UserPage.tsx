import React from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import { useHttp } from '../hooks/useHttp';

export const UserPage = () => {
    const { darkMode } = React.useContext(ThemeContext);
    const { addToast } = React.useContext(ToastsContext);
    const location = useLocation();
    const { request, error, loading } = useHttp();

    React.useEffect(() => {
        error !== null && addToast('Ошибка', `${error}`, 'danger', 10000);
    }, [error, addToast]);

    React.useEffect(() => {
        document.title = `Пользователь`;
    }, []);

    return(
        <>
        user PAGEEE
        </>
    )
}