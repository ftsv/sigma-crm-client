
export interface IClient {
    _id?: string | number;
    lastName?: string;
    firstName: string;
    middleName?: string;
    contacts?: any; // сделать описание
    manager: string;
}