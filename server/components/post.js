import { loadFront } from 'yaml-front-matter';
import marked from 'marked';

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {
    
    const catalogue = options.fromJson(options.fromPublic('/catalogue.json'));

    return (request, response) => {

        const slug = request.params.slug;
        const model = catalogue.filter(model => model.slug === slug)[0];
        const markdown = loadFront(options.fromPublic(`/posts/${model.filename}`), 'content');

        response.end(options.toJson({ ...model, ...markdown, content: marked(markdown.content) }));

    };
    
};
