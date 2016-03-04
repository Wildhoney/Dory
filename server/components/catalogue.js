/**
 * @param {Object} options
 * @return {Function}
 */
export default options => {
    const catalogue = options.fromJson(options.fromPublic('/catalogue.json'));
    return (request, response) => response.end(options.toJson(catalogue));
};
