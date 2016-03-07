import { MENU } from '../config/events';

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = Object.freeze({
    menuOpen: false
});

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case MENU:
            return Object.freeze({ ...state, menuOpen: action.open });

    }

    return state;

};
