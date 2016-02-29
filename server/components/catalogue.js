import by from 'sort-by';

/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {

    const catalogue = options.fromJson(options.fromCore('/assets/catalogue.json'));

    return (request, response) => {

        const posts = [ ...catalogue ].sort(by('createdDate')).slice(0, 5).map(post => {
            const data = options.fromJson(options.fromCore(`/assets/posts/${post.slug}.json`));
            return { ...post, content: data.__content.trim() };
        });

        response.end(options.toJson(posts));

    };

};
