import { dataClients } from './clientsDB'

export const dataCases = [
    {
        id: '220112-1',
        totalCost: 41000,
        category: 'Трудовые споры',
        client: dataClients[0],
    }, {
        id: '220110-2',
        totalCost: 60000000,
        client: dataClients[1],
        category: 'Защита прав потребителей',
    }, {
        id: '220110-1',
        totalCost: 15000,
        client: dataClients[1],
        category: 'Защита прав потребителей',
    }, {
        id: '220109-1',
        totalCost: 15000,
        client: dataClients[2],
        category: 'Банкротство',
    }, {
        id: '220109-12',
        totalCost: 45000,
        client: {
            id: '4n12j431njk3432431244j3',
            fullName: 'Сидоренко Ольга Николаевна',
        },
        category: 'Семейное право',
    }, {
        id: '220119-12',
        totalCost: 55000,
        client: {
            id: '43123n12j4njk3432431244j3',
            fullName: 'Петрищева Олеся Петровна',
        },
        category: 'Займы',
    },
];
