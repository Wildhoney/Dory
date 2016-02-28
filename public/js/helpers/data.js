import { SUCCESS } from './middleware';

/**
 * Attempt to reconcile the client state with the server state.
 *
 * @constant defaultStates
 * @type {Array}
 */
const defaultStates = typeof DEFAULT_DATA !== 'undefined' ? JSON.parse(DEFAULT_DATA) : [];

/**
 * @method defaultData
 * @param {String} type
 * @return {*}
 */
export const defaultData = type => {
    const byType = state => state.type === type && state.readyState === SUCCESS;
    return (defaultStates.find(byType) || {}).result;
};
