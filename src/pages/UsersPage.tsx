import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import cn from 'classnames';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import queryStringCreator from '../services/query-string-creator';
import { useHttp } from '../hooks/useHttp';
import { Spinner } from 'react-bootstrap';
import { IUser } from '../types/User';
import UserList from '../components/UserList';
import { ModalUser } from '../components/Modals/ModalUser';
import { Pagination } from '../components/Pagination';

export const UsersPage = () => {
    const auth = useContext( AuthContext );
    const { darkMode } = useContext(ThemeContext);
    const { addToast } = useContext(ToastsContext);
    const location = useLocation();
    // const navigate = useNavigate();
    const { request, error, loading } = useHttp();
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [pagination, setPagination] = React.useState({page: 1, limit: 10, total: 0, pages: 0, skip: 0}); // возможно необходимо сделать контекст фильтра в localStorage для первичного отображения

    //=======вариант автоматической пагинации (блок в конце и observer)

    //=======вариант с ручным переключением

    // const queryHandler = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    //     setPagination({...pagination, [e.target.name]: parseInt(e.target.value) });
    // };
    const fetch = async () => {
        try {
            const {pagination, users} = await request(`/api/user/all${location.search}`,'GET', null, {
                Authorization: `Bearer ${auth.token}` 
            });
            setPagination(pagination);
            setUsers(users);
        } catch (e: any) {}
    }

    const addItem = React.useCallback(async (item) => {
        try {
            const data = await request('/api/auth/register', 'POST', {...item});
            addToast('Выполнено', `${data.message}`, 'success', 7000);
            fetch();
        } catch (e: any) {}
    },[])

    //либо сделать модальным, но лучше вынести на отдельную страницу Карточки пользователя
    const editItem = React.useCallback(async (item) => {
        try {
            await request(`/api/user/${item._id}`, 'PUT', {...item},{
                Authorization: `Bearer ${auth.token}` 
            });
            addToast("Выполнено", `Категория ${item.title.toLowerCase()} изменена!`, "success", 7000);
            fetch();
        } catch (e: any) {}
        
    },[])

    useEffect(() => {
        error !== null && addToast('Ошибка', `${error}`, 'danger',7000);
    }, [error, addToast]);

    useEffect(() => {
        location.search = queryStringCreator(pagination);
        fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.page, pagination.limit]);

    React.useEffect(() => {
        document.title = "Пользователи";
    }, []);

    return (
        <div className="container" style={{marginTop: "30px"}}>
            <div>
                <ModalUser darkMode={darkMode} addItem={addItem} />
            </div>
            {loading 
                ? (<div className="container justify-content-center mt-3">
                    <Spinner animation="border" variant="secondary" />
                </div>)
                : (<div>
                    <Pagination 
                        pagination={pagination} 
                        setPagination={setPagination} 
                        darkMode={darkMode} 
                        contentLoading={loading}
                        total={true}
                        limit={true}
                    />
                    {(users && users.length) && <UserList users={users} skip={pagination.skip} />}
                    <Pagination 
                        pagination={pagination} 
                        setPagination={setPagination} 
                        darkMode={darkMode} 
                    />
                </div>)
            }
        </div>
    )
}