import { SUCCESS } from './middleware';

/**
 * Attempt to reconcile the client state with the server state.
 *
 * @constant defaultStates
 * @type {Array}
 */
const defaultStates = typeof DEFAULT_DATA === 'undefined' ? [] : (() => {

    try {
        return JSON.parse(DEFAULT_DATA);
    } catch (e) {
        return [];
    }

})();

/**
 * @method defaultData
 * @param {String} type
 * @param {*} defaultData
 * @return {*}
 */
export const defaultData = (type, defaultData) => {
    const byType = state => state.type === type && state.readyState === SUCCESS;
    return (defaultStates.find(byType) || {}).result || defaultData;
};
