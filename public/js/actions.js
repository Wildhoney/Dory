import * as event from './config/events';
import { fetch } from './helpers/request';

/**
 * @method getPosts
 * @return {Object}
 */
export function getCatalogue() {

    return {
        type: event.CATALOGUE,
        promise: fetch('assets/catalogue.json')
    };

}
