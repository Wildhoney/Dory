import { loadFront } from 'yaml-front-matter';
import { getPost } from './post';

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {
    
    const catalogue = options.fromJson(options.fromPublic('/catalogue.json'));

    return (request, response) => {

        const pageNumber = request.params.pageNumber;
        const perPage = options.config.perPage;
        const bySlug = getPost(options);
        const posts = catalogue.slice(0, perPage).map(post => bySlug(post.slug));

        response.end(options.toJson(posts));

    };
    
};
