import { dataCases } from "./casesDB";
import { ClientProps } from "./Database_Models";

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
        casesIds: [''],
        manager: {
            id: '61e2f164cc73c35f8fdb09c3',
            initials: 'Бобриков П.Б.',
        }
    }, {
        id: 'dsa1332dadddas34124gjh341',
        fullName: 'Петров Петр Петрович',
        contacts: 'т. +79990006543',
        identityDocument: {
            type: 'Паспорт',
            series: '0406',
            number: 123456,
            issuedBy: 'ГУ МФД Афганской Республики по г. Оброньск',
            issuedDate: new Date(2005, 11, 17),
        },
        casesIds: [''],
        manager: {
            id: '61d6c1310e49d24950067b8a',
            initials: 'Егоров C.А',
        }
    }, {
        id: '43123n12j4njk3432431244j3',
        fullName: 'Шпагин Эдуард Павлович',
        contacts: 'т. +71331206543',
        identityDocument: {
            type: 'Паспорт',
            series: '0206',
            number: 432456,
            issuedBy: 'ГУ МФД Республики Тыва по г. Славный',
            issuedDate: new Date(2007, 6, 13),
        },
        casesIds: [''],
        manager: {
            id: '61d6c1310e49d24950067b8a',
            initials: 'Егоров C.А',
        }
    }, {
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
        casesIds: [''],
        manager: {
            id: '61d6c0f30e49d24950067b7c',
            initials: 'Пешкин С.С.',
        }
    },
];
