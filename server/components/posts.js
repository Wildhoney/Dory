import by from 'sort-by';
import { loadFront } from 'yaml-front-matter';
import { getPost } from './post';
import glob from 'glob';
import { parse } from 'path';
import sort from '../../public/js/utilities/sort';

/**
 * @method getPosts
 * @param {Object} options
 * @return {Promise}
 */
export const getPosts = options => {

    const filterBy = getPost(options);

    return new Promise(resolve => {

        glob(`./public/posts/*.md`, {}, (error, files) => {

            const posts = files.map(file => {
                const {name: slug} = parse(file);
                return filterBy(slug);
            });

            Promise.all(posts).then(resolve);

        });

    });

};

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {

    return (request, response) => {

        const pageNumber = Number(request.params.pageNumber);
        // const sortProperty = request.params.sortProperty || 'createdDate';
        // const isAscending = request.params.sortOrder === 'desc';
        const perPage = Number(request.params.perPage) || options.config.perPage;
        const index = (pageNumber - 1) * perPage;

        getPosts(options).then(posts => {
            const sorted = sort()(posts);
            response.end(options.toJson(sorted.slice(index, index + perPage)));
        });

    };
    
};
