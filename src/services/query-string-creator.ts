const queryStringCreator = (queryObject: any) => {
    let queryParams = "?";
    for (let key in queryObject) {
        if (key === Object.keys(queryObject)[0]) {
            queryParams += (`${key}=${queryObject[key]}`);
        } else if (typeof queryObject[key] === 'number' || typeof queryObject[key] === 'string' ) {
            queryParams += (`&${key}=${queryObject[key]}`);
        }
    }
    return queryParams;
}

export default queryStringCreator;