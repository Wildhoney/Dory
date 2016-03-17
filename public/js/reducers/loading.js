import Immutable from 'seamless-immutable';
import { REQUEST, SUCCESS, FAILURE } from '../utilities/middleware';

/**
 * @constant INITIAL_STATE
 * @type {Immutable}
 */
const INITIAL_STATE = new Immutable([]);

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default (state = INITIAL_STATE, action) => {

    switch (action.readyState) {

        case REQUEST:
            return new Immutable([ ...state, action.type ]);

        case SUCCESS:
        case FAILURE:
            const completedIndex = state.indexOf(action.type);
            return new Immutable(state.filter((model, index) => index !== completedIndex));

    }

    return state;

};
