import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import { Link } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';
// import { Spinner } from 'react-bootstrap';
import { Pagination } from '../components/Pagination';

export const CasesPage: React.FC = (): JSX.Element => {
    // const auth = React.useContext( AuthContext );
    const { darkMode } = React.useContext(ThemeContext);
    const { addToast } = React.useContext(ToastsContext);
    const { request, error, loading } = useHttp();
    const [cases, setCases] = React.useState([
        {id: '220112-1', client: 'Ivanov I.I.', category: 'трудовые споры'},
        {id: '220110-1', client: 'Petrov P.P.', category: 'защита прав потребителей'},
        {id: '220109-1', client: 'Sidorov O.N.', category: ''},
    ]);
    const [pagination, setPagination] = React.useState({page: 1, limit: 10, total: 0, pages: 0, skip: 0}); // возможно необходимо сделать контекст фильтра в localStorage для первичного отображения

    React.useEffect(() => {
        error !== null && addToast('Ошибка', `${error}`, 'danger',7000);
    }, [error, addToast]);

    React.useEffect(() => {
        document.title = "Дела";
    }, []);
    return (
        <>
            <Pagination 
                pagination={pagination} 
                setPagination={setPagination} 
                darkMode={darkMode} 
                contentLoading={loading}
                limit={true}
            />
                {cases.length && cases.map(item => (
                    <div
                        className="border rounded-3 p-2 mt-2"
                    >
                        <div key={item.id}>
                            <span>{"Дело № "}
                                <strong>
                                    <Link to={ `/case/${item.id}` }>
                                        {item.id}
                                    </Link>
                                </strong>
                            </span>
                        </div>
                        <div>
                            <span className="text-secondary">{item.category}</span>
                        </div>
                        <div>
                            {item.client}
                        </div>
                    </div>
                ))}
        </>
    )
}