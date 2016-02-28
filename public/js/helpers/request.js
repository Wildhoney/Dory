import axios from 'axios';

/**
 * @method fetch
 * @param {String} url
 * @param {String} method
 * @return {axios.Promise}
 */
export const fetch = (url, method = 'get') => {
    const baseURL = process.env.PORT ? `http://localhost:${process.env.PORT}` : null;
    return axios({ url, method, baseURL}).then(response => response.data);
};