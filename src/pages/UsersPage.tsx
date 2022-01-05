import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import queryStringCreator from '../services/query-string-creator';
import { useHttp } from '../hooks/useHttp';
import { Spinner } from 'react-bootstrap';
import { IUser } from '../types/User';
import UserList from '../components/UserList';
import cn from 'classnames';
import { Pagination } from '../components/Pagination';

export const UsersPage = () => {
    const auth = useContext( AuthContext );
    const { darkMode } = useContext(ThemeContext);
    const { addToast } = useContext(ToastsContext);
    const location = useLocation();
    // const navigate = useNavigate();
    const { request, error, loading } = useHttp();
    const [users, setUsers] = useState<IUser[]>([]);
    const [pagination, setPagination] = useState({page: 1, limit: 10, total: 0, pages: 0, skip: 0}); // возможно необходимо сделать контекст фильтра в localStorage для первичного отображения

    //=======вариант автоматической пагинации (блок в конце и observer)
    //=======вариант с ручным переключением

    // const queryHandler = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    //     setPagination({...pagination, [e.target.name]: parseInt(e.target.value) });
    // };

    useEffect(() => {
        error !== null && addToast('Ошибка', `${error}`, 'danger',7000);
    }, [error, addToast]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const {pagination, users} = await request(`/api/user/all${location.search}`,'GET', null, {
                    Authorization: `Bearer ${auth.token}` 
                });
                setPagination(pagination);
                setUsers(users);
            } catch (e: any) {
                addToast('Ошибка', `${e}`, 'danger', 7000);
            }
        }
        location.search = queryStringCreator(pagination);
        fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.page, pagination.limit]);

    return (
        <div
            className={cn({
                'bg-dark': darkMode,
                'text-white': darkMode,
            })}
            style={{minHeight: "100vh", padding: "80px 0"}}
        >
            <div className="container" style={{marginTop: "30px"}}>
                <div>
                    
                </div>
                {loading 
                    ? (<div className="container justify-content-center" style={{marginTop: "20px"}}>
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
        </div>
    )
}