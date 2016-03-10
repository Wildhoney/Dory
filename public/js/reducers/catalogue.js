import Immutable from 'seamless-immutable';
import { CATALOGUE, POSTS, POST } from '../config/events';
import { SUCCESS } from '../helpers/middleware';
import { defaultData } from '../helpers/data';
import { uniqBy, prop } from 'ramda';

/**
 * @constant INITIAL_STATE
 * @type {Immutable}
 */
const INITIAL_STATE = new Immutable([]);

/**
 * @method distinct
 * @return {Array}
 */
const distinct = uniqBy(prop('slug'));

/**
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
export default (state = INITIAL_STATE, action) => {

    switch (action.readyState) {

        case SUCCESS:

            const result = Array.from(action.result);

            switch (action.type) {

                case POST:
                case POSTS:
                case CATALOGUE:
                    return new Immutable(distinct([ ...state, ...result ]));

            }

    }

    return state;

};
