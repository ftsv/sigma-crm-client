export const tokenChecker = () => {
    const data = JSON.parse(localStorage.getItem('userData') || '{}');
    if (data?.token) {
        return {Authorization: `Bearer ${data.token}`};
    }
}