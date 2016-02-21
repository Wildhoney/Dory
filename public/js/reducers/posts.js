import { POST } from '../config/events';

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = {};

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case POST:
            return action.posts;

    }

    return state;

};
