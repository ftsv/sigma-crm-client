import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import { useHttp } from '../hooks/useHttp';
import { Spinner } from 'react-bootstrap';
import { IUser } from '../types/User';
import UserList from '../components/UserList';
import cn from 'classnames';

export const UsersPage = () => {
    const auth = useContext( AuthContext );
    const { darkMode } = useContext(ThemeContext);
    const { addToast } = useContext(ToastsContext);
    // const location = useLocation();
    // const navigate = useNavigate();
    const { request, error, loading } = useHttp();
    const [users, setUsers] = useState<IUser[]>([]);
    const [pagination, setPagination] = useState({page: 0, limit: 10, total: 21, pages: 1, skip: 0}); // возможно необходимо сделать контекст фильтра в localStorage для первичного отображения
    console.log("///// UserPage - Render :::::::: ");

    const fetchUsers = useCallback(async (queryString = "") => {
        try {
            const {pagination, users} = await request(`/api/user/pagination${queryString}`,'GET', null, {
                Authorization: `Bearer ${auth.token}` 
            });

            setPagination(pagination);
            setUsers(users);
        } catch (e: any) {
            addToast("Ошибка", `${e}`, "danger", 7000);
        }
    },[auth.token, request,addToast])


    //=======вариант автоматической пагинации (блок в конце и observer)
    //=======вариант

    const queryStringCreator = useCallback((queryObject: any) => {
        let queryParams = "?";

        for (let key in queryObject) {
            if (key === Object.keys(queryObject)[0]) {
                queryParams += (`${key}=${queryObject[key]}`);
            } else if (typeof queryObject[key] === "number" || typeof queryObject[key] === "string" ) {
                queryParams += (`&${key}=${queryObject[key]}`);
            }
        }

        return queryParams;
    }, [])

    const queryHandler = useCallback((e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        let queryState = {...pagination, [e.target.name]: e.target.name !== "page" ? parseInt(e.target.value) : parseInt(e.target.value) - 1 };
        const queryParams = queryStringCreator(queryState);
        
        // navigate(`/users${queryParams}`, {replace: true});
        fetchUsers(queryParams);
    }, [fetchUsers,queryStringCreator, pagination]);

    useEffect(() => {
        fetchUsers(queryStringCreator(pagination));
    }, [queryStringCreator, fetchUsers, pagination]);

    useEffect(() => {
        error !== null && addToast("Ошибка", `${error}`, "danger", 7000);
    }, [error, addToast])

    return (
        <div
            className={cn({
                'bg-dark': darkMode,
                'text-white': darkMode,
            })}
            style={{minHeight: "100vh", padding: "80px 0"}}
        >
            <div className="container" style={{marginTop: "30px"}}>
                <div className="d-flex justify-content-between align-items-center">
                    <button 
                        className={cn("btn", "btn-sm", {
                            "btn-outline-primary": !darkMode,
                            "btn-primary": darkMode,
                            })}
                        onClick={() => fetchUsers(queryStringCreator(pagination))}
                    >
                        Получить список пользователей
                    </button>
                    <div>
                        <span>{`общее количество: ${pagination.total} `}</span>
                        <span>страница № </span>
                        <input
                            type="number"
                            name="page"
                            value={pagination.page + 1}
                            min={1}
                            max={pagination.pages}
                            onChange={(e) => queryHandler(e)}
                        />
                        <span>{`/ ${pagination.pages} `}</span>
                        <span style={{margin: "0 10px"}}>кол-во на стр:</span>
                        <select
                            name="limit"
                            value={pagination.limit}
                            onChange={(e) => queryHandler(e)}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
            
                {loading 
                    ? (<div className="container justify-content-center" style={{marginTop: "20px"}}>
                        <Spinner animation="border" variant="secondary" />
                    </div>)
                    : (users && users.length) && <UserList users={users} skip={pagination.skip} /> }
                </div>
        </div>
    
    )
}