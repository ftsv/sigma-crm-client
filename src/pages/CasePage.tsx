import React from 'react';
import { useLocation } from 'react-router-dom';

export const CasePage: React.FC = (): JSX.Element => {
    const location = useLocation();
    console.log(location);

    React.useEffect(() => {
        document.title = `Дело `;
    }, []);
    return (
        <>
            <span>{`ДЕЛО № ${location.pathname.split('/')[2]}`}</span>
        </>
    )
}