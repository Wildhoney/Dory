import { CATALOGUE, POST } from '../config/events';
import { SUCCESS } from '../helpers/middleware';
import { defaultData } from '../helpers/data';

/**
 * @constant INITIAL_STATE
 * @type {Array}
 */
const INITIAL_STATE = defaultData(CATALOGUE) || [];

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
                    return action.result;

                case POST:
                    const index = state.findIndex(model => model.slug === action.model.slug);
                    return [
                        ...state.slice(0, index),
                        { ...action.model, data: { ...action.result } },
                        ...state.slice(index + 1)
                    ];

            }

    }

    return state;

};
