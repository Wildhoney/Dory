import { CATALOGUE, POSTS, POST } from '../config/events';
import { SUCCESS } from '../helpers/middleware';
import { defaultData } from '../helpers/data';
import { merge } from '../helpers/merge';

/**
 * @constant INITIAL_STATE
 * @type {Array}
 */
const INITIAL_STATE = Object.freeze(merge(defaultData(CATALOGUE, []), defaultData(POSTS, [])));

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default (state = INITIAL_STATE, action) => {

    switch (action.readyState) {

        case SUCCESS:

            switch (action.type) {

                case POSTS:
                case CATALOGUE:
                    return Object.freeze(merge(state, action.result));

                case POST:
                    return Object.freeze(merge(state, [action.result]));


            }

    }

    return state;

};
