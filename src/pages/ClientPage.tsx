import React from 'react';
import { useLocation } from 'react-router-dom';
import { InputGroupWithLock } from '../components/FormItems/InputGroupWithLock';
import DatabaseEmulator from '../dbsEmule/Database_Emulator';
import { ClientProps } from '../dbsEmule/Database_Models';


export const ClientPage = ():JSX.Element => {
    const location = useLocation();
    const [client, setClient] = React.useState<ClientProps>({
        id: '',
        fullName: 'ОТСУТСТВУЕТ В БАЗЕ :(',
        contacts: '',
        identityDocument: {
            type: 'Паспорт',
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

        const dbData = DatabaseEmulator.getClient(location.pathname.split('/')[2]);
        // const dbData = dataClients.filter((element) => element.id == location.pathname.split('/')[2])[0];
        if (dbData) {
            setClient(dbData);
            document.title = `Клиент ${dbData.fullName}`;
        }
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
                {client.cases?.length ? client.cases.map((item) => (
                    <span key={item.id} className="me-2">{item.id}</span>
                ))
                : null
                }
            </div>
        </>
    )
}