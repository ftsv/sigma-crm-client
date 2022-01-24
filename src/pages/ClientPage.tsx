import React from 'react';
import { useLocation } from 'react-router-dom';
import { InputGroupWithLock } from '../components/FormItems/InputGroupWithLock';
import { dataClients, ClientProps } from '../dbsEmule/clientsDB';


export const ClientPage = ():JSX.Element => {
    const location = useLocation();
    const [client, setClient] = React.useState<ClientProps>({
        id: '',
        fullName: '',
        contacts: '',
        identityDocument: {
            type: 'Пасспорт',
            series: '0406',
            number: 123456,
            issuedBy: '',
            issuedDate: new Date(),
        },
        cases: [],
        manager: {
            id: '',
            initials: '',
        },
    });

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    }

    React.useEffect(() => {
        const dbData = dataClients.filter((element) => element.id == location.pathname.split('/')[2])[0];
        setClient(dbData);
        document.title = `Клиент ${dbData.fullName}`;
    }, []);
    return (
        <>
            <div>
                <span>Профиль клиента<strong className="ms-2">{client.fullName}</strong></span>
            </div>
            <div
                className="mt-4"
            >
                <InputGroupWithLock
                    value={client.manager.initials}
                    label="Менеджер"
                    name="manager"
                    handleForm={handleForm}
                    locker={false}
                    disabled={true}
                />
            </div>
            <div>
                {client.cases.length ? client.cases.map((item) => (
                    <span className="me-2">{item.id}</span>
                ))
                : null
                }
            </div>
        </>
    )
}