import by from 'sort-by';
import { getPosts } from './posts';
import { dissoc } from 'ramda';

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {

    return (request, response) => {

        getPosts(options).then(posts => {
            const sorted = posts.sort(by('createdDate')).reverse();
            response.end(options.toJson(sorted.map(post => dissoc('content', post))));
        });

    };

};
