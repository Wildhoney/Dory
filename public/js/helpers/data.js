import { SUCCESS } from './middleware';

/**
 * Attempt to reconcile the client state with the server state.
 *
 * @constant defaultStates
 * @type {Array}
 */
const defaultStates = typeof DEFAULT_DATA === 'undefined' ? [] : (() => {

    try {
        return JSON.parse(global.atob(DEFAULT_DATA));
    } catch (e) {
        console.log(e);
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

/**
 * @method hasPost
 * @param {Array} catalogue
 * @param {Object} post
 * @return {Boolean}
 */
export const hasPost = (catalogue, post) => {
    const model = catalogue.find(model => model.slug === post.slug);
    return !!(model && model.hasOwnProperty('content'));
};
