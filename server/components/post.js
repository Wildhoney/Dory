import { loadFront } from 'yaml-front-matter';
import removeNewLines from 'newline-remove';
import marked from 'marked';

/**
 * @constant markedOptions
 * @type {Object}
 */
const markedOptions = {
    breaks: true,
    pedantic: true
};

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
        const model = catalogue.find(model => model.slug === slug);
        const markdown = loadFront(options.fromPublic(`/posts/${model.filename}`), 'content');
        const content = removeNewLines(marked(markdown.content, markedOptions));
        const synopsis = markdown.synopsis ? marked(markdown.synopsis, markedOptions) : undefined;

        return { ...model, ...markdown, content, synopsis, filename: undefined };
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
