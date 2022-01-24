import React from 'react';
import cn from 'classnames';
import { ThemeContext } from '../context/ThemeContext';
import { Table } from '../containers/Table';
import { Pagination } from '../components/Pagination';
import { ClientsRowProps } from '../types/Tables/ClientsRowProps';
import { dataClients, ClientProps } from '../dbsEmule/clientsDB';



export const ClientsPage: React.FC = (): JSX.Element => {
    const {darkMode} = React.useContext(ThemeContext);
    const [pagination, setPagination] = React.useState({page: 1, limit: 10, total: 0, pages: 0, skip: 0}); // возможно необходимо сделать контекст фильтра в localStorage для первичного отображения
    const [clients, setClients] = React.useState<ClientProps[]>([]);
    const tableHeader = [{
        name: 'counter',
        header: '#',
    }, {
        name: 'fullName',
        header: 'ФИО',
    },{
        name: 'contacts',
        header: 'Контакты',
    }, {
        name: 'documents',
        header: 'Документы'
    }, {
        name: 'manager',
        header: 'Менеджер',
    }, {
        name: 'actions',
        header: 'Действия',
    }];

    React.useEffect(() => {
        setClients(dataClients);
    }, []);

    React.useEffect(() => {
        document.title = "Клиенты";
    }, []);
    return (
        <div>
        <Pagination pagination={pagination} setPagination={setPagination} darkMode={darkMode} />
        <Table tableHeader={tableHeader} tableRows={clients} darkMode={darkMode} />
        </div>
    )
}