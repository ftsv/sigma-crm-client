import { dataCases } from "./casesDB";
interface ManagerProps {
    id: string;
    initials: string;
}

interface IdentityDocumentProps {
    type: string;
    series: string;
    number: number;
    issuedBy: string;
    issuedDate: Date;
}

export interface ClientProps {
    id: string;
    fullName: string;
    contacts: string;
    identityDocument: IdentityDocumentProps;
    cases: any[];
    manager: ManagerProps;
}

export const dataClients: ClientProps[] = [
    {
        id:'dad324324hjk1h4',
        fullName: 'Иванов Иван Иванович',
        contacts: 'т. +79990001234',
        identityDocument: {
            type: 'Паспорт',
            series: '0406',
            number: 123456,
            issuedBy: 'УВД Русской России г.Красивый',
            issuedDate: new Date(2017, 2, 1),
        },
        cases: ['220112-1'],
        manager: {
            id: '61e2f164cc73c35f8fdb09c3',
            initials: 'Бобриков П.Б.',
        }
    },
    {
        id: 'dsa1332dadddas34124gjh341',
        fullName: 'Петров Петр Петрович',
        contacts: 'т. +79990006543',
        identityDocument: {
            type: 'Паспорт',
            series: '0406',
            number: 123456,
            issuedBy: 'ГУ МФД Афганской республики по г. Оброньск',
            issuedDate: new Date(2005, 11, 17),
        },
        cases: ['220110-2', '220110-1'],
        manager: {
            id: '61d6c1310e49d24950067b8a',
            initials: 'Егоров C.А',
        }
    },
    {
        id: '4n12j4njk31244j3',
        fullName: 'Сидоров Олег Николаевич',
        contacts: 'т. +79990346543',
        identityDocument: {
            type: 'Паспорт',
            series: '0406',
            number: 123456,
            issuedBy: 'УФМС Ражненского района г. Багдад',
            issuedDate: new Date(2004, 4, 12),
        },
        cases: ['220109-1'],
        manager: {
            id: '61d6c0f30e49d24950067b7c',
            initials: 'Пешкин С.С.',
        }
    },
];
