import by from 'sort-by';
import { loadFront } from 'yaml-front-matter';
import { getPost } from './post';

/**
 * @method getPosts
 * @param {Object} options
 * @return {Array}
 */
export const getPosts = options => {
    const posts = options.fromJson(options.fromPublic('/catalogue.json')).sort(by('createdDate')).reverse();
    return posts.map(post => getPost(options)(post.slug));
};

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {

    return (request, response) => {

        const pageNumber = Number(request.params.pageNumber);
        const perPage = options.config.perPage;
        const index = (pageNumber - 1) * perPage;
        const posts = getPosts(options).slice(index, index + perPage);

        response.end(options.toJson(posts));

    };
    
};
