import * as event from './config/events';
import { fetch } from './helpers/request';

/**
 * @method getCatalogue
 * @return {Object}
 */
export function getCatalogue() {
    return { type: event.CATALOGUE, promise: fetch('assets/catalogue.json') };
}

/**
 * @method getPosts
 * @param {Number} pageNumber
 * @return {Object}
 */
export function getPosts(pageNumber) {
    return { type: event.POST, promise: fetch(`/posts/${pageNumber}`) };
}
