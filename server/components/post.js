import { loadFront } from 'yaml-front-matter';
import marked from 'marked';

/**
 * @method getPost
 * @param {Object} options
 * @return {Function}
 */
export const getPost = options => {

    const catalogue = options.fromJson(options.fromPublic('/catalogue.json'));

    /**
     * @param {String} slug
     * @return {Object}
     */
    return slug => {
        const model = catalogue.filter(model => model.slug === slug)[0];
        const markdown = loadFront(options.fromPublic(`/posts/${model.filename}`), 'content');
        return { ...model, ...markdown, content: marked(markdown.content), filename: undefined };
    };

};

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {

    return (request, response) => {
        const bySlug = getPost(options);
        response.end(options.toJson(bySlug(request.params.slug)));
    };
    
};
