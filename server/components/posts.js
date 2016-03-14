import by from 'sort-by';
import { loadFront } from 'yaml-front-matter';
import { getPost } from './post';

/**
 * @method getPosts
 * @param {Object} options
 * @return {Array}
 */
export const getPosts = options => {
    const posts = options.fromJson(options.fromPublic('/catalogue.json'));
    return posts.map(post => getPost(options)(post.slug));
};

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {

    return (request, response) => {

        const pageNumber = Number(request.params.pageNumber);
        const sortProperty = String(request.params.sortProperty) || 'createdDate';
        const isAscending = request.params.sortOrder === 'desc';
        const perPage = Number(request.params.perPage) || options.config.perPage;

        const index = (pageNumber - 1) * perPage;
        const posts = getPosts(options).sort(by(sortProperty));

        response.end(options.toJson((isAscending ? [...posts] : [...posts.reverse()])
                            .slice(index, index + perPage)));

    };
    
};
