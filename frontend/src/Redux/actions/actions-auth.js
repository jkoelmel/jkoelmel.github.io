import axios from 'axios';

const getHeaders = (noCache = false) => {
    let headers = { 'Content-Type': 'application/json' };
    // This shouldn't be relevant, but just in case it comes up...
    if (noCache) {
        headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    }
    return headers;
};

export const getAuth = (url, params, noCache = false) => {
    const headers = getHeaders(noCache);
    return axios.get(url, {
        headers: headers,
        params: params
    });
};

export const putAuth = (url, data) => {
    const headers = getHeaders();
    return axios.put(url, data, {
        headers: headers
    });
};

export const postAuth = (url, data) => {
    const headers = getHeaders();
    return axios.post(url, data, {
        headers: headers
    });
};

export const deleteAuth = (url) => {
    const headers = getHeaders();
    return axios.delete(url, {
        headers: headers,
    });
};
