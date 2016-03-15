import axios from 'axios';

/**
 * @constant GET
 * @type {String}
 */
export const GET = 'get';

/**
 * @method fetch
 * @param {String} url
 * @param {String} [method = GET]
 * @return {axios.Promise}
 */
export const fetch = (url, method) => {
    const baseURL = process.env.PORT ? `http://localhost:${process.env.PORT}` : null;
    return axios({ url, method: method || GET, baseURL }).then(response => response.data);
};
