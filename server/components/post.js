/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {

    return (request, response) => {
        const post = options.fromJson(options.fromCore(`/assets/posts/my-first-post.json`));
        response.end(options.toJson(post));
    };
    
};
