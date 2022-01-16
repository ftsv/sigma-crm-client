import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import cn from 'classnames';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import queryStringCreator from '../services/query-string-creator';
import { useHttp } from '../hooks/useHttp';
import { Spinner } from 'react-bootstrap';
import { IUser } from '../types/User';
import UserList from '../components/UserList';
import { ModalUser } from '../components/Modals/ModalUser';
import { Pagination } from '../components/Pagination';
import { tokenChecker } from '../services/token-checker';

export const UsersPage = () => {
    const { darkMode } = React.useContext(ThemeContext);
    const { addToast } = React.useContext(ToastsContext);
    const location = useLocation();
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
            const {pagination, users} = await request(`/api/user/all${location.search}`,'GET', null, tokenChecker());
            setPagination(pagination);
            setUsers(users);
        } catch (err: any) {}
    }

    const addItem = React.useCallback(async (item) => {
        try {
            const data = await request('/api/user/register', 'POST', {...item}, tokenChecker());
            addToast('Выполнено', `${data.message}`, 'success', 7000);
            fetch();
            return true;
        } catch (err: any) {
            return false;
        }
    },[])

    //либо сделать модальным, но лучше вынести на отдельную страницу Карточки пользователя
    const editItem = React.useCallback(async (item) => {
        try {
            await request(`/api/user/${item._id}`, 'PUT', {...item}, tokenChecker());
            addToast("Выполнено", `Пользователь ${item.title.toLowerCase()} изменен!`, "success", 7000);
            fetch();
        } catch (err: any) {}
        
    },[])

    useEffect(() => {
        error !== null && addToast('Ошибка', `${error}`, 'danger', 10000);
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
                ? (<div className="d-flex justify-content-center mt-3">
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
                    {(users?.length) && <UserList users={users} skip={pagination.skip} />}
                    {(pagination.limit > 10 && pagination.total > pagination.limit) && <Pagination 
                        pagination={pagination} 
                        setPagination={setPagination} 
                        darkMode={darkMode} 
                    />}
                </div>)
            }
        </div>
    )
}