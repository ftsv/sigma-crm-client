import React from 'react';
import cn from 'classnames';
import AUTH_ROUTES from '../constants';
// import { ClientsRowProps } from '../types/Tables/ClientsRowProps';
import { Link } from 'react-router-dom';
import { ButtonEye } from '../components/ButtonEye';
import { ClientProps } from '../dbsEmule/Database_Models';

interface TableProps {
    tableHeader: TableHeadersProps[];
    tableRows: any;
    darkMode?: boolean;
    skip?: number;
}

interface TableHeadersProps {
    name: string;
    header: string;
}

export const Table: React.FC<TableProps> = React.memo(({ tableHeader, tableRows, darkMode = false, skip = 0 }): JSX.Element => {
    const [tableHeaders, setTableHeaders] = React.useState(tableHeader);
    return (
        <>
            <table className={cn("table", "table-hover", {
                "table-dark": darkMode,
            })}>
                <thead>
                    <tr>
                        {tableHeaders?.length 
                            ? tableHeaders.map(header => (
                                <th scope="col" key={header.name}>
                                    {header.header}
                                </th>
                            ))
                            : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {tableRows?.length
                        ? tableRows.map((row: ClientProps, i: number) => (
                            <tr key={row.fullName}>
                                <td>
                                    {skip
                                        ? <span>{skip + i + 1}</span>
                                        : <span>{i + 1}</span>
                                    }
                                </td>
                                <td>{row.fullName}</td>
                                <td>
                                    <span>{row.contacts}</span>
                                </td>
                                <td>
                                    {`${row.identityDocument.type}
 серия: ${row.identityDocument.series} № ${row.identityDocument.number}
 выдан ${row.identityDocument.issuedBy}`}
                                </td>
                                <td>
                                    <Link to={ `/${AUTH_ROUTES.USER}/${row.manager.id}` }  className="text-decoration-none">
                                        {row.manager.initials}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={ `/${AUTH_ROUTES.CLIENT}/${row.id}` }  className="text-decoration-none">
                                        <ButtonEye
                                            darkMode={darkMode}
                                        />
                                    </Link>
                                    
                                </td>
                            </tr>
                        ))
                        : <tr></tr>
                        }
                </tbody>
            </table>
        </>
    )
});