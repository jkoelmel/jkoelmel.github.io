import axios from 'axios';

export const getAuth = (url, params) => {
    return axios.get(url, {
        params: params
    });
};

export const putAuth = (url, data) => {
    return axios.put(url, data);
};

export const postAuth = (url, data) => {
    return axios.post(url, data);
};

export const deleteAuth = (url) => {
    return axios.delete(url);
};
