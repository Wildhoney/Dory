import Immutable from 'seamless-immutable';
import { MENU } from '../config/events';
import { fromServer } from '../helpers/state';

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = new Immutable(fromServer('options') || {
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
            return new Immutable({ ...state, menuOpen: action.open });

    }

    return state;

};
