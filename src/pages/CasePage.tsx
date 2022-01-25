import React from 'react';
import { useLocation } from 'react-router-dom';

export const CasePage: React.FC = (): JSX.Element => {
    const location = useLocation();
    const caseNum = location.pathname.split('/')[2];

    React.useEffect(() => {
        document.title = `Дело ${caseNum}`;
    }, []);
    return (
        <>
            <span>{`ДЕЛО № ${caseNum}`}</span>
        </>
    )
}