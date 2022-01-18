const AUTH = 'auth';
const CASE = 'case';
const CASES = 'cases';
const CATEGORY = 'category';
const CLIENTS = 'clients';
const PROFILE = 'profile';
const USER = 'user';
const USERS = 'users';

const AUTH_ROUTES = {
    CASE,
    CASES,
    CATEGORY,
    CLIENTS,
    PROFILE,
    USER,
    USERS,
}

const SIMPLE_ROUTES = {
    AUTH,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    AUTH_ROUTES,
    SIMPLE_ROUTES,
    ...AUTH_ROUTES,
    ...SIMPLE_ROUTES,
};