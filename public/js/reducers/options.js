import { MENU } from '../config/events';

/**
 * @constant INITIAL_STATE
 * @type {Array}
 */
const INITIAL_STATE = {
    menuOpen: false
};

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case MENU:
            return { ...state, menuOpen: action.open };

    }

    return state;

};
