import React from 'react';
// import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import { Link } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';
import currencyFormatter from '../services/currency-formatting';
// import { Spinner } from 'react-bootstrap';
import { Pagination } from '../components/Pagination';
import { dataCases } from '../dbsEmule/casesDB';

interface CaseClientProps {
    id: string;
    fullName: string;
}
interface CasesProps {
    id: string;
    totalCost: number;
    client: CaseClientProps;
    category?: string;
}

export const CasesPage: React.FC = (): JSX.Element => {
    // const auth = React.useContext( AuthContext );
    const { darkMode } = React.useContext(ThemeContext);
    const { addToast } = React.useContext(ToastsContext);
    const { request, error, loading } = useHttp();
    const [cases, setCases] = React.useState<CasesProps[]>([]);
    const [pagination, setPagination] = React.useState({page: 1, limit: 10, total: 0, pages: 0, skip: 0}); // возможно необходимо сделать контекст фильтра в localStorage для первичного отображения

    React.useEffect(() => {
        setCases(dataCases);
    },[]);

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
                { cases.length && cases.map(item => (
                    <div
                        className="border rounded-3 p-2 mt-2"
                        key={ item.id }
                    >
                        <div className="d-flex flex-row bd-highlight mb-3 justify-content-between ">
                            <span>{ "Дело № " }
                                <strong>
                                    <Link to={ `/case/${ item.id }` }>
                                        { item.id }
                                    </Link>
                                </strong>
                            </span>
                            <span>
                                <strong>{ item.totalCost && currencyFormatter(item.totalCost, 'RUB') }</strong>
                            </span>
                        </div>
                        <div>
                            <span className="text-secondary">{ item.category }</span>
                        </div>
                        <div>
                            <Link to={ `/case/${item.client.id}` }>{ item.client.fullName }</Link>
                        </div>
                    </div>
                )) }
        </>
    )
}