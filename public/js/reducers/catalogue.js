import { CATALOGUE, POSTS } from '../config/events';
import { SUCCESS } from '../helpers/middleware';
import { defaultData } from '../helpers/data';
import { merge } from '../helpers/merge';

/**
 * @constant INITIAL_STATE
 * @type {Array}
 */
// const INITIAL_STATE = defaultData(CATALOGUE) || [];
const INITIAL_STATE = [];

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default (state = INITIAL_STATE, action) => {

    switch (action.readyState) {

        case SUCCESS:

            switch (action.type) {

                case CATALOGUE:
                    return merge(state, action.result);

                case POSTS:
                    return merge(state, action.result);

            }

    }

    return state;

};
