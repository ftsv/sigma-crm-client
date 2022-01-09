import React from 'react';
import { useLocation } from 'react-router-dom';

export const CasesPage: React.FC = (): JSX.Element => {
    const location = useLocation();
    console.log(location);

    React.useEffect(() => {
        document.title = "Дела";
    }, []);
    return (
        <>
            Cases
        </>
    )
}