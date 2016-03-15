import Immutable from 'seamless-immutable';
import { uniqBy, prop } from 'ramda';
import { CATALOGUE, POSTS, POST } from '../config/events';
import { SUCCESS } from '../utilities/middleware';
import { fromServer } from '../utilities/state';

/**
 * @constant INITIAL_STATE
 * @type {Immutable}
 */
const INITIAL_STATE = new Immutable(fromServer('catalogue') || []);

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

    const result = Array.isArray(action.result) ? action.result : [action.result];

    switch (action.readyState) {

        case SUCCESS:

            switch (action.type) {

                case POST:
                case POSTS:
                    return new Immutable(distinct([ ...result, ...state ]));

                case CATALOGUE:
                    return new Immutable(distinct([ ...state, ...result ]));

            }

    }

    return state;

};
