import React from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import { useHttp } from '../hooks/useHttp';
import { tokenChecker } from '../services/token-checker';
import { IUser } from '../types/User';
import cn from 'classnames';
import { ProfileForm } from '../components/ProfileForm';

export const UserPage = React.memo(() => {
    const { darkMode } = React.useContext(ThemeContext);
    const { addToast } = React.useContext(ToastsContext);
    const location = useLocation();
    const { request, error, loading } = useHttp();
    const [user, setUser] = React.useState<IUser>();
    // const [requestData, setRequestData] = React.useState();

    const fetch = React.useCallback(
        async () => {
            try {
                const fetched: IUser = await request(`/api/user/get/${location.pathname.split('/')[2]}`,'GET', null, tokenChecker());
                setUser(fetched);
                return fetched;
            } catch (err: any) {}
        }, [])

    React.useEffect(() => {
        error !== null && addToast('Ошибка', `${error}`, 'danger', 10000);
    }, [error, addToast]);

    React.useEffect(() => {
        fetch();
        document.title = user?.fullName || 'Пользователь';
    }, [user?.fullName]);

    return(
        <>
            <div className="mb-2">
                <span>
                    здесь можно добавить breadchumb
                </span>
            </div>
            <ProfileForm
                user={user}
                setUser={setUser}
                darkMode={darkMode}
            />
        </>
    )
})