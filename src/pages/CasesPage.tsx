import React from 'react';
import cn from 'classnames';
import AUTH_ROUTES from '../constants';
// import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { ToastsContext } from '../context/ToastsContext';
import { Link } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';
import currencyFormatter from '../services/currency-formatting';
// import { Spinner } from 'react-bootstrap';
// import { Pagination } from '../components/Pagination';
import DatabaseEmulator from '../dbsEmule/Database_Emulator';
import { CaseListItemProps } from '../dbsEmule/Database_Models';

interface FilterProps {
    position?: 'start' | 'center' | 'end' | 'between';
    initData: CaseListItemProps[]; // изменить под варианты
    setFilteredCases: (data: CaseListItemProps[]) => void;
    darkMode?: boolean;
}

const Filter: React.FC<FilterProps> = ({
    position = 'start',
    darkMode=false,
    initData,
    setFilteredCases,
}): JSX.Element => {
    const [filter, setFilter] = React.useState('');
    const [filterType, setFilterType] = React.useState('familyName')

    const handlerFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
        let filtered;
        switch (filterType) {
            case 'caseNum':
                filtered = initData.filter(
                    (element) => element.id.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setFilteredCases(filtered);
                break;
            case 'category':
                filtered = initData.filter(
                    (element) => element.category.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setFilteredCases(filtered);
                break;
            case 'familyName':
                filtered = initData.filter(
                    (element) => element.client?.fullName.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setFilteredCases(filtered);
                break;
            default:
                setFilteredCases(initData);
                break;
        }
    }
    return (
        <div className={`d-flex justify-content-${position}`}>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Поиск по</span>
                <select
                    className={cn("input-group-text", {
                        // "bg-dark text-white": darkMode,
                    })}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterType(e.target.value)}
                >
                    <option value="familyName">ФИО</option>
                    <option value="caseNum">Номер дела</option>
                    <option value="category">Категория</option>
                </select>
                <input
                    // className={cn("ms-2")}
                    value={filter}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlerFilter(e)}
                />
            </div>
            <hr />
        </div>
    )
}

export const CasesPage: React.FC = (): JSX.Element => {
    // const auth = React.useContext( AuthContext );
    const { darkMode } = React.useContext(ThemeContext);
    const { addToast } = React.useContext(ToastsContext);
    // const { request, error, loading } = useHttp();
    const [cases, setCases] = React.useState<CaseListItemProps[]>([]);
    const [filteredCases, setFilteredCases] = React.useState<CaseListItemProps[]>([]);
    // const [pagination, setPagination] = React.useState({page: 1, limit: 10, total: 0, pages: 0, skip: 0}); // возможно необходимо сделать контекст фильтра в localStorage для первичного отображения

    React.useEffect(() => {
        const fetchedCases = DatabaseEmulator.getCases();
        if (fetchedCases) {
            setCases(fetchedCases);
            setFilteredCases(fetchedCases);
        }
    },[]);

    // React.useEffect(() => {
    //     error !== null && addToast('Ошибка', `${error}`, 'danger',7000);
    // }, [error, addToast]);

    React.useEffect(() => {
        document.title = "Дела";
    }, []);
    return (
        <>
            {/* <Pagination 
                pagination={pagination} 
                setPagination={setPagination} 
                darkMode={darkMode} 
                contentLoading={loading}
                limit={true}
            /> */}
            <Filter
                position={"start"}
                darkMode={darkMode}
                initData={cases}
                setFilteredCases={setFilteredCases}
            />
                { filteredCases.length ? filteredCases.map(item => (
                    <div
                        className={cn("border border-1 rounded-3 p-2 mt-2", {
                            "border-dark": !darkMode,
                        })}
                        key={ item.id }
                    >
                        <div className="d-flex flex-row bd-highlight mb-3 justify-content-between ">
                            <span>{ "Дело № " }
                                <strong>
                                    <Link to={ `/${AUTH_ROUTES.CASE}/${ item.id }` } className="text-decoration-none">
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
                            <Link to={ `/${AUTH_ROUTES.CLIENT}/${item.client?.id}` }  className="text-decoration-none">{ item.client?.fullName }</Link>
                        </div>
                    </div>
                ))
                : <div className="mt-4">Данные отсутствуют</div>}
        </>
    )
}