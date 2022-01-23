import React from 'react';
import cn from 'classnames';
import { ClientsRowProps } from '../types/Tables/ClientsRowProps';
import { Link } from 'react-router-dom';
import { ButtonEye } from '../components/ButtonEye';

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
                        ? tableRows.map((row: ClientsRowProps, i: number) => (
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
                                    {row.cases.length
                                        ? row.cases.map((item: string) => (
                                            <span key={item}> <Link to={ `/case/${item}` }>{item}</Link></span>
                                        ))
                                        : ""
                                    }
                                </td>
                                <td>
                                    {row.manager}
                                </td>
                                <td>
                                    <ButtonEye darkMode={darkMode}/>
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