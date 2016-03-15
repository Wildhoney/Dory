/**
 * @constant renderedState
 * @type {Object}
 */
const parseState = typeof DEFAULT_DATA === 'undefined' ? {} : JSON.parse(atob(DEFAULT_DATA));

/**
 * @method fromServer
 * @param {String} key
 * @return {*}
 */
export const fromServer = key => {
    return parseState[key];
};
