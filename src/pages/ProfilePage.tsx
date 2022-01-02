import React, { useCallback, useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import { Pagination } from '../components/Pagination';
import cn from 'classnames';



export const ProfilePage = () => {
    const { darkMode } = useContext(ThemeContext);
    const { addToast } = useContext(ToastsContext);
    const [ pagination, setPagination ] = useState({page: 0, limit: 10, total: 10, pages: 1, skip: 0})
    const [body, setBody] = useState("");

    const submit = (e: any) => {
        if (e.key === "Enter"){
            addToast("dasd", e.target.value, "danger", 3000);
            setBody("");
        }
    }

    const handlerPagination = useCallback((e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setPagination({...pagination, [e.target.name]: e.target.name !== "current" ? parseInt(e.target.value) : parseInt(e.target.value) - 1 });

    }, [pagination]);

    console.log(":::::::Profile Render")

    return (
    <div className={cn({'bg-dark': darkMode, 'text-white': darkMode,})}
        style={{minHeight: "100vh", padding: "150px 0"}}>
            <div className="container">
                <input type="text" value={body} onChange={e => setBody(e.target.value)} onKeyPress={e => submit(e)}/>
                <button className="btn btn-success" onClick={() => addToast("pfujkjdjr", body, "info", 2000)}> добавить тостик</button>

                <div>
                    <span>Пагинация </span>
                    <Pagination pagination={pagination} setPagination={setPagination} />
                    <div>
                        <input type="number" name="page" value={pagination.page} min={1} onChange={e => handlerPagination(e)} />
                    </div>
                </div>
            </div>
        
    </div>
    )
}