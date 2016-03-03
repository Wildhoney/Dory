import * as event from './config/events';
import { fetch } from './helpers/request';

/**
 * @method getCatalogue
 * @return {Object}
 */
export function getCatalogue() {
    return { type: event.CATALOGUE, promise: fetch('api/catalogue') };
}

/**
 * @method getPosts
 * @param {Number} pageNumber
 * @return {Object}
 */
export function getPosts(pageNumber) {
    return { type: event.POSTS, promise: fetch(`api/posts/${pageNumber}`) };
}

/**
 * @method setMenu
 * @param {Boolean} open
 * @return {Object}
 */
export function setMenu(open) {
    return { type: event.MENU, open };
}
