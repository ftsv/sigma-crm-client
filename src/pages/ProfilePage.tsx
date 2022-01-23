import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import LOCAL_STORAGE from '../constants/index';
import { ProfileForm } from '../components/ProfileForm';
import { IUser } from '../types/User';
import { useHttp } from '../hooks/useHttp';
import { tokenChecker } from '../services/token-checker';
// import cn from 'classnames';

export const ProfilePage: React.FC = () => {
    const { darkMode } = React.useContext(ThemeContext);
    const { userId, setInitials } = React.useContext(AuthContext);
    const { addToast } = React.useContext(ToastsContext);
    const { request, error } = useHttp();
    const [user, setUser] = React.useState<IUser>();

    const getUser = React.useCallback(
        async (userId) => {
            const header = await tokenChecker();
            try {
                const fetched: IUser = await request(`/api/user/${userId}`,'GET', null, header);
                setUser(fetched);
            } catch (err: any) {}
        }, [request]);

    const editUser = React.useCallback(
        async (user) => {
            const header = await tokenChecker();
            try {
                const fetched: IUser = await request(`/api/user/${userId}`,'PUT', {...user}, header);
                setUser(fetched);
                if (fetched.initials) {
                    localStorage.setItem(LOCAL_STORAGE.INITIALS, JSON.stringify({initials: fetched?.initials }));
                    setInitials(fetched.initials);
                }
            } catch (err: any) {
                getUser(userId);
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    React.useEffect(() => {
        error !== null && addToast('Ошибка', `${error}`, 'danger', 10000);
    }, [error, addToast]);

    React.useEffect(() => {
        if (userId !== null && tokenChecker()) {
            try {
                getUser(userId);
            } catch (error) {
                
            }
        }
        document.title = `Профиль ${user?.fullName}`;
        console.log({userId});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return (
        <div className="container">
            <ProfileForm
            profile={true}
            user={user}
            setUser={setUser}
            editUser={editUser}
            darkMode={darkMode}
            />
        </div>
    )
}