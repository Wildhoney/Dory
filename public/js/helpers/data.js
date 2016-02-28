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
 * @param {Array} types
 * @return {*}
 */
export const defaultData = (...types) => {

    return defaultStates.filter(state => ~types.indexOf(state.type))
                        .map(state => state.result);
    
};
