const AUTH = 'auth';
const CASE = 'case';
const CASES = 'cases';
const CATEGORY = 'category';
const CLIENT = 'client';
const CLIENTS = 'clients';
const INITIALS = 'initials';
const PROFILE = 'profile';
const THEME = 'Theme';
const USER = 'user';
const USER_DATA = 'userData';
const USER_PASS_LENGTH = 3;
const USERS = 'users';

const AUTH_ROUTES = {
    CASE,
    CASES,
    CATEGORY,
    CLIENT,
    CLIENTS,
    PROFILE,
    USER,
    USERS,
}

const SIMPLE_ROUTES = {
    AUTH,
}

const LOCAL_STORAGE = {
    THEME,
    USER_DATA,
    INITIALS,
}

const VALIDATION = {
    USER_PASS_LENGTH,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    AUTH_ROUTES,
    SIMPLE_ROUTES,
    LOCAL_STORAGE,
    VALIDATION,
    ...AUTH_ROUTES,
    ...SIMPLE_ROUTES,
    ...LOCAL_STORAGE,
    ...VALIDATION,
};