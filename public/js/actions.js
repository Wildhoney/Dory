import * as event from './config/events';
import { fetch } from './utilities/request';
import config from './config';

/**
 * @method getCatalogue
 * @return {Object}
 */
export function getCatalogue() {
    return { type: event.CATALOGUE, promise: fetch('/api/catalogue') };
}

/**
 * @method getPosts
 * @param {Number} pageNumber
 * @return {Object}
 */
export function getPosts(pageNumber) {
    return { type: event.POSTS, promise: fetch(`/api/posts/page-${pageNumber}`) };
}

/**
 * @method getPost
 * @param {String} slug
 * @return {Object}
 */
export function getPost(slug) {
    return { type: event.POST, promise: fetch(`/api/post/${slug}`) };
}

/**
 * @method setMenu
 * @param {Boolean} open
 * @return {Object}
 */
export function setMenu(open) {
    return { type: event.MENU, open };
}
