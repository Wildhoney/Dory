import { dissoc } from 'ramda';
import { getPosts } from './posts';
import sort from '../../public/js/utilities/sort';

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {

    return (request, response) => {

        getPosts(options).then(posts => {
            const sorted = sort()(posts);
            response.end(options.toJson(sorted.map(post => dissoc('content', post))));
        });

    };

};
