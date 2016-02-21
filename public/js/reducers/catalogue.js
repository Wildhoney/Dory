import { CATALOGUE } from '../config/events';
import { SUCCESS } from '../helpers/middleware';

/**
 * @constant INITIAL_STATE
 * @type {Array}
 */
const INITIAL_STATE = [];

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case CATALOGUE:

            switch (action.readyState) {
                case SUCCESS:
                    return action.result;
            }

    }

    return state;

};
