import {GET_POSTS} from './config/events';

/**
 * @method getPosts
 * @return {Function}
 */
export function getPosts() {

    return dispatch => fetch('../catalogue.json')
                        .then(response => response.json())
                        .then(posts => dispatch({ type: GET_POSTS, posts }));

}
