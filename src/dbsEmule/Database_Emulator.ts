import React from "react";
import { dataCases } from "./casesDB";
import { dataClients } from "./clientsDB";
import { CaseListItemProps, ClientProps, SimpleClientProps } from './Database_Models';

class DatabaseEmulator extends React.Component {
    static getClient (id: string) {
        let client: ClientProps = dataClients.filter(element => element.id === id)[0]; // ищем первый попавшийся
        if (!client) {
            return;
        }
        const cases = dataCases.filter(element => element.clientId === id);
        
        if (cases.length) {
            client = {...client, cases};
        }
        return client;
    }

    static getCases () {
        let cases: CaseListItemProps[] = dataCases;
        if (!cases) {
            return;
        }
        const simpleClients: SimpleClientProps[] = dataClients;
        if (simpleClients.length) {
            simpleClients.forEach(item => {
                const { casesIds, identityDocument, manager, ...rest} = item;
                item = rest;
            })
            cases.forEach(item => (
                item.client = simpleClients.filter(element => element.id === item.clientId)[0]) || {
                        id: '0',
                        fullName: 'не назначен',
                        contacts: 'не назначен',
                    }
                );
        }
        return cases;
    }

}

export default DatabaseEmulator;